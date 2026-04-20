<?php
/*
 * ACF Debug — відкрий у браузері, потім видали файл
 * URL: https://digitalize.com.ua/wp-content/themes/digitalize/acf-debug.php
 */
define('ABSPATH', true);
header('Content-Type: text/plain; charset=utf-8');

echo "=== ACF STATUS ===\n";
echo "function acf_add_local_field_group exists: " . (function_exists('acf_add_local_field_group') ? 'YES' : 'NO') . "\n";
echo "function get_fields exists: " . (function_exists('get_fields') ? 'YES' : 'NO') . "\n\n";

echo "=== ACF FILES IN THEME ===\n";
$dir = __DIR__ . '/acf/';
if (is_dir($dir)) {
    foreach (glob($dir . '*.php') as $f) {
        echo basename($f) . " — " . filesize($f) . " bytes\n";
    }
} else {
    echo "Directory acf/ NOT FOUND!\n";
}

echo "\n=== PAGE TEMPLATES ===\n";
// Load WP
$wp_load = dirname(dirname(dirname(__DIR__))) . '/wp-load.php';
if (file_exists($wp_load)) {
    require_once $wp_load;
    $pages = get_pages();
    foreach ($pages as $p) {
        $tpl = get_page_template_slug($p->ID);
        echo $p->post_title . " => template: '" . ($tpl ?: '(default)') . "'\n";
    }
    echo "\n=== ACF FIELD GROUPS ===\n";
    if (function_exists('acf_get_field_groups')) {
        $groups = acf_get_field_groups();
        foreach ($groups as $g) {
            echo $g['key'] . " — " . $g['title'] . "\n";
        }
    } else {
        echo "acf_get_field_groups not available\n";
    }
} else {
    echo "wp-load.php not found at: $wp_load\n";
}
