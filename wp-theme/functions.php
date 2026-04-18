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
}
add_action('wp_enqueue_scripts', 'digitalize_enqueue_scripts');

// Підтримка меню
add_theme_support('menus');
register_nav_menus(['primary' => 'Main Menu']);

// Прибираємо зайве
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');
