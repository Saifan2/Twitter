let links = [];

// הוספת קישור חדש
function addLink() {
  const input = document.getElementById('link-input');
  const newLink = input.value.trim();
  if (newLink) {
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
        fetchLinks(); // עדכון רשימת הקישורים
      }
    });

    input.value = ''; // נקה את שדה הטקסט לאחר ההוספה
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
  // שליחת הרשימה המעודכנת לשרת
  fetch('save_links.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ links: links }) 
  }).then(() => {
    updateLinks(); // עדכון הרשימה המוצגת
  });
}

// קריאה ל-fetchLinks בעת טעינת העמוד
window.onload = fetchLinks;
