<?php

function digitalize_enqueue_scripts() {
    $dist_path = get_template_directory() . '/dist';
    $dist_uri  = get_template_directory_uri() . '/dist';

    $manifest_file = $dist_path . '/.vite/manifest.json';
    if (!file_exists($manifest_file)) {
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_file), true);
    $entry    = null;
    foreach ($manifest as $item) {
        if (!empty($item['isEntry'])) {
            $entry = $item;
            break;
        }
    }
    if (!$entry) return;

    if (!empty($entry['css'])) {
        foreach ($entry['css'] as $i => $css_file) {
            wp_enqueue_style('digitalize-' . $i, $dist_uri . '/' . $css_file, [], null);
        }
    }

    wp_enqueue_script('digitalize-app', $dist_uri . '/' . $entry['file'], [], null, true);
    wp_script_add_data('digitalize-app', 'type', 'module');

    // Передаємо поточну сторінку і сайт в React
    global $post;
    $page_data = null;
    if ($post) {
        $page_data = [
            'id'      => $post->ID,
            'slug'    => $post->post_name,
            'title'   => get_the_title($post->ID),
            'content' => apply_filters('the_content', $post->post_content),
            'excerpt' => get_the_excerpt($post),
        ];
    }
    wp_localize_script('digitalize-app', 'wpPage', $page_data);
    wp_localize_script('digitalize-app', 'wpSite', [
        'name'   => get_bloginfo('name'),
        'url'    => home_url('/'),
        'apiUrl' => rest_url(),
    ]);

    $locations = get_nav_menu_locations();

    $build_menu = function ($location_id) use ($locations) {
        $menu_id   = $locations[$location_id] ?? null;
        $raw_items = $menu_id ? (wp_get_nav_menu_items($menu_id) ?: []) : [];
        return array_values(array_map(function ($item) {
            return [
                'id'    => $item->ID,
                'name'  => html_entity_decode($item->title, ENT_QUOTES | ENT_HTML5, 'UTF-8'),
                'href'  => $item->url,
                'order' => $item->menu_order,
            ];
        }, array_filter($raw_items, function ($item) {
            return (int) $item->menu_item_parent === 0;
        })));
    };

    wp_localize_script('digitalize-app', 'wpMenu',       $build_menu('primary'));
    wp_localize_script('digitalize-app', 'wpFooterMenu', $build_menu('footer'));

    $acf_data = function_exists('get_fields') ? (get_fields() ?: []) : [];
    wp_localize_script('digitalize-app', 'wpAcf', $acf_data);
}
add_action('wp_enqueue_scripts', 'digitalize_enqueue_scripts');

// ACF field definitions
foreach (glob(get_template_directory() . '/acf/*.php') as $acf_file) {
    require_once $acf_file;
}

// Підтримка меню
add_theme_support('menus');
register_nav_menus([
    'primary' => 'Main Menu',
    'footer'  => 'Footer Menu',
]);

// Прибираємо редактор зі сторінок
add_action('init', function () {
    remove_post_type_support('page', 'editor');
});

// Прибираємо зайве
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');
