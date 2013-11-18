<?php
require_once($supportfile);
global $options;

// TODO fix nonce check
//$code = "varmeta-update-" . $_POST["varmeta_update_code"];

if (isset($_POST["varmeta_content"]) && $_POST["varmeta_content"]) {
	//check_admin_referrer($code);
	$content = $_POST["varmeta_content"];
	echo "<!-- content is $content -->\n\r";
	$starting = $_POST["varmeta_starting_fields"];
	echo "<!-- starting content is $starting -->\n\r";
	
	// rehydrate field array
	// validate data
	// find existing fields in meta
	// update meta with changes
}

?>
<div class="wrap">
	<form method="post" action="<?php echo $_SERVER["REQUEST_URI"]; ?>">
		<?php
			$updatecode = varmeta_create_id();
			settings_fields($options->Group);
			do_settings_sections($options->Group);
			wp_nonce_field("varmeta-update-" . $updatecode);
		?>
		<div id="varmeta_field_list" style="padding-left: 1em;">
			<h3>Current fields:</h3>
			<div id="varmeta_fields"></div>
			<a href="#" onclick="javascript:varmeta_show_field_dialog(null);">Add a new field</a>
			<input type="hidden" name="varmeta_update_code" value="<?php echo $updatecode ?>" />
			<input type="hidden" name="varmeta_content" id="varmeta_content" />
			<input type="hidden" name="varmeta_starting_fields" id="varmeta_starting_fields" value="<?php echo varmeta_encode_field_list($options->Fields) ?>" />
		</div>
		<?php submit_button(); ?>
	</form>
</div>
<div id="varmeta_overlay"></div>
<div id="varmeta_overlay_box">
	<div id="varmeta_dialog">
		<form>
			<div id="icon-edit-pages" class="icon32"></div>
			<div class="wrap">
				<h2>Varmeta Field Editor</h2>
				<ul>
					<li>
						<label for="varmeta_field_name">Name<span> *</span>: </label>
						<input id="varmeta_field_name" maxlength="45" size="10" name="varmeta_field_name" value="" id="varmeta_field_name" />
					</li>
					<li>
						<label for="varmeta_field_type">Type: </label>
						<select name="varmeta_field_type" id="varmeta_field_type">
							<option>text</option>
							<option>options</option>
							<option>choice</option>
							<option>money</option>
							<option>ZIP code</option>
						</select>
					</li>
				</ul>
				<input type="submit" onclick="javascript:return varmeta_edit_submit();" />
			</div>	
			<div class="varmeta_dialog_close" onclick="javascript:varmeta_dialog(false, null);">X</div>
		</form>
	</div>
</div>
<?php
?>
<script>varmeta_update_starting_fields();</script>


