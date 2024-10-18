<?php
// קובץ JSON עם רשימת הקישורים
$file = 'links.json';

// אם הקובץ קיים, שלח את תוכנו
if (file_exists($file)) {
    $links = json_decode(file_get_contents($file), true);
    echo json_encode(['links' => $links]);
} else {
    echo json_encode(['links' => []]);
}
?>
