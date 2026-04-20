<?php
if (!function_exists('acf_add_local_field_group')) return;

acf_add_local_field_group([
    'key'      => 'group_blog',
    'title'    => 'Сторінка Блог',
    'location' => [[['param' => 'page_template', 'operator' => '==', 'value' => 'page-blog.php']]],
    'fields'   => [

        // HEADER
        ['key' => 'tab_blg_header', 'label' => 'Заголовок', 'name' => '', 'type' => 'tab', 'placement' => 'top'],
        ['key' => 'field_blg_h1_line1',  'label' => 'H1 рядок 1', 'name' => 'blg_h1_line1',  'type' => 'text',     'default_value' => 'БЛОГ'],
        ['key' => 'field_blg_h1_accent', 'label' => 'H1 акцент',  'name' => 'blg_h1_accent',  'type' => 'text',     'default_value' => 'DIGITALIZE'],
        ['key' => 'field_blg_header_desc','label' => 'Опис',       'name' => 'blg_header_desc', 'type' => 'textarea', 'default_value' => 'Ділимося експертизою, кейсами та трендами світу digital-маркетингу. Тільки корисний контент для вашого бізнесу.'],

        // ПІДПИСКА
        ['key' => 'tab_blg_subscribe', 'label' => 'Підписка', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_blg_sub_title',    'label' => 'Заголовок',    'name' => 'blg_sub_title',    'type' => 'text',     'default_value' => 'ПІДПИШІТЬСЯ НА ДАЙДЖЕСТ'],
        ['key' => 'field_blg_sub_subtitle', 'label' => 'Підзаголовок', 'name' => 'blg_sub_subtitle', 'type' => 'text',     'default_value' => 'Отримуйте кращі матеріали та ексклюзивні поради раз на тиждень.'],
        ['key' => 'field_blg_sub_button',   'label' => 'Кнопка',       'name' => 'blg_sub_button',   'type' => 'text',     'default_value' => 'Підписатися'],
        ['key' => 'field_blg_sub_notice',   'label' => 'Дисклеймер',   'name' => 'blg_sub_notice',   'type' => 'text',     'default_value' => 'Жодного спаму. Тільки користь. Відписатися можна в будь-який момент.'],

        // АВТОРИ
        ['key' => 'tab_blg_authors', 'label' => 'Автори', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_blg_authors_title', 'label' => 'Заголовок', 'name' => 'blg_authors_title', 'type' => 'text', 'default_value' => 'НАШІ АВТОРИ'],
        ['key' => 'field_blg_authors', 'label' => 'Автори', 'name' => 'blg_authors', 'type' => 'repeater',
         'button_label' => 'Додати автора', 'sub_fields' => [
            ['key' => 'field_ba_name',  'label' => "Ім'я",  'name' => 'name',  'type' => 'text'],
            ['key' => 'field_ba_role',  'label' => 'Посада','name' => 'role',  'type' => 'text'],
            ['key' => 'field_ba_bio',   'label' => 'Біо',   'name' => 'bio',   'type' => 'textarea'],
            ['key' => 'field_ba_image', 'label' => 'Фото',  'name' => 'image', 'type' => 'image', 'return_format' => 'url'],
        ]],

        // FAQ
        ['key' => 'tab_blg_faq', 'label' => 'FAQ', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_blg_faq_title', 'label' => 'Заголовок', 'name' => 'blg_faq_title', 'type' => 'text', 'default_value' => 'ПИТАННЯ ПО БЛОГУ'],
        ['key' => 'field_blg_faq_items', 'label' => 'Питання', 'name' => 'blg_faq_items', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_blg_faq_q', 'label' => 'Питання',   'name' => 'q', 'type' => 'text'],
            ['key' => 'field_blg_faq_a', 'label' => 'Відповідь', 'name' => 'a', 'type' => 'textarea'],
        ]],
    ],
]);
