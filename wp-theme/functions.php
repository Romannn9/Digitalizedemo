<?php

// Підключаємо React збірку через Vite manifest
function digitalize_enqueue_scripts() {
    $dist_path = get_template_directory() . '/dist';
    $dist_uri  = get_template_directory_uri() . '/dist';

    $manifest_file = $dist_path . '/.vite/manifest.json';
    if (!file_exists($manifest_file)) {
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_file), true);
    $entry    = $manifest['src/main.tsx'] ?? null;
    if (!$entry) {
        return;
    }

    // CSS
    if (!empty($entry['css'])) {
        foreach ($entry['css'] as $i => $css_file) {
            wp_enqueue_style('digitalize-' . $i, $dist_uri . '/' . $css_file, [], null);
        }
    }

    // JS
    wp_enqueue_script('digitalize-app', $dist_uri . '/' . $entry['file'], [], null, true);
    wp_script_add_data('digitalize-app', 'type', 'module');
}
add_action('wp_enqueue_scripts', 'digitalize_enqueue_scripts');

// Всі фронтенд запити → React (BrowserRouter працює)
add_filter('template_include', function ($template) {
    return get_template_directory() . '/index.php';
}, 99);

// Вимикаємо WordPress emoji і зайве
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_generator');
