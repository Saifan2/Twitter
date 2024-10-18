let links = [];

// הוספת קישור חדש
function addLink() {
  const input = document.getElementById('link-input');
  const newLink = input.value;
  if (newLink) {
    // שלח את הקישור לשרת
    fetch('save_links.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link: newLink }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        fetchLinks(); // עדכן את רשימת הקישורים מהשרת
      }
    });

    input.value = ''; // נקה את השדה לאחר ההוספה
  }
}

// שליפת קישורים מהשרת
function fetchLinks() {
  fetch('get_links.php')
    .then(response => response.json())
    .then(data => {
      if (data.links) {
        links = data.links;
        updateLinks();
      }
    });
}

// הצגת הקישורים בעמוד
function updateLinks() {
  const container = document.getElementById('link-container');
  container.innerHTML = ''; // נקה את הקישורים הקיימים
  links.forEach((link, index) => {
    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';
    linkItem.innerHTML = `
      <span>${link}</span>
      <button onclick="removeLink(${index})">מחק</button>
    `;
    container.appendChild(linkItem);
  });
}

// הסרת קישור
function removeLink(index) {
  links.splice(index, 1);
  // שמור את הרשימה המעודכנת בשרת
  fetch('save_links.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ links: links }) // שלח את הרשימה המעודכנת לשרת
  }).then(() => {
    updateLinks(); // עדכן את הרשימה המוצגת
  });
}

// קריאה ל-fetchLinks בעת טעינת העמוד
window.onload = fetchLinks;
