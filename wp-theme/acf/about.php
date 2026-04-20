<?php
if (!function_exists('acf_add_local_field_group')) return;

acf_add_local_field_group([
    'key'      => 'group_about',
    'title'    => 'Сторінка Про нас',
    'location' => [[['param' => 'page_template', 'operator' => '==', 'value' => 'page-about.php']]],
    'fields'   => [

        // HERO
        ['key' => 'tab_abt_hero', 'label' => 'Hero', 'name' => '', 'type' => 'tab', 'placement' => 'top'],
        ['key' => 'field_abt_badge',       'label' => 'Бейдж',        'name' => 'abt_badge',       'type' => 'text',     'default_value' => 'Про нас'],
        ['key' => 'field_abt_h1_line1',    'label' => 'H1 рядок 1',   'name' => 'abt_h1_line1',    'type' => 'text',     'default_value' => 'МИ — ВАШ'],
        ['key' => 'field_abt_h1_accent',   'label' => 'H1 акцент',    'name' => 'abt_h1_accent',   'type' => 'text',     'default_value' => 'DIGITAL-ДВИГУН'],
        ['key' => 'field_abt_desc',        'label' => 'Опис',         'name' => 'abt_desc',        'type' => 'textarea', 'default_value' => 'Digitalize — це команда експертів, які живуть даними та креативом. Ми не просто виконуємо замовлення, ми стаємо частиною вашого бізнесу, щоб разом досягати неймовірних результатів.'],
        ['key' => 'field_abt_hero_stats',  'label' => 'Статистика',   'name' => 'abt_hero_stats',  'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_ahs_value', 'label' => 'Значення', 'name' => 'value', 'type' => 'text'],
            ['key' => 'field_ahs_label', 'label' => 'Підпис',   'name' => 'label', 'type' => 'text'],
        ]],
        ['key' => 'field_abt_hero_image',  'label' => 'Фото',         'name' => 'abt_hero_image',  'type' => 'image',    'return_format' => 'url'],
        ['key' => 'field_abt_quote',       'label' => 'Цитата',       'name' => 'abt_quote',       'type' => 'text',     'default_value' => 'Результат — це єдина метрика, яка має значення.'],

        // МІСІЯ / ЦІННОСТІ
        ['key' => 'tab_abt_values', 'label' => 'Цінності', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_abt_val_title',    'label' => 'Заголовок',    'name' => 'abt_val_title',    'type' => 'text', 'default_value' => 'НАША МІСІЯ ТА ЦІННОСТІ'],
        ['key' => 'field_abt_val_subtitle', 'label' => 'Підзаголовок', 'name' => 'abt_val_subtitle', 'type' => 'text', 'default_value' => 'Ми будуємо прозорий та ефективний маркетинг майбутнього.'],
        ['key' => 'field_abt_values', 'label' => 'Цінності', 'name' => 'abt_values', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_av_icon',  'label' => 'Іконка', 'name' => 'icon',  'type' => 'select',
             'choices' => ['Shield' => 'Shield', 'Target' => 'Target', 'Zap' => 'Zap']],
            ['key' => 'field_av_title', 'label' => 'Назва',  'name' => 'title', 'type' => 'text'],
            ['key' => 'field_av_desc',  'label' => 'Опис',   'name' => 'desc',  'type' => 'textarea'],
        ]],

        // КОМАНДА
        ['key' => 'tab_abt_team', 'label' => 'Команда', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_abt_team_title',    'label' => 'Заголовок',    'name' => 'abt_team_title',    'type' => 'text', 'default_value' => 'ЛЮДИ, ЯКІ СТВОРЮЮТЬ УСПІХ'],
        ['key' => 'field_abt_team_subtitle', 'label' => 'Підзаголовок', 'name' => 'abt_team_subtitle', 'type' => 'text', 'default_value' => 'Наша команда — це поєднання досвіду, креативності та аналітичного складу розуму.'],
        ['key' => 'field_abt_team_btn',      'label' => 'Кнопка',       'name' => 'abt_team_btn',      'type' => 'text', 'default_value' => 'Приєднатися до нас'],
        ['key' => 'field_abt_team_btn_url',  'label' => 'Кнопка URL',   'name' => 'abt_team_btn_url',  'type' => 'url',  'default_value' => '/contact/'],
        ['key' => 'field_abt_team', 'label' => 'Члени команди', 'name' => 'abt_team', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_tm_name',  'label' => "Ім'я",      'name' => 'name',  'type' => 'text'],
            ['key' => 'field_tm_role',  'label' => 'Посада',     'name' => 'role',  'type' => 'text'],
            ['key' => 'field_tm_image', 'label' => 'Фото',       'name' => 'image', 'type' => 'image', 'return_format' => 'url'],
        ]],

        // ДОСЯГНЕННЯ
        ['key' => 'tab_abt_achieve', 'label' => 'Досягнення', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_abt_stats', 'label' => 'Цифри', 'name' => 'abt_stats', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_ast_value', 'label' => 'Значення', 'name' => 'value', 'type' => 'text'],
            ['key' => 'field_ast_label', 'label' => 'Підпис',   'name' => 'label', 'type' => 'text'],
        ]],

        // CTA
        ['key' => 'tab_abt_cta', 'label' => 'CTA', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_abt_cta_title',      'label' => 'Заголовок', 'name' => 'abt_cta_title',      'type' => 'text',     'default_value' => 'СТАНЬТЕ ЧАСТИНОЮ НАШОЇ ІСТОРІЇ УСПІХУ'],
        ['key' => 'field_abt_cta_subtitle',   'label' => 'Текст',     'name' => 'abt_cta_subtitle',   'type' => 'textarea', 'default_value' => 'Ми шукаємо амбітних партнерів, які готові до великих змін та масштабних результатів.'],
        ['key' => 'field_abt_cta_button',     'label' => 'Кнопка',    'name' => 'abt_cta_button',     'type' => 'text',     'default_value' => 'Почати співпрацю'],
        ['key' => 'field_abt_cta_button_url', 'label' => 'Кнопка URL','name' => 'abt_cta_button_url', 'type' => 'url',      'default_value' => '/contact/'],

        // ФОТО ОФІСУ
        ['key' => 'tab_abt_photos', 'label' => 'Фото офісу', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_abt_office_photos', 'label' => 'Фото', 'name' => 'abt_office_photos', 'type' => 'repeater',
         'button_label' => 'Додати фото', 'sub_fields' => [
            ['key' => 'field_op_image', 'label' => 'Зображення', 'name' => 'image', 'type' => 'image', 'return_format' => 'url'],
        ]],
    ],
]);
