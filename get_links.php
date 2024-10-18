<?php
$file = 'links.txt';

// בדוק אם הקובץ קיים וקרא ממנו את הקישורים
if (file_exists($file)) {
    $links = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES); // קריאה לקובץ ללא שורות ריקות
    echo json_encode(['links' => $links]);
} else {
    echo json_encode(['links' => []]);
}
?>
