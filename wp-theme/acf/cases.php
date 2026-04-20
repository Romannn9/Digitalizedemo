<?php
if (!function_exists('acf_add_local_field_group')) return;

acf_add_local_field_group([
    'key'      => 'group_cases',
    'title'    => 'Сторінка Кейси',
    'location' => [[['param' => 'page_template', 'operator' => '==', 'value' => 'page-cases.php']]],
    'fields'   => [

        // HEADER
        ['key' => 'tab_cases_header', 'label' => 'Заголовок', 'name' => '', 'type' => 'tab', 'placement' => 'top'],
        ['key' => 'field_cases_h1_line1', 'label' => 'H1 рядок 1', 'name' => 'cases_h1_line1', 'type' => 'text',     'default_value' => 'НАШІ КЕЙСИ:'],
        ['key' => 'field_cases_h1_accent','label' => 'H1 акцент', 'name' => 'cases_h1_accent', 'type' => 'text',     'default_value' => 'РЕАЛЬНІ ЦИФРИ'],
        ['key' => 'field_cases_header_desc','label'=>'Опис',      'name' => 'cases_header_desc','type' => 'textarea', 'default_value' => 'Ми не просто показуємо красиві картинки. Ми показуємо, як наші стратегії впливають на банківський рахунок клієнта.'],

        // КЕЙСИ GRID
        ['key' => 'tab_cases_grid', 'label' => 'Кейси', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_cases_items', 'label' => 'Кейси', 'name' => 'cases_items', 'type' => 'repeater',
         'button_label' => 'Додати кейс', 'sub_fields' => [
            ['key' => 'field_ci_title',    'label' => 'Назва',      'name' => 'title',    'type' => 'text'],
            ['key' => 'field_ci_category', 'label' => 'Категорія',  'name' => 'category', 'type' => 'select',
             'choices' => ['Target' => 'Target', 'Context' => 'Context', 'SMM' => 'SMM', 'SEO' => 'SEO']],
            ['key' => 'field_ci_roi',   'label' => 'ROI',  'name' => 'roi',   'type' => 'text'],
            ['key' => 'field_ci_cpa',   'label' => 'CPA',  'name' => 'cpa',   'type' => 'text'],
            ['key' => 'field_ci_roas',  'label' => 'ROAS', 'name' => 'roas',  'type' => 'text'],
            ['key' => 'field_ci_image', 'label' => 'Зображення', 'name' => 'image', 'type' => 'image', 'return_format' => 'url'],
        ]],

        // FEATURED CASE
        ['key' => 'tab_cases_featured', 'label' => 'Головний кейс', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_fc_title',       'label' => 'Заголовок',      'name' => 'fc_title',       'type' => 'text',     'default_value' => 'Як ми допомогли Fintech-стартапу залучити 10,000 користувачів за 3 місяці'],
        ['key' => 'field_fc_problem',     'label' => 'Проблема',       'name' => 'fc_problem',     'type' => 'textarea', 'default_value' => 'Висока вартість інсталу ($4.5) та низька конверсія в реєстрацію.'],
        ['key' => 'field_fc_solution',    'label' => 'Рішення',        'name' => 'fc_solution',    'type' => 'textarea', 'default_value' => 'Повна перебудова воронки, впровадження AI-оптимізації ставок та нові креативи.'],
        ['key' => 'field_fc_stat1_val',   'label' => 'Стат 1 значення','name' => 'fc_stat1_val',   'type' => 'text',     'default_value' => '10k+'],
        ['key' => 'field_fc_stat1_label', 'label' => 'Стат 1 підпис', 'name' => 'fc_stat1_label', 'type' => 'text',     'default_value' => 'Користувачів'],
        ['key' => 'field_fc_stat2_val',   'label' => 'Стат 2 значення','name' => 'fc_stat2_val',   'type' => 'text',     'default_value' => '$1.2'],
        ['key' => 'field_fc_stat2_label', 'label' => 'Стат 2 підпис', 'name' => 'fc_stat2_label', 'type' => 'text',     'default_value' => 'CPI'],
        ['key' => 'field_fc_stat3_val',   'label' => 'Стат 3 значення','name' => 'fc_stat3_val',   'type' => 'text',     'default_value' => '25%'],
        ['key' => 'field_fc_stat3_label', 'label' => 'Стат 3 підпис', 'name' => 'fc_stat3_label', 'type' => 'text',     'default_value' => 'CR в реєстрацію'],
        ['key' => 'field_fc_image',       'label' => 'Зображення',     'name' => 'fc_image',       'type' => 'image',    'return_format' => 'url'],

        // VIDEO ВІДГУКИ
        ['key' => 'tab_cases_video', 'label' => 'Відео', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_video_title',    'label' => 'Заголовок',    'name' => 'video_title',    'type' => 'text', 'default_value' => 'ВІДЕО-ВІДГУКИ КЛІЄНТІВ'],
        ['key' => 'field_video_subtitle', 'label' => 'Підзаголовок', 'name' => 'video_subtitle', 'type' => 'text', 'default_value' => 'Послухайте тих, хто вже пройшов шлях до успіху з нами.'],
        ['key' => 'field_videos', 'label' => 'Відео', 'name' => 'videos', 'type' => 'repeater',
         'button_label' => 'Додати відео', 'max' => 3, 'sub_fields' => [
            ['key' => 'field_video_image',  'label' => 'Зображення', 'name' => 'image',  'type' => 'image', 'return_format' => 'url'],
            ['key' => 'field_video_author', 'label' => 'Автор',      'name' => 'author', 'type' => 'text'],
            ['key' => 'field_video_quote',  'label' => 'Цитата',     'name' => 'quote',  'type' => 'text'],
            ['key' => 'field_video_url',    'label' => 'URL відео',  'name' => 'url',    'type' => 'url'],
        ]],

        // CTA
        ['key' => 'tab_cases_cta', 'label' => 'CTA', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_cases_cta_title',      'label' => 'Заголовок', 'name' => 'cases_cta_title',      'type' => 'text',     'default_value' => 'ХОЧЕТЕ ТАКІ Ж РЕЗУЛЬТАТИ?'],
        ['key' => 'field_cases_cta_subtitle',   'label' => 'Текст',     'name' => 'cases_cta_subtitle',   'type' => 'textarea', 'default_value' => 'Ми готові розробити для вас індивідуальну стратегію росту. Перша консультація — безкоштовно.'],
        ['key' => 'field_cases_cta_button',     'label' => 'Кнопка',    'name' => 'cases_cta_button',     'type' => 'text',     'default_value' => 'Обговорити проєкт'],
        ['key' => 'field_cases_cta_button_url', 'label' => 'Кнопка URL','name' => 'cases_cta_button_url', 'type' => 'url',      'default_value' => '/contact/'],

        // ПЕРЕВАГИ + ДОСЯГНЕННЯ
        ['key' => 'tab_cases_why', 'label' => 'Чому ми', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_why_title', 'label' => 'Заголовок', 'name' => 'why_title', 'type' => 'text', 'default_value' => 'ЧОМУ ОБИРАЮТЬ DIGITALIZE'],
        ['key' => 'field_why_items', 'label' => 'Переваги', 'name' => 'why_items', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_why_item_title', 'label' => 'Назва', 'name' => 'title', 'type' => 'text'],
            ['key' => 'field_why_item_desc',  'label' => 'Опис',  'name' => 'desc',  'type' => 'textarea'],
        ]],
        ['key' => 'field_achieve_title', 'label' => 'Досягнення заголовок', 'name' => 'achieve_title', 'type' => 'text', 'default_value' => 'Наші досягнення'],
        ['key' => 'field_achievements', 'label' => 'Досягнення', 'name' => 'achievements', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_ach_value', 'label' => 'Значення', 'name' => 'value', 'type' => 'text'],
            ['key' => 'field_ach_label', 'label' => 'Підпис',   'name' => 'label', 'type' => 'text'],
        ]],

        // ПРОЦЕС
        ['key' => 'tab_cases_process', 'label' => 'Процес', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_cases_process_title', 'label' => 'Заголовок', 'name' => 'cases_process_title', 'type' => 'text', 'default_value' => 'ШЛЯХ ДО ВАШОГО УСПІХУ'],
        ['key' => 'field_cases_process_steps', 'label' => 'Кроки', 'name' => 'cases_process_steps', 'type' => 'repeater',
         'button_label' => 'Додати крок', 'sub_fields' => [
            ['key' => 'field_cps_step',  'label' => 'Номер', 'name' => 'step',  'type' => 'text'],
            ['key' => 'field_cps_title', 'label' => 'Назва', 'name' => 'title', 'type' => 'text'],
            ['key' => 'field_cps_desc',  'label' => 'Опис',  'name' => 'desc',  'type' => 'textarea'],
        ]],

        // FAQ
        ['key' => 'tab_cases_faq', 'label' => 'FAQ', 'name' => '', 'type' => 'tab'],
        ['key' => 'field_cases_faq_title', 'label' => 'Заголовок', 'name' => 'cases_faq_title', 'type' => 'text', 'default_value' => 'ПИТАННЯ ПО КЕЙСАХ'],
        ['key' => 'field_cases_faq_items', 'label' => 'Питання', 'name' => 'cases_faq_items', 'type' => 'repeater',
         'button_label' => 'Додати', 'sub_fields' => [
            ['key' => 'field_cases_faq_q', 'label' => 'Питання',   'name' => 'q', 'type' => 'text'],
            ['key' => 'field_cases_faq_a', 'label' => 'Відповідь', 'name' => 'a', 'type' => 'textarea'],
        ]],
    ],
]);
