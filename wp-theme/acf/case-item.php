<?php
if (!function_exists('acf_add_local_field_group')) {
    return;
}

acf_add_local_field_group([
    'key'      => 'group_case_item',
    'title'    => 'Дані кейсу',
    'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'digitalize_case']]],
    'position' => 'acf_after_title',
    'fields'   => [
        [
            'key'   => 'tab_case_metrics',
            'label' => 'Метрики (для картки на /cases/)',
            'name'  => '',
            'type'  => 'tab',
        ],
        [
            'key'           => 'field_case_roi',
            'label'         => 'ROI',
            'name'          => 'case_roi',
            'type'          => 'text',
            'placeholder'   => 'напр. 520%',
            'default_value' => '',
        ],
        [
            'key'           => 'field_case_cpa',
            'label'         => 'CPA',
            'name'          => 'case_cpa',
            'type'          => 'text',
            'placeholder'   => 'напр. $2.4',
            'default_value' => '',
        ],
        [
            'key'           => 'field_case_roas',
            'label'         => 'ROAS',
            'name'          => 'case_roas',
            'type'          => 'text',
            'placeholder'   => 'напр. 6.2',
            'default_value' => '',
        ],
        [
            'key'   => 'tab_case_client',
            'label' => 'Клієнт',
            'name'  => '',
            'type'  => 'tab',
        ],
        [
            'key'           => 'field_case_client_name',
            'label'         => 'Назва клієнта / бренду',
            'name'          => 'case_client_name',
            'type'          => 'text',
            'instructions'  => 'Опційно, для блоку на сторінці кейсу.',
            'default_value' => '',
        ],
        [
            'key'           => 'field_case_industry',
            'label'         => 'Ніша / індустрія',
            'name'          => 'case_industry',
            'type'          => 'text',
            'default_value' => '',
        ],
    ],
]);
