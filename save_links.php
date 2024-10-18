<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // אם התקבל קישור חדש
    if (isset($data['link'])) {
        $link = $data['link'] . PHP_EOL; // הוספת שורה חדשה בסוף הקישור
        file_put_contents('links.txt', $link, FILE_APPEND); // הוספה לקובץ הטקסט
        echo json_encode(['success' => true]);
    }

    // אם התקבלה רשימת קישורים מעודכנת (למחיקה או עדכון)
    elseif (isset($data['links'])) {
        $links = implode(PHP_EOL, $data['links']) . PHP_EOL; // שמירת הרשימה כשורות
        file_put_contents('links.txt', $links); // שמירת כל הרשימה מחדש
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'לא נשלחו נתונים.']);
    }
}
?>
