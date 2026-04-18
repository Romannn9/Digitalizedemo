<?php
/**
 * One-time WP setup script.
 * Upload to site root, open in browser, then DELETE.
 */

define('ABSPATH_CHECK', true);
require_once __DIR__ . '/wp-load.php';

if (!current_user_can('manage_options')) {
    wp_redirect(wp_login_url($_SERVER['REQUEST_URI']));
    exit;
}

$log = [];

// 1. Permalink structure → Post name
update_option('permalink_structure', '/%postname%/');
global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/%postname%/');
$wp_rewrite->flush_rules(true);
$log[] = '✅ Permalinks → Post name';

// 2. Pages to create
$pages = [
    ['title' => 'Головна',     'slug' => 'home',     'order' => 1],
    ['title' => 'Кейси',       'slug' => 'cases',    'order' => 2],
    ['title' => 'Послуги',     'slug' => 'services', 'order' => 3],
    ['title' => 'Про нас',     'slug' => 'about',    'order' => 4],
    ['title' => 'Блог',        'slug' => 'blog',     'order' => 5],
    ['title' => "Зв'язатися",  'slug' => 'contact',  'order' => 6],
];

$page_ids = [];

foreach ($pages as $page) {
    $existing = get_page_by_path($page['slug'], OBJECT, 'page');
    if ($existing) {
        $page_ids[$page['slug']] = $existing->ID;
        $log[] = "⏭ Сторінка вже існує: {$page['title']} (ID {$existing->ID})";
        continue;
    }

    $id = wp_insert_post([
        'post_title'   => $page['title'],
        'post_name'    => $page['slug'],
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'menu_order'   => $page['order'],
    ]);

    if (is_wp_error($id)) {
        $log[] = "❌ Помилка: {$page['title']} — " . $id->get_error_message();
    } else {
        $page_ids[$page['slug']] = $id;
        $log[] = "✅ Створено: {$page['title']} (ID $id)";
    }
}

// 3. Static front page
if (!empty($page_ids['home'])) {
    update_option('show_on_front', 'page');
    update_option('page_on_front', $page_ids['home']);
    $log[] = '✅ Головна → статична сторінка';
}

// 4. Navigation menu
$menu_name = 'Main Menu';
$menu_id   = wp_create_nav_menu($menu_name);

if (!is_wp_error($menu_id)) {
    $menu_order = ['home', 'cases', 'services', 'about', 'blog', 'contact'];
    foreach ($menu_order as $i => $slug) {
        if (!empty($page_ids[$slug])) {
            wp_update_nav_menu_item($menu_id, 0, [
                'menu-item-title'     => get_the_title($page_ids[$slug]),
                'menu-item-object'    => 'page',
                'menu-item-object-id' => $page_ids[$slug],
                'menu-item-type'      => 'post_type',
                'menu-item-status'    => 'publish',
                'menu-item-position'  => $i + 1,
            ]);
        }
    }

    $locations = get_theme_mod('nav_menu_locations', []);
    $locations['primary'] = $menu_id;
    set_theme_mod('nav_menu_locations', $locations);
    $log[] = "✅ Меню «{$menu_name}» створено";
} else {
    $log[] = '⚠️ Меню вже існує або помилка: ' . $menu_id->get_error_message();
}

// 5. Timezone
update_option('timezone_string', 'Europe/Kiev');
$log[] = '✅ Timezone → Europe/Kiev';

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>WP Setup</title>
<style>
  body { font-family: monospace; background: #1a1a1a; color: #e0e0e0; padding: 2rem; }
  h1 { color: #fff; }
  li { margin: .4rem 0; font-size: 1.1rem; }
  .done { background: #1e3a1e; border: 1px solid #2d6a2d; padding: 1rem; border-radius: 8px; margin-top: 1.5rem; color: #7fff7f; font-size: 1.2rem; }
  a { color: #7ab3ff; }
</style>
</head>
<body>
<h1>WP Setup — Digitalize</h1>
<ul>
<?php foreach ($log as $line) echo "<li>$line</li>"; ?>
</ul>
<div class="done">
  Готово! Тепер <strong>видали цей файл</strong> з сервера.<br><br>
  <a href="<?= home_url('/wp-admin/edit.php?post_type=page') ?>">→ Перейти до сторінок</a> &nbsp;|&nbsp;
  <a href="<?= home_url('/') ?>">→ Переглянути сайт</a>
</div>
</body>
</html>
