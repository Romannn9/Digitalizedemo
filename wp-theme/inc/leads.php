<?php
/**
 * Логування заявок з Contact Form 7 + зручна адмінка (спам, масове видалення).
 * Листи йдуть як і раніше через налаштування CF7 (вкладка «Пошта» у формі).
 */

defined('ABSPATH') || exit;

add_action('init', static function (): void {
    register_post_type('digitalize_lead', [
        'labels' => [
            'name'               => 'Заявки',
            'singular_name'      => 'Заявка',
            'menu_name'          => 'Заявки',
            'add_new'            => 'Додати заявку',
            'edit_item'          => 'Переглянути заявку',
            'view_item'          => 'Переглянути',
            'search_items'       => 'Шукати заявки',
            'not_found'          => 'Заявок немає',
            'not_found_in_trash' => 'У кошику порожньо',
        ],
        'description'         => 'Заявки з форми сайту (Contact Form 7).',
        'public'              => false,
        'publicly_queryable'  => false,
        'exclude_from_search' => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_admin_bar'   => false,
        'show_in_nav_menus'   => false,
        'show_in_rest'        => false,
        'menu_icon'           => 'dashicons-email-alt',
        'menu_position'       => 26,
        'capability_type'     => 'post',
        'map_meta_cap'        => true,
        'supports'            => ['title', 'editor'],
        'has_archive'         => false,
        'rewrite'             => false,
    ]);
}, 9);

/**
 * @return array<string, string>
 */
function digitalize_lead_sanitize_posted(array $posted): array {
    $get = static function (string $key) use ($posted): string {
        $v = $posted[$key] ?? '';
        if (is_array($v)) {
            $v = implode(', ', $v);
        }
        return is_string($v) ? trim(wp_strip_all_tags($v)) : '';
    };

    return [
        'name'    => $get('your-name'),
        'email'   => $get('your-email'),
        'phone'   => $get('your-phone'),
        'website' => $get('your-website'),
        'message' => $get('your-message'),
    ];
}

function digitalize_lead_client_ip(): string {
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
    foreach ($keys as $k) {
        if (!empty($_SERVER[$k])) {
            $raw = (string) $_SERVER[$k];
            if ($k === 'HTTP_X_FORWARDED_FOR') {
                $raw = trim(explode(',', $raw)[0]);
            }
            if (filter_var($raw, FILTER_VALIDATE_IP)) {
                return $raw;
            }
        }
    }
    return '';
}

/**
 * @param object $form WPCF7_ContactForm
 * @param 'mail_sent'|'mail_failed'|'spam' $status
 */
function digitalize_lead_save_from_cf7(object $form, string $status): void {
    if (!class_exists('WPCF7_Submission')) {
        return;
    }
    $submission = WPCF7_Submission::get_instance();
    if (!$submission) {
        return;
    }
    $posted = $submission->get_posted_data();
    if (!is_array($posted)) {
        return;
    }

    $d = digitalize_lead_sanitize_posted($posted);
    if ($d['email'] === '' && $d['name'] === '' && $d['message'] === '') {
        return;
    }

    $is_spam = ($status === 'spam');
    $title   = $d['name'] !== '' ? $d['name'] : ($d['email'] !== '' ? $d['email'] : 'Заявка');
    $title   = mb_substr($title . ($d['email'] ? ' — ' . $d['email'] : ''), 0, 180);

    $lines   = [];
    $lines[] = '<p><strong>Статус надсилання CF7:</strong> ' . esc_html($status) . '</p>';
    $form_title = method_exists($form, 'title') ? (string) $form->title() : '';
    $lines[]    = '<p><strong>Форма:</strong> ' . esc_html($form_title) . ' (ID ' . $form_id . ')</p>';
    if ($d['phone'] !== '') {
        $lines[] = '<p><strong>Телефон:</strong> ' . esc_html($d['phone']) . '</p>';
    }
    if ($d['website'] !== '') {
        $lines[] = '<p><strong>Сайт:</strong> ' . esc_html($d['website']) . '</p>';
    }
    if ($d['message'] !== '') {
        $lines[] = '<p><strong>Повідомлення:</strong><br>' . nl2br(esc_html($d['message'])) . '</p>';
    }
    $lines[] = '<p><strong>IP:</strong> ' . esc_html(digitalize_lead_client_ip()) . '</p>';

    $form_id = method_exists($form, 'id') ? (int) $form->id() : 0;

    $post_id = wp_insert_post([
        'post_type'    => 'digitalize_lead',
        'post_status'  => 'private',
        'post_title'   => $title,
        'post_content' => implode("\n", $lines),
        'post_author'  => 0,
    ], true);

    if (is_wp_error($post_id) || !$post_id) {
        return;
    }

    update_post_meta((int) $post_id, '_lead_source', digitalize_lead_current_source());

    update_post_meta((int) $post_id, '_lead_email', $d['email']);
    update_post_meta((int) $post_id, '_lead_phone', $d['phone']);
    update_post_meta((int) $post_id, '_lead_website', $d['website']);
    update_post_meta((int) $post_id, '_lead_message', $d['message']);
    update_post_meta((int) $post_id, '_lead_cf7_status', $status);
    update_post_meta((int) $post_id, '_lead_cf7_form_id', $form_id);
    update_post_meta((int) $post_id, '_lead_spam', $is_spam ? '1' : '0');
    update_post_meta((int) $post_id, '_lead_user_agent', isset($_SERVER['HTTP_USER_AGENT']) ? substr((string) $_SERVER['HTTP_USER_AGENT'], 0, 500) : '');
}

function digitalize_lead_current_source(): string {
    $ref = isset($_SERVER['HTTP_REFERER']) ? (string) $_SERVER['HTTP_REFERER'] : '';
    if ($ref === '') {
        return '';
    }
    $path = strtolower((string) (wp_parse_url($ref, PHP_URL_PATH) ?? ''));
    if (str_contains($path, 'contact')) {
        return 'contact';
    }
    if ($path === '/' || $path === '') {
        return 'home';
    }
    return 'other';
}

if (class_exists('WPCF7_Submission')) {
    add_action('wpcf7_submit', static function (...$args): void {
        $contact_form = $args[0] ?? null;
        $result         = $args[1] ?? null;
        if (!is_object($contact_form) || !is_array($result)) {
            return;
        }
        $status = $result['status'] ?? '';
        if (!in_array($status, ['mail_sent', 'mail_failed', 'spam'], true)) {
            return;
        }
        digitalize_lead_save_from_cf7($contact_form, $status);
    }, 99, 2);
}

add_filter('manage_digitalize_lead_posts_columns', static function (array $cols): array {
    $new = [];
    $new['cb']         = $cols['cb'] ?? '<input type="checkbox" />';
    $new['title']      = 'Заявка';
    $new['lead_email'] = 'Email';
    $new['lead_phone'] = 'Телефон';
    $new['lead_cf7']   = 'Форма CF7';
    $new['lead_src']   = 'Джерело';
    $new['lead_flag']  = 'Спам';
    $new['lead_cf7st'] = 'Статус CF7';
    $new['date']       = $cols['date'] ?? 'Дата';
    return $new;
});

add_action('manage_digitalize_lead_posts_custom_column', static function (string $column, int $post_id): void {
    switch ($column) {
        case 'lead_email':
            echo esc_html((string) get_post_meta($post_id, '_lead_email', true));
            break;
        case 'lead_phone':
            echo esc_html((string) get_post_meta($post_id, '_lead_phone', true));
            break;
        case 'lead_cf7':
            $fid = (int) get_post_meta($post_id, '_lead_cf7_form_id', true);
            echo $fid ? esc_html((string) $fid) : '—';
            break;
        case 'lead_src':
            echo esc_html((string) get_post_meta($post_id, '_lead_source', true) ?: '—');
            break;
        case 'lead_flag':
            $spam = get_post_meta($post_id, '_lead_spam', true) === '1';
            echo $spam
                ? '<span class="dashicons dashicons-warning" style="color:#b32d2e" title="Спам"></span> так'
                : '<span class="dashicons dashicons-yes-alt" style="color:#1d8f3a" title="Вхідні"></span> ні';
            break;
        case 'lead_cf7st':
            echo esc_html((string) get_post_meta($post_id, '_lead_cf7_status', true) ?: '—');
            break;
    }
}, 10, 2);

add_filter('post_row_actions', static function (array $actions, WP_Post $post): array {
    if ($post->post_type !== 'digitalize_lead') {
        return $actions;
    }
    $url = wp_nonce_url(
        admin_url('admin-post.php?action=digitalize_lead_toggle_spam&post=' . $post->ID),
        'digitalize_lead_toggle_spam_' . $post->ID
    );
    $spam = get_post_meta($post->ID, '_lead_spam', true) === '1';
    $actions['digitalize_spam'] = $spam
        ? '<a href="' . esc_url($url) . '">Не спам</a>'
        : '<a href="' . esc_url($url) . '">Позначити спамом</a>';
    return $actions;
}, 10, 2);

add_action('admin_post_digitalize_lead_toggle_spam', static function (): void {
    $post_id = isset($_GET['post']) ? (int) $_GET['post'] : 0;
    if (!$post_id || !current_user_can('edit_post', $post_id)) {
        wp_die('Forbidden', 403);
    }
    check_admin_referer('digitalize_lead_toggle_spam_' . $post_id);
    $post = get_post($post_id);
    if (!$post || $post->post_type !== 'digitalize_lead') {
        wp_die('Not found', 404);
    }
    $cur = get_post_meta($post_id, '_lead_spam', true) === '1';
    update_post_meta($post_id, '_lead_spam', $cur ? '0' : '1');
    wp_safe_redirect(admin_url('edit.php?post_type=digitalize_lead'));
    exit;
});

add_action('restrict_manage_posts', static function (): void {
    global $typenow;
    if ($typenow !== 'digitalize_lead') {
        return;
    }
    $v = isset($_GET['lead_mailbox']) ? sanitize_text_field((string) $_GET['lead_mailbox']) : '';
    ?>
    <select name="lead_mailbox">
        <option value="">Усі заявки</option>
        <option value="inbox" <?php selected($v, 'inbox'); ?>>Лише вхідні</option>
        <option value="spam" <?php selected($v, 'spam'); ?>>Лише спам</option>
    </select>
    <?php
});

add_action('pre_get_posts', static function (WP_Query $q): void {
    if (!is_admin() || !$q->is_main_query()) {
        return;
    }
    if ($q->get('post_type') !== 'digitalize_lead') {
        return;
    }
    $mb = isset($_GET['lead_mailbox']) ? sanitize_text_field((string) $_GET['lead_mailbox']) : '';
    if ($mb === 'spam') {
        $q->set('meta_query', [
            [
                'key'   => '_lead_spam',
                'value' => '1',
            ],
        ]);
    } elseif ($mb === 'inbox') {
        $q->set('meta_query', [
            'relation' => 'OR',
            [
                'key'     => '_lead_spam',
                'value'   => '0',
                'compare' => '=',
            ],
            [
                'key'     => '_lead_spam',
                'compare' => 'NOT EXISTS',
            ],
        ]);
    }
});

add_filter('bulk_actions-edit-digitalize_lead', static function (array $actions): array {
    $actions['digitalize_mark_spam']     = 'Позначити як спам';
    $actions['digitalize_mark_not_spam'] = 'Прибрати зі спаму';
    $actions['digitalize_delete_force']  = 'Видалити назавжди';
    return $actions;
});

add_filter('handle_bulk_actions-edit-digitalize_lead', static function (string $redirect, string $action, array $post_ids): string {
    if (!in_array($action, ['digitalize_mark_spam', 'digitalize_mark_not_spam', 'digitalize_delete_force'], true)) {
        return $redirect;
    }
    $count = 0;
    foreach ($post_ids as $pid) {
        $pid = (int) $pid;
        if (!$pid || !current_user_can('delete_post', $pid)) {
            continue;
        }
        if (get_post_type($pid) !== 'digitalize_lead') {
            continue;
        }
        if ($action === 'digitalize_mark_spam') {
            update_post_meta($pid, '_lead_spam', '1');
            ++$count;
        } elseif ($action === 'digitalize_mark_not_spam') {
            update_post_meta($pid, '_lead_spam', '0');
            ++$count;
        } elseif ($action === 'digitalize_delete_force') {
            wp_delete_post($pid, true);
            ++$count;
        }
    }
    return add_query_arg('digitalize_bulk', $count . ':' . $action, $redirect);
});

add_action('admin_notices', static function (): void {
    global $typenow, $pagenow;
    if ($pagenow !== 'edit.php' || $typenow !== 'digitalize_lead') {
        return;
    }
    if (isset($_GET['digitalize_bulk'])) {
        $parts = explode(':', sanitize_text_field((string) $_GET['digitalize_bulk']), 2);
        $n     = (int) ($parts[0] ?? 0);
        if ($n > 0) {
            echo '<div class="notice notice-success is-dismissible"><p>Опрацьовано записів: ' . esc_html((string) $n) . '</p></div>';
        }
    }
    if (isset($_GET['purged_spam'])) {
        $n = (int) $_GET['purged_spam'];
        if ($n > 0) {
            echo '<div class="notice notice-success is-dismissible"><p>Видалено спам-заявок: ' . esc_html((string) $n) . '</p></div>';
        }
    }

    $spam_ids = get_posts([
        'post_type'      => 'digitalize_lead',
        'post_status'    => 'any',
        'posts_per_page' => -1,
        'fields'         => 'ids',
        'meta_query'     => [
            [
                'key'   => '_lead_spam',
                'value' => '1',
            ],
        ],
    ]);
    $n_spam = count($spam_ids);
    if ($n_spam === 0) {
        return;
    }
    $url = wp_nonce_url(
        admin_url('admin-post.php?action=digitalize_purge_spam_leads'),
        'digitalize_purge_spam_leads'
    );
    echo '<div class="notice notice-warning"><p>';
    echo 'У спамі зараз <strong>' . esc_html((string) $n_spam) . '</strong> заявок. ';
    echo '<a href="' . esc_url($url) . '" class="button" style="margin-left:8px" onclick="return confirm(\'Видалити всі спам-заявки назавжди? Це не скасувати.\');">Очистити весь спам</a>';
    echo '</p></div>';
});

add_action('admin_post_digitalize_purge_spam_leads', static function (): void {
    if (!current_user_can('delete_posts')) {
        wp_die('Forbidden', 403);
    }
    check_admin_referer('digitalize_purge_spam_leads');
    $ids = get_posts([
        'post_type'      => 'digitalize_lead',
        'post_status'    => 'any',
        'posts_per_page' => -1,
        'fields'         => 'ids',
        'meta_query'     => [
            [
                'key'   => '_lead_spam',
                'value' => '1',
            ],
        ],
    ]);
    foreach ($ids as $id) {
        wp_delete_post((int) $id, true);
    }
    wp_safe_redirect(admin_url('edit.php?post_type=digitalize_lead&purged_spam=' . count($ids)));
    exit;
});
