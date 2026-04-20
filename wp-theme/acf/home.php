<?php
if (!function_exists('acf_add_local_field_group')) return;

acf_add_local_field_group([
    'key'        => 'group_home',
    'title'      => 'Головна сторінка',
    'menu_order' => 0,
    'location'   => [[['param' => 'page_type', 'operator' => '==', 'value' => 'front_page']]],
    'fields'     => [

        // ── HERO ──────────────────────────────────────────────────────────────
        ['key' => 'tab_hero', 'label' => 'Hero', 'name' => '', 'type' => 'tab', 'placement' => 'top'],

        ['key' => 'field_hero_badge',            'label' => 'Бейдж',             'name' => 'hero_badge',            'type' => 'text',     'default_value' => 'Top Digital Agency 2026'],
        ['key' => 'field_hero_title_line1',      'label' => 'Заголовок рядок 1', 'name' => 'hero_title_line1',      'type' => 'text',     'default_value' => 'МАСШТАБУЄМО'],
        ['key' => 'field_hero_title_accent',     'label' => 'Заголовок акцент',  'name' => 'hero_title_accent',     'type' => 'text',     'default_value' => 'ВАШ БІЗНЕС'],
        ['key' => 'field_hero_title_line3',      'label' => 'Заголовок рядок 3', 'name' => 'hero_title_line3',      'type' => 'text',     'default_value' => 'ЧЕРЕЗ ДАНІ'],
        ['key' => 'field_hero_subtitle',         'label' => 'Підзаголовок',      'name' => 'hero_subtitle',         'type' => 'textarea', 'default_value' => 'Digitalize — це не просто реклама. Це стратегія, яка приносить ROI 300%+ та перетворює кліків на лояльних клієнтів.'],
        ['key' => 'field_hero_cta_primary',      'label' => 'Кнопка 1 текст',   'name' => 'hero_cta_primary',      'type' => 'text',     'default_value' => 'Отримати стратегію'],
        ['key' => 'field_hero_cta_primary_url',  'label' => 'Кнопка 1 URL',     'name' => 'hero_cta_primary_url',  'type' => 'url',      'default_value' => '/contact/'],
        ['key' => 'field_hero_cta_secondary',    'label' => 'Кнопка 2 текст',   'name' => 'hero_cta_secondary',    'type' => 'text',     'default_value' => 'Наші кейси'],
        ['key' => 'field_hero_cta_secondary_url','label' => 'Кнопка 2 URL',     'name' => 'hero_cta_secondary_url','type' => 'url',      'default_value' => '/cases/'],

        // ── ПЕРЕВАГИ ──────────────────────────────────────────────────────────
        ['key' => 'tab_benefits', 'label' => 'Переваги', 'name' => '', 'type' => 'tab'],

        ['key' => 'field_benefits', 'label' => 'Переваги', 'name' => 'benefits', 'type' => 'repeater',
         'button_label' => 'Додати перевагу', 'sub_fields' => [
            ['key' => 'field_benefit_icon',  'label' => 'Іконка', 'name' => 'icon', 'type' => 'select',
             'choices' => ['BarChart3' => 'Bar Chart', 'Target' => 'Target', 'Zap' => 'Zap', 'Users' => 'Users'],
             'default_value' => 'BarChart3'],
            ['key' => 'field_benefit_title', 'label' => 'Заголовок', 'name' => 'title', 'type' => 'text'],
            ['key' => 'field_benefit_desc',  'label' => 'Опис',      'name' => 'desc',  'type' => 'textarea'],
        ]],

        // ── ПОСЛУГИ ───────────────────────────────────────────────────────────
        ['key' => 'tab_services', 'label' => 'Послуги', 'name' => '', 'type' => 'tab'],

        ['key' => 'field_services_title',    'label' => 'Заголовок',      'name' => 'services_title',    'type' => 'text', 'default_value' => 'КОМПЛЕКСНІ РІШЕННЯ ДЛЯ ВАШОГО РОСТУ'],
        ['key' => 'field_services_subtitle', 'label' => 'Підзаголовок',   'name' => 'services_subtitle', 'type' => 'text', 'default_value' => 'Ми закриваємо всі потреби вашого маркетингу в одному місці.'],
        ['key' => 'field_services_link_text','label' => 'Посилання текст','name' => 'services_link_text','type' => 'text', 'default_value' => 'Всі послуги'],
        ['key' => 'field_services_link_url', 'label' => 'Посилання URL',  'name' => 'services_link_url', 'type' => 'url',  'default_value' => '/services/'],
        ['key' => 'field_services', 'label' => 'Картки послуг', 'name' => 'services', 'type' => 'repeater',
         'button_label' => 'Додати послугу', 'sub_fields' => [
            ['key' => 'field_service_title', 'label' => 'Назва',  'name' => 'title', 'type' => 'text'],
            ['key' => 'field_service_desc',  'label' => 'Підпис', 'name' => 'desc',  'type' => 'text'],
        ]],

        // ── КЕЙСИ ─────────────────────────────────────────────────────────────
        ['key' => 'tab_cases', 'label' => 'Кейси', 'name' => '', 'type' => 'tab'],

        ['key' => 'field_cases_title', 'label' => 'Заголовок', 'name' => 'cases_title', 'type' => 'text', 'default_value' => 'РЕЗУЛЬТАТИ, ЯКІ ГОВОРЯТЬ САМІ ЗА СЕБЕ'],
        ['key' => 'field_cases', 'label' => 'Кейси', 'name' => 'cases', 'type' => 'repeater',
         'button_label' => 'Додати кейс', 'max' => 2, 'sub_fields' => [
            ['key' => 'field_case_client', 'label' => 'Клієнт',    'name' => 'client', 'type' => 'text'],
            ['key' => 'field_case_result', 'label' => 'Результат',  'name' => 'result', 'type' => 'text'],
            ['key' => 'field_case_desc',   'label' => 'Опис',       'name' => 'desc',   'type' => 'textarea'],
            ['key' => 'field_case_image',  'label' => 'Зображення', 'name' => 'image',  'type' => 'image', 'return_format' => 'url'],
        ]],

        // ── ПРО НАС ───────────────────────────────────────────────────────────
        ['key' => 'tab_about', 'label' => 'Про нас', 'name' => '', 'type' => 'tab'],

        ['key' => 'field_about_image',  'label' => 'Фото команди',  'name' => 'about_image',  'type' => 'image',    'return_format' => 'url'],
        ['key' => 'field_about_years',  'label' => 'Років досвіду', 'name' => 'about_years',  'type' => 'number',   'default_value' => 8],
        ['key' => 'field_about_title',  'label' => 'Заголовок',     'name' => 'about_title',  'type' => 'text',     'default_value' => 'МИ НЕ ПРОСТО АГЕНЦІЯ. МИ ВАШ ПАРТНЕР У РОСТІ.'],
        ['key' => 'field_about_text',   'label' => 'Текст',         'name' => 'about_text',   'type' => 'textarea', 'default_value' => "Digitalize народилася з ідеї, що маркетинг має бути прозорим та вимірюваним. Ми об'єднали кращих аналітиків та креативників, щоб створювати кампанії, які неможливо ігнорувати."],
        ['key' => 'field_about_checkpoints', 'label' => 'Список переваг', 'name' => 'about_checkpoints', 'type' => 'repeater',
         'button_label' => 'Додати пункт', 'sub_fields' => [
            ['key' => 'field_checkpoint_text', 'label' => 'Текст', 'name' => 'text', 'type' => 'text'],
        ]],
        ['key' => 'field_about_cta',     'label' => 'Кнопка текст', 'name' => 'about_cta',     'type' => 'text', 'default_value' => 'Дізнатися більше про нас'],
        ['key' => 'field_about_cta_url', 'label' => 'Кнопка URL',   'name' => 'about_cta_url', 'type' => 'url',  'default_value' => '/about/'],

        // ── ПРОЦЕС ────────────────────────────────────────────────────────────
        ['key' => 'tab_process', 'label' => 'Процес', 'name' => '', 'type' => 'tab'],

        ['key' => 'field_process_title',    'label' => 'Заголовок',    'name' => 'process_title',    'type' => 'text', 'default_value' => 'ЯК МИ ПРАЦЮЄМО'],
        ['key' => 'field_process_subtitle', 'label' => 'Підзаголовок', 'name' => 'process_subtitle', 'type' => 'text', 'default_value' => 'Чіткий алгоритм дій для досягнення ваших цілей.'],
        ['key' => 'field_process_steps', 'label' => 'Кроки', 'name' => 'process_steps', 'type' => 'repeater',
         'button_label' => 'Додати крок', 'sub_fields' => [
            ['key' => 'field_step_number', 'label' => 'Номер', 'name' => 'step',  'type' => 'text'],
            ['key' => 'field_step_title',  'label' => 'Назва', 'name' => 'title', 'type' => 'text'],
            ['key' => 'field_step_desc',   'label' => 'Опис',  'name' => 'desc',  'type' => 'textarea'],
        ]],

        // ── ВІДГУКИ ───────────────────────────────────────────────────────────
        ['key' => 'tab_testimonials', 'label' => 'Відгуки', 'name' => '', 'type' => 'tab'],

        ['key' => 'field_testimonials_title',    'label' => 'Заголовок',    'name' => 'testimonials_title',    'type' => 'text', 'default_value' => 'ЩО ПРО НАС КАЖУТЬ КЛІЄНТИ'],
        ['key' => 'field_testimonials_subtitle', 'label' => 'Підзаголовок', 'name' => 'testimonials_subtitle', 'type' => 'text', 'default_value' => 'Довіра — це фундамент нашої роботи. Ми пишаємося успіхами наших партнерів.'],
        ['key' => 'field_testimonials_count',    'label' => 'Лічильник',    'name' => 'testimonials_count',    'type' => 'text', 'default_value' => '500+'],
        ['key' => 'field_testimonials', 'label' => 'Відгуки', 'name' => 'testimonials', 'type' => 'repeater',
         'button_label' => 'Додати відгук', 'sub_fields' => [
            ['key' => 'field_testimonial_name', 'label' => "Ім'я",  'name' => 'name', 'type' => 'text'],
            ['key' => 'field_testimonial_role', 'label' => 'Посада','name' => 'role', 'type' => 'text'],
            ['key' => 'field_testimonial_text', 'label' => 'Текст', 'name' => 'text', 'type' => 'textarea'],
        ]],

        // ── CTA ───────────────────────────────────────────────────────────────
        ['key' => 'tab_cta', 'label' => 'CTA блок', 'name' => '', 'type' => 'tab'],

        ['key' => 'field_cta_title',      'label' => 'Заголовок', 'name' => 'cta_title',      'type' => 'text',     'default_value' => 'ГОТОВІ ДО ВИБУХОВОГО РОСТУ?'],
        ['key' => 'field_cta_subtitle',   'label' => 'Текст',     'name' => 'cta_subtitle',   'type' => 'textarea', 'default_value' => 'Залиште заявку сьогодні та отримайте безкоштовний аудит вашої рекламної стратегії вартістю $500.'],
        ['key' => 'field_cta_button',     'label' => 'Кнопка',    'name' => 'cta_button',     'type' => 'text',     'default_value' => 'Хочу аудит'],
        ['key' => 'field_cta_button_url', 'label' => 'Кнопка URL','name' => 'cta_button_url', 'type' => 'url',      'default_value' => '/contact/'],

        // ── FAQ ───────────────────────────────────────────────────────────────
        ['key' => 'tab_faq', 'label' => 'FAQ', 'name' => '', 'type' => 'tab'],

        ['key' => 'field_faq_title', 'label' => 'Заголовок', 'name' => 'faq_title', 'type' => 'text', 'default_value' => 'ЧАСТІ ЗАПИТАННЯ'],
        ['key' => 'field_faq_items', 'label' => 'Питання', 'name' => 'faq_items', 'type' => 'repeater',
         'button_label' => 'Додати питання', 'sub_fields' => [
            ['key' => 'field_faq_q', 'label' => 'Питання',   'name' => 'q', 'type' => 'text'],
            ['key' => 'field_faq_a', 'label' => 'Відповідь', 'name' => 'a', 'type' => 'textarea'],
        ]],

        // ── КОНТАКТ ───────────────────────────────────────────────────────────
        ['key' => 'tab_contact', 'label' => 'Контакт', 'name' => '', 'type' => 'tab'],

        ['key' => 'field_contact_title',    'label' => 'Заголовок',    'name' => 'contact_title',    'type' => 'text',     'default_value' => 'ОБГОВОРИМО ВАШ ПРОЄКТ?'],
        ['key' => 'field_contact_subtitle', 'label' => 'Підзаголовок', 'name' => 'contact_subtitle', 'type' => 'textarea', 'default_value' => "Заповніть форму, і наш експерт зв'яжеться з вами протягом 30 хвилин."],
        ['key' => 'field_contact_button',   'label' => 'Кнопка',       'name' => 'contact_button',   'type' => 'text',     'default_value' => 'Надіслати запит'],
    ],
]);
