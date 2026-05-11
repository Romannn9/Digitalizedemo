<?php
/**
 * Одноразово: переносить ACF cases_items зі сторінки «Кейси» у digitalize_case,
 * додає демо-кейси якщо репітер порожній і CPT ще немає, очищує meta репітеру.
 */
if (!defined('ABSPATH')) {
    exit;
}

/**
 * @return array<int, array<string, string>>
 */
function digitalize_case_default_seed_rows(): array {
    return [
        [
            'title'    => 'Масштабування E-commerce бренду одягу',
            'category' => 'Target',
            'roi'      => '520%',
            'cpa'      => '$2.4',
            'roas'     => '6.2',
            'image'    => 'https://picsum.photos/seed/case1/800/600',
            'excerpt'  => 'Зростання онлайн-продажів за рахунок таргету та оптимізації воронки.',
            'content'  => '<p>Кейс демонструє підхід до масштабування e-commerce: аудиторії, креативи, ставки та аналітика ROI.</p>',
        ],
        [
            'title'    => 'Залучення лідів для ЖК преміум-класу',
            'category' => 'Context',
            'roi'      => '380%',
            'cpa'      => '$15',
            'roas'     => '4.5',
            'image'    => 'https://picsum.photos/seed/case2/800/600',
            'excerpt'  => 'Контекстна реклама та лідогенерація для нерухомості преміум-сегменту.',
            'content'  => '<p>Фокус на якісних лидах і зниженні вартості звернення за рахунок семантики та лендінгів.</p>',
        ],
        [
            'title'    => 'Просування мобільного додатку для фітнесу',
            'category' => 'SMM',
            'roi'      => '410%',
            'cpa'      => '$0.8',
            'roas'     => '5.1',
            'image'    => 'https://picsum.photos/seed/case3/800/600',
            'excerpt'  => 'SMM та інстали: баланс між охопленням і платоспроможними користувачами.',
            'content'  => '<p>Кампанії в соцмережах, UGC та робота з інфлюенсерами для зростання інсталів.</p>',
        ],
        [
            'title'    => 'SEO-просування міжнародного маркетплейсу',
            'category' => 'SEO',
            'roi'      => '890%',
            'cpa'      => '$1.2',
            'roas'     => '12.4',
            'image'    => 'https://picsum.photos/seed/case4/800/600',
            'excerpt'  => 'Органічний трафік і видимість у конкурентній міжнародній ниші.',
            'content'  => '<p>Технічний SEO, контент-хаби та лінкбілдинг для довгострокового органічного росту.</p>',
        ],
    ];
}

/**
 * @param mixed $raw
 */
function digitalize_case_row_image_url($raw): string {
    if (is_string($raw) && filter_var($raw, FILTER_VALIDATE_URL)) {
        return $raw;
    }
    if (is_numeric($raw)) {
        $u = wp_get_attachment_image_url((int) $raw, 'large');
        return $u ?: '';
    }
    if (is_array($raw) && !empty($raw['url']) && is_string($raw['url'])) {
        return $raw['url'];
    }
    return '';
}

function digitalize_case_ensure_term(string $name): int {
    $name = trim($name);
    if ($name === '') {
        $name = 'Інше';
    }
    $existing = get_term_by('name', $name, 'case_category');
    if ($existing && !is_wp_error($existing)) {
        return (int) $existing->term_id;
    }
    $ins = wp_insert_term($name, 'case_category');
    if (is_wp_error($ins)) {
        return 0;
    }
    return (int) $ins['term_id'];
}

function digitalize_case_sideload_thumbnail(int $post_id, string $url): void {
    if ($url === '' || !filter_var($url, FILTER_VALIDATE_URL)) {
        return;
    }
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';
    $tmp = download_url($url);
    if (is_wp_error($tmp)) {
        return;
    }
    $path = (string) parse_url($url, PHP_URL_PATH);
    $name = basename($path) ?: 'case-image.jpg';
    if (!preg_match('/\.(jpe?g|png|webp|gif)$/i', $name)) {
        $name .= '.jpg';
    }
    $file_array = [
        'name'     => sanitize_file_name($name),
        'tmp_name' => $tmp,
    ];
    $id = media_handle_sideload($file_array, $post_id);
    if (is_wp_error($id)) {
        @unlink($tmp);
        return;
    }
    set_post_thumbnail($post_id, (int) $id);
}

function digitalize_case_migrate_repeater_once(): void {
    if (get_option('digitalize_cases_repeater_migrated_v1')) {
        return;
    }
    if (!post_type_exists('digitalize_case')) {
        return;
    }

    $pages = get_pages([
        'meta_key'   => '_wp_page_template',
        'meta_value' => 'page-cases.php',
        'number'     => 1,
    ]);
    $page_id = $pages ? (int) $pages[0]->ID : 0;

    $counts = wp_count_posts('digitalize_case');
    $published = isset($counts->publish) ? (int) $counts->publish : 0;

    $rows = [];
    if ($page_id && function_exists('get_field')) {
        $got = get_field('cases_items', $page_id);
        $rows = is_array($got) ? $got : [];
    }

    if ($rows === [] && $published === 0) {
        $rows = digitalize_case_default_seed_rows();
    }

    if ($rows === []) {
        update_option('digitalize_cases_repeater_migrated_v1', '1', true);
        return;
    }

    foreach ($rows as $row) {
        if (!is_array($row)) {
            continue;
        }
        $title = isset($row['title']) ? sanitize_text_field((string) $row['title']) : '';
        if ($title === '') {
            continue;
        }
        $slug = sanitize_title($title);
        $dup = get_posts([
            'post_type'      => 'digitalize_case',
            'name'           => $slug,
            'post_status'    => 'any',
            'posts_per_page' => 1,
            'fields'         => 'ids',
        ]);
        if ($dup) {
            continue;
        }

        $category = isset($row['category']) ? sanitize_text_field((string) $row['category']) : '';
        $roi      = isset($row['roi']) ? sanitize_text_field((string) $row['roi']) : '';
        $cpa      = isset($row['cpa']) ? sanitize_text_field((string) $row['cpa']) : '';
        $roas     = isset($row['roas']) ? sanitize_text_field((string) $row['roas']) : '';
        $img = digitalize_case_row_image_url($row['image'] ?? '');

        $excerpt = '';
        if (!empty($row['excerpt'])) {
            $excerpt = wp_strip_all_tags((string) $row['excerpt']);
        }
        if ($excerpt === '') {
            $excerpt = trim(implode(' · ', array_filter([$category, $roi ? "ROI {$roi}" : '', $cpa ? "CPA {$cpa}" : '', $roas ? "ROAS {$roas}" : ''])), ' ·');
        }

        $content = '';
        if (!empty($row['content'])) {
            $content = wp_kses_post((string) $row['content']);
        }
        if ($content === '') {
            $content = '<p>' . esc_html($title) . '</p>';
        }

        $post_id = wp_insert_post([
            'post_type'    => 'digitalize_case',
            'post_status'  => 'publish',
            'post_title'   => $title,
            'post_name'    => $slug,
            'post_excerpt' => $excerpt,
            'post_content' => $content,
            'menu_order'   => 0,
        ], true);
        if (is_wp_error($post_id) || !$post_id) {
            continue;
        }
        $post_id = (int) $post_id;

        if (function_exists('update_field')) {
            update_field('case_roi', $roi, $post_id);
            update_field('case_cpa', $cpa, $post_id);
            update_field('case_roas', $roas, $post_id);
        }

        $tid = digitalize_case_ensure_term($category);
        if ($tid) {
            wp_set_post_terms($post_id, [$tid], 'case_category', false);
        }

        if ($img !== '') {
            digitalize_case_sideload_thumbnail($post_id, $img);
        }
    }

    if ($page_id) {
        delete_post_meta($page_id, 'cases_items');
        delete_post_meta($page_id, '_cases_items');
        if (function_exists('delete_field')) {
            delete_field('cases_items', $page_id);
        }
    }

    update_option('digitalize_cases_repeater_migrated_v1', '1', true);
}

add_action('admin_init', static function (): void {
    if (!is_admin() || !current_user_can('manage_options')) {
        return;
    }
    digitalize_case_migrate_repeater_once();
}, 130);
