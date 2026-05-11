<?php

$digitalize_case_inc = get_template_directory() . '/inc/case-post-type.php';
if (is_readable($digitalize_case_inc)) {
    require_once $digitalize_case_inc;
    $digitalize_case_migrate = get_template_directory() . '/inc/case-migrate-repeater.php';
    if (is_readable($digitalize_case_migrate)) {
        require_once $digitalize_case_migrate;
    }
} else {
    add_action('admin_notices', static function (): void {
        if (!current_user_can('manage_options')) {
            return;
        }
        echo '<div class="notice notice-error"><p><strong>Digitalize:</strong> на сервері немає файлу <code>wp-content/themes/digitalize/inc/case-post-type.php</code>. Зробіть повний деплой теми (FTP), включно з папкою <code>inc/</code>.</p></div>';
    });
}

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
        if ($post->post_type === 'post') {
            $categories = wp_get_post_categories($post->ID, ['fields' => 'names']);
        } elseif ($post->post_type === 'digitalize_case') {
            $terms = wp_get_post_terms($post->ID, 'case_category', ['fields' => 'names']);
            $categories = is_wp_error($terms) ? [] : $terms;
        } else {
            $categories = [];
        }
        $page_data = [
            'id'         => $post->ID,
            'slug'       => $post->post_name,
            'title'      => get_the_title($post->ID),
            'content'    => apply_filters('the_content', $post->post_content),
            'excerpt'    => get_the_excerpt($post),
            'date'       => get_the_date('c', $post->ID),
            'author'     => get_the_author_meta('display_name', $post->post_author),
            'image'      => get_the_post_thumbnail_url($post->ID, 'large') ?: '',
            'categories' => $categories,
            'postType'   => $post->post_type,
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

    $footer_opts = function_exists('get_fields') ? (get_fields('option') ?: []) : [];
    wp_localize_script('digitalize-app', 'wpFooter', $footer_opts);

    $cases_archive = [];
    if ($post && get_page_template_slug($post->ID) === 'page-cases.php') {
        $q = new WP_Query([
            'post_type'      => 'digitalize_case',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => ['menu_order' => 'ASC', 'date' => 'DESC'],
            'no_found_rows'  => true,
        ]);
        while ($q->have_posts()) {
            $q->the_post();
            $tid    = get_the_ID();
            $tnames = wp_get_post_terms($tid, 'case_category', ['fields' => 'names']);
            $first  = (is_wp_error($tnames) || empty($tnames)) ? '' : $tnames[0];
            $cases_archive[] = [
                'id'       => $tid,
                'title'    => get_the_title($tid),
                'slug'     => (string) get_post_field('post_name', $tid),
                'url'      => get_permalink($tid),
                'excerpt'  => get_the_excerpt($tid),
                'image'    => get_the_post_thumbnail_url($tid, 'large') ?: '',
                'category' => $first,
                'roi'      => function_exists('get_field') ? (string) (get_field('case_roi', $tid) ?: '') : '',
                'cpa'      => function_exists('get_field') ? (string) (get_field('case_cpa', $tid) ?: '') : '',
                'roas'     => function_exists('get_field') ? (string) (get_field('case_roas', $tid) ?: '') : '',
            ];
        }
        wp_reset_postdata();
    }
    wp_localize_script('digitalize-app', 'wpCasesArchive', $cases_archive);
}
add_action('wp_enqueue_scripts', 'digitalize_enqueue_scripts');

// ACF Options Page
if (function_exists('acf_add_options_page')) {
    acf_add_options_page([
        'page_title' => 'Налаштування сайту',
        'menu_title' => 'Налаштування сайту',
        'menu_slug'  => 'site-settings',
        'capability' => 'manage_options',
        'icon_url'   => 'dashicons-admin-settings',
    ]);
}

// ACF field definitions
foreach (glob(get_template_directory() . '/acf/*.php') as $acf_file) {
    require_once $acf_file;
}

// Підтримка меню та featured image
add_theme_support('menus');
add_theme_support('post-thumbnails');
add_theme_support('title-tag');
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
