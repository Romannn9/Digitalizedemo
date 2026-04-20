<?php
/**
 * Install & activate plugins
 * URL: https://digitalize.com.ua/wp-content/themes/digitalize/install-plugins.php
 */
require_once dirname(dirname(dirname(__DIR__))) . '/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/plugin.php';
require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
require_once ABSPATH . 'wp-admin/includes/misc.php';

header('Content-Type: text/plain; charset=utf-8');

$admins = get_users(['role' => 'administrator', 'number' => 1]);
if ($admins) wp_set_current_user($admins[0]->ID);

WP_Filesystem();

class Silent_Skin extends WP_Upgrader_Skin {
    public function feedback($string, ...$args) {}
    public function header() {}
    public function footer() {}
}

function install_and_activate(string $slug): void {
    // Шукаємо головний файл плагіна
    $plugin_file = null;
    if (file_exists(WP_PLUGIN_DIR . "/$slug")) {
        foreach (glob(WP_PLUGIN_DIR . "/$slug/*.php") as $f) {
            $data = get_plugin_data($f, false, false);
            if (!empty($data['Name'])) { $plugin_file = "$slug/" . basename($f); break; }
        }
        echo "Already installed: $slug\n";
    } else {
        $api = plugins_api('plugin_information', ['slug' => $slug, 'fields' => ['sections' => false]]);
        if (is_wp_error($api)) { echo "API error: " . $api->get_error_message() . "\n"; return; }

        $upgrader = new Plugin_Upgrader(new Silent_Skin());
        $result   = $upgrader->install($api->download_link);
        if (is_wp_error($result) || $result === false) {
            echo "Install failed: " . (is_wp_error($result) ? $result->get_error_message() : 'unknown') . "\n";
            return;
        }
        echo "Installed: $slug\n";

        foreach (glob(WP_PLUGIN_DIR . "/$slug/*.php") as $f) {
            $data = get_plugin_data($f, false, false);
            if (!empty($data['Name'])) { $plugin_file = "$slug/" . basename($f); break; }
        }
    }

    if (!$plugin_file) { echo "Cannot find main plugin file for $slug\n"; return; }
    if (is_plugin_active($plugin_file)) { echo "Already active: $plugin_file\n"; return; }

    $activated = activate_plugin($plugin_file);
    if (is_wp_error($activated)) {
        echo "Activation error: " . $activated->get_error_message() . "\n";
    } else {
        echo "Activated: $plugin_file\n";
    }
}

foreach (['wp-super-cache', 'seo-by-rank-math'] as $slug) {
    echo "\n--- $slug ---\n";
    install_and_activate($slug);
}

echo "\n✅ Done!\n";
unlink(__FILE__);
echo "🗑 Script deleted.\n";
