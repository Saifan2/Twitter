<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['links'])) {
        // אם קיבלנו רשימה, שמור אותה בקובץ
        $links = $data['links'];
    } elseif (isset($data['link'])) {
        // אם קיבלנו קישור יחיד, קרא את הקישורים השמורים והוסף אותו
        $links = json_decode(file_get_contents('links.json'), true) ?? [];
        $links[] = $data['link'];
    }

    // שמור את הקישורים בקובץ
    file_put_contents('links.json', json_encode($links));

    echo json_encode(['success' => true]);
}
?>
