<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['links'])) {
        $links = $data['links'];
    } elseif (isset($data['link'])) {
        // טען את הקישורים הקיימים
        $file = 'links.json';
        $links = json_decode(file_get_contents($file), true) ?? [];

        // הוסף את הקישור החדש
        $links[] = $data['link'];
    }

    // נסה לשמור את הרשימה המעודכנת
    if (file_put_contents('links.json', json_encode($links))) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to write to file.']);
    }
}
?>
