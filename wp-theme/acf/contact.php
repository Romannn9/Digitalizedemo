<?php
if (!function_exists('acf_add_local_field_group')) return;

acf_add_local_field_group([
    'key'      => 'group_contact',
    'title'    => 'Сторінка Контакти',
    'location' => [[['param' => 'page_template', 'operator' => '==', 'value' => 'page-contact.php']]],
    'fields'   => [

        // HERO
        ['key' => 'tab_cnt_hero', 'label' => 'Hero', 'name' => '', 'type' => 'tab', 'placement' => 'top'],
        ['key' => 'field_cnt_badge',      'label' => 'Бейдж',        'name' => 'cnt_badge',      'type' => 'text',     'default_value' => "Зв'язатися"],
        ['key' => 'field_cnt_h1_line1',   'label' => 'H1 рядок 1',   'name' => 'cnt_h1_line1',   'type' => 'text',     'default_value' => 'ОБГОВОРИМО'],
        ['key' => 'field_cnt_h1_accent',  'label' => 'H1 акцент',    'name' => 'cnt_h1_accent',  'type' => 'text',     'default_value' => 'ВАШ ПРОЄКТ?'],
        ['key' => 'field_cnt_subtitle',   'label' => 'Підзаголовок', 'name' => 'cnt_subtitle',   'type' => 'textarea', 'default_value' => "Заповніть форму, і наш експерт зв'яжеться з вами протягом 30 хвилин."],

        // КОНТАКТНА ІНФО
        ['key' => 'tab_cnt_info', 'label' => 'Контактна інфо', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_cnt_phone',   'label' => 'Телефон', 'name' => 'cnt_phone',   'type' => 'text', 'default_value' => '+38 (044) 123-45-67'],
        ['key' => 'field_cnt_email',   'label' => 'Email',   'name' => 'cnt_email',   'type' => 'text', 'default_value' => 'hello@digitalize.ua'],
        ['key' => 'field_cnt_address', 'label' => 'Адреса',  'name' => 'cnt_address', 'type' => 'text', 'default_value' => 'Київ, вул. Велика Васильківська, 100'],
        ['key' => 'field_cnt_form_button', 'label' => 'Кнопка форми', 'name' => 'cnt_form_button', 'type' => 'text', 'default_value' => 'Надіслати запит'],
    ],
]);
