<?php
/*
Plugin Name: Variable Meta 1
Plugin URI: http://www.ihaveawebsite.com/content/wp/plugins/varmeta/
Description: Supports variable post metadata
Author: Stephan Samuel
Version: 0.1.0
Author URI: http://www.ihaveawebsite.com/
*/

if (is_admin()) {
	$plugindir = plugin_dir_path(__FILE__);
	$supportfile = $plugindir . 'varmeta_support.php';
	
	require_once($supportfile);
	
	$options = new VarmetaOptions();

	add_action('admin_menu', 'varmeta_admin_menu');
	add_action('admin_init', 'varmeta_register_settings');
}

function varmeta_admin_menu() {
	$pagetitle = 'Variable Meta 1 Options';
	$menutitle = 'Variable Meta 1';
	$capability = 'manage_options';
	$slug = 'varmeta_unique_id';
	$function = 'varmeta_admin_options';
	add_options_page($pagetitle, $menutitle, $capability, $slug, $function);
}

function varmeta_admin_options() {
	if (!current_user_can('manage_options')) {
		wp_die(__('You do not have permissions to access this page.'));
	}
	global $plugindir, $supportfile;

	echo "<!-- plugin directory is [$plugindir] -->";
	require($plugindir . 'varmeta_edit.php');
}

function varmeta_register_settings() {
	global $options, $plugindir;

	foreach ($options->Options as $key => $unused) {
		register_setting($options->Group, $key);
	}
	$scripttag = 'varmeta_main';
	
	wp_register_script($scripttag, plugins_url("varmeta_main.js", __FILE__), array('jquery'));
	wp_enqueue_script($scripttag);
	
	wp_register_style($scripttag, plugins_url("varmeta_main.css", __FILE__));
	wp_enqueue_style($scripttag);
}

?>