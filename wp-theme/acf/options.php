<?php
if (!function_exists('acf_add_local_field_group')) return;

acf_add_local_field_group([
    'key'      => 'group_options',
    'title'    => 'Налаштування сайту',
    'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'site-settings']]],
    'fields'   => [

        // FOOTER
        ['key' => 'tab_opt_footer', 'label' => 'Футер', 'name' => '', 'type' => 'tab', 'placement' => 'top'],
        ['key' => 'field_opt_footer_desc',      'label' => 'Опис',        'name' => 'footer_desc',      'type' => 'textarea', 'default_value' => 'Ми створюємо цифрові стратегії, які трансформують бізнес. Топова агенція з фокусом на результат та ROI.'],
        ['key' => 'field_opt_footer_address',   'label' => 'Адреса',      'name' => 'footer_address',   'type' => 'text',     'default_value' => 'Київ, вул. Велика Васильківська, 100'],
        ['key' => 'field_opt_footer_phone',     'label' => 'Телефон',     'name' => 'footer_phone',     'type' => 'text',     'default_value' => '+38 (044) 123-45-67'],
        ['key' => 'field_opt_footer_email',     'label' => 'Email',       'name' => 'footer_email',     'type' => 'text',     'default_value' => 'hello@digitalize.ua'],
        ['key' => 'field_opt_footer_copyright', 'label' => 'Копірайт',    'name' => 'footer_copyright', 'type' => 'text',     'default_value' => '© 2026 Digitalize Agency. Всі права захищені.'],
        ['key' => 'field_opt_footer_nav_label', 'label' => 'Заголовок навігації', 'name' => 'footer_nav_label', 'type' => 'text', 'default_value' => 'Навігація'],
        ['key' => 'field_opt_footer_cnt_label', 'label' => 'Заголовок контактів', 'name' => 'footer_cnt_label', 'type' => 'text', 'default_value' => 'Контакти'],

        // СОЦМЕРЕЖІ
        ['key' => 'tab_opt_social', 'label' => 'Соцмережі', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_opt_linkedin',  'label' => 'LinkedIn URL',  'name' => 'social_linkedin',  'type' => 'url', 'default_value' => '#'],
        ['key' => 'field_opt_instagram', 'label' => 'Instagram URL', 'name' => 'social_instagram', 'type' => 'url', 'default_value' => '#'],
        ['key' => 'field_opt_facebook',  'label' => 'Facebook URL',  'name' => 'social_facebook',  'type' => 'url', 'default_value' => '#'],
    ],
]);
