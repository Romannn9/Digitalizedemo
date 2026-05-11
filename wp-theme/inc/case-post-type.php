<?php
/**
 * Кейси: кастомний тип запису + таксономія (SEO, окремі URL під /case/slug/).
 */

add_action('init', static function (): void {
    register_taxonomy('case_category', ['digitalize_case'], [
        'labels' => [
            'name'          => 'Категорії кейсів',
            'singular_name' => 'Категорія',
            'search_items'  => 'Шукати категорії',
            'all_items'     => 'Усі категорії',
            'edit_item'     => 'Редагувати категорію',
            'update_item'   => 'Оновити',
            'add_new_item'  => 'Додати категорію',
        ],
        'public'            => true,
        'hierarchical'      => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => ['slug' => 'case-category', 'with_front' => false],
    ]);

    register_post_type('digitalize_case', [
        'labels' => [
            'name'               => 'Кейси',
            'singular_name'      => 'Кейс',
            'add_new'            => 'Додати кейс',
            'add_new_item'       => 'Додати новий кейс',
            'edit_item'          => 'Редагувати кейс',
            'new_item'           => 'Новий кейс',
            'view_item'          => 'Переглянути кейс',
            'search_items'       => 'Шукати кейси',
            'not_found'          => 'Кейсів не знайдено',
            'not_found_in_trash' => 'У кошику порожньо',
            'menu_name'          => 'Кейси',
        ],
        'description'         => 'Окремі сторінки кейсів з власним URL для SEO.',
        'public'              => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => false,
        'show_in_admin_bar'   => true,
        'show_in_rest'        => true,
        'menu_icon'           => 'dashicons-chart-area',
        'menu_position'       => 22,
        'has_archive'         => false,
        'exclude_from_search' => false,
        'supports'            => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes'],
        'rewrite'             => ['slug' => 'case', 'with_front' => false],
        'capability_type'     => 'post',
    ]);
}, 0);

add_action('after_switch_theme', static function (): void {
    flush_rewrite_rules();
});

/** Після деплою по FTP тема не «переактивується» — один раз підхоплюємо rewrite з адмінки. */
add_action('admin_init', static function (): void {
    if (get_option('digitalize_case_rewrite_flushed')) {
        return;
    }
    flush_rewrite_rules(false);
    update_option('digitalize_case_rewrite_flushed', '1', true);
}, 99);
