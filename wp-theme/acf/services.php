<?php
if (!function_exists('acf_add_local_field_group')) return;

acf_add_local_field_group([
    'key'      => 'group_services',
    'title'    => 'Сторінка Послуги',
    'location' => [[['param' => 'page_template', 'operator' => '==', 'value' => 'page-services.php']]],
    'fields'   => [

        // HEADER
        ['key' => 'tab_srv_header', 'label' => 'Заголовок', 'name' => '', 'type' => 'tab', 'placement' => 'top'],
        ['key' => 'field_srv_h1_line1',  'label' => 'H1 рядок 1', 'name' => 'srv_h1_line1',  'type' => 'text',     'default_value' => 'ПОСЛУГИ, ЩО'],
        ['key' => 'field_srv_h1_accent', 'label' => 'H1 акцент',  'name' => 'srv_h1_accent',  'type' => 'text',     'default_value' => 'ГЕНЕРУЮТЬ ПРИБУТОК'],
        ['key' => 'field_srv_header_desc','label' => 'Опис',       'name' => 'srv_header_desc', 'type' => 'textarea', 'default_value' => 'Ми не просто налаштовуємо рекламу. Ми будуємо систему залучення клієнтів, яка працює на ваш бізнес 24/7.'],

        // ПОСЛУГИ
        ['key' => 'tab_srv_list', 'label' => 'Послуги', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_srv_items', 'label' => 'Послуги', 'name' => 'srv_items', 'type' => 'repeater',
         'button_label' => 'Додати послугу', 'sub_fields' => [
            ['key' => 'field_si_icon',    'label' => 'Іконка',    'name' => 'icon',    'type' => 'select',
             'choices' => ['Target' => 'Target', 'Search' => 'Search', 'Share2' => 'Share2', 'LineChart' => 'LineChart']],
            ['key' => 'field_si_title',   'label' => 'Назва',     'name' => 'title',   'type' => 'text'],
            ['key' => 'field_si_desc',    'label' => 'Опис',      'name' => 'desc',    'type' => 'textarea'],
            ['key' => 'field_si_details', 'label' => 'Деталі (кожен пункт з нового рядка)', 'name' => 'details', 'type' => 'textarea'],
            ['key' => 'field_si_btn',     'label' => 'Кнопка текст', 'name' => 'btn',  'type' => 'text'],
            ['key' => 'field_si_btn_url', 'label' => 'Кнопка URL',   'name' => 'btn_url', 'type' => 'url', 'default_value' => '/contact/'],
            ['key' => 'field_si_image',   'label' => 'Зображення', 'name' => 'image',  'type' => 'image', 'return_format' => 'url'],
        ]],

        // РЕЗУЛЬТАТИ
        ['key' => 'tab_srv_results', 'label' => 'Результати', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_srv_res_title',    'label' => 'Заголовок',    'name' => 'srv_res_title',    'type' => 'text', 'default_value' => 'ОЧІКУВАНІ РЕЗУЛЬТАТИ'],
        ['key' => 'field_srv_res_subtitle', 'label' => 'Підзаголовок', 'name' => 'srv_res_subtitle', 'type' => 'text', 'default_value' => 'На що ви можете розраховувати, працюючи з нами.'],
        ['key' => 'field_srv_results', 'label' => 'Статистика', 'name' => 'srv_results', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_sr_label', 'label' => 'Назва',    'name' => 'label', 'type' => 'text'],
            ['key' => 'field_sr_value', 'label' => 'Значення', 'name' => 'value', 'type' => 'text'],
            ['key' => 'field_sr_desc',  'label' => 'Опис',     'name' => 'desc',  'type' => 'text'],
        ]],

        // ПРОЦЕС
        ['key' => 'tab_srv_process', 'label' => 'Процес', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_srv_proc_title', 'label' => 'Заголовок', 'name' => 'srv_proc_title', 'type' => 'text', 'default_value' => 'ЕТАПИ СПІВПРАЦІ'],
        ['key' => 'field_srv_proc_steps', 'label' => 'Кроки', 'name' => 'srv_proc_steps', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_sps_step',  'label' => 'Номер', 'name' => 'step',  'type' => 'text'],
            ['key' => 'field_sps_title', 'label' => 'Назва', 'name' => 'title', 'type' => 'text'],
            ['key' => 'field_sps_desc',  'label' => 'Опис',  'name' => 'desc',  'type' => 'textarea'],
        ]],

        // ПАКЕТИ
        ['key' => 'tab_srv_pricing', 'label' => 'Пакети', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_srv_pkg_title',    'label' => 'Заголовок',    'name' => 'srv_pkg_title',    'type' => 'text', 'default_value' => 'ПАКЕТИ ПОСЛУГ'],
        ['key' => 'field_srv_pkg_subtitle', 'label' => 'Підзаголовок', 'name' => 'srv_pkg_subtitle', 'type' => 'text', 'default_value' => 'Оберіть оптимальний варіант для вашого бізнесу.'],
        ['key' => 'field_srv_packages', 'label' => 'Пакети', 'name' => 'srv_packages', 'type' => 'repeater',
         'button_label' => 'Додати пакет', 'sub_fields' => [
            ['key' => 'field_pkg_name',     'label' => 'Назва',    'name' => 'name',     'type' => 'text'],
            ['key' => 'field_pkg_price',    'label' => 'Ціна',     'name' => 'price',    'type' => 'text'],
            ['key' => 'field_pkg_popular',  'label' => 'Популярний', 'name' => 'popular','type' => 'true_false', 'default_value' => 0],
            ['key' => 'field_pkg_features', 'label' => 'Включено (кожен пункт з нового рядка)', 'name' => 'features', 'type' => 'textarea'],
            ['key' => 'field_pkg_btn',      'label' => 'Кнопка',   'name' => 'btn',      'type' => 'text',  'default_value' => 'Обрати пакет'],
            ['key' => 'field_pkg_btn_url',  'label' => 'Кнопка URL','name' => 'btn_url', 'type' => 'url',   'default_value' => '/contact/'],
        ]],

        // CTA
        ['key' => 'tab_srv_cta', 'label' => 'CTA', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_srv_cta_title',      'label' => 'Заголовок', 'name' => 'srv_cta_title',      'type' => 'text',     'default_value' => 'НЕ ЗНАЄТЕ, ЯКУ ПОСЛУГУ ОБРАТИ?'],
        ['key' => 'field_srv_cta_subtitle',   'label' => 'Текст',     'name' => 'srv_cta_subtitle',   'type' => 'textarea', 'default_value' => 'Замовте безкоштовну консультацію, і ми підберемо інструменти саме під ваші цілі.'],
        ['key' => 'field_srv_cta_button',     'label' => 'Кнопка',    'name' => 'srv_cta_button',     'type' => 'text',     'default_value' => 'Отримати консультацію'],
        ['key' => 'field_srv_cta_button_url', 'label' => 'Кнопка URL','name' => 'srv_cta_button_url', 'type' => 'url',      'default_value' => '/contact/'],

        // FAQ
        ['key' => 'tab_srv_faq', 'label' => 'FAQ', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_srv_faq_title', 'label' => 'Заголовок', 'name' => 'srv_faq_title', 'type' => 'text', 'default_value' => 'ПИТАННЯ ПО ПОСЛУГАХ'],
        ['key' => 'field_srv_faq_items', 'label' => 'Питання', 'name' => 'srv_faq_items', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_srv_faq_q', 'label' => 'Питання',   'name' => 'q', 'type' => 'text'],
            ['key' => 'field_srv_faq_a', 'label' => 'Відповідь', 'name' => 'a', 'type' => 'textarea'],
        ]],
    ],
]);
