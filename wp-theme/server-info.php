<?php
header('Content-Type: text/plain; charset=utf-8');
echo "Server: " . ($_SERVER['SERVER_SOFTWARE'] ?? 'unknown') . "\n";
echo "PHP: " . PHP_VERSION . "\n";
echo "OS: " . PHP_OS . "\n";
unlink(__FILE__);
echo "Script deleted.\n";
