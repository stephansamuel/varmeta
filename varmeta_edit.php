<?php
require_once($supportfile);
global $options;
?>
<style>
</style>


<div class="wrap">
	<form method="post" action="options.php">
		<?php
			settings_fields($options->Group);
			do_settings_sections($options->Group);
		?>
		<div id="varmeta_field_list" style="padding-left: 1em;">
			<h3>Current fields:</h3>
			<div id="varmeta_fields"></div>
			<a href="#" onclick="javascript:varmeta_add_field();">Add a new field</a>
		</div>
		<?php submit_button(); ?>
	</form>
</div>
<div id="varmeta_overlay"></div>
<div id="varmeta_overlay_box">
	<div id="varmeta_dialog">
		<form>
			Name: <input />
			<br/>
			Type:
				<select>
					<option>text</option>
					<option>money</option>
					<option>ZIP code</option>
				</select>
			<br/>					
		</form>
	</div>
</div>
<?php
?>
<input type="hidden" id="varmeta_starting_fields" value="<?php echo varmeta_encode_field_list($options->Fields) ?>" />
<script>varmeta_update_starting_fields();</script>


