function varmeta_update_starting_fields() {
	const MAX_PATTERN_MATCHES = 100;
	
	jQuery(document).ready(function($) {
		var starting = $("#varmeta_starting_fields").val();
		// TODO check we have values
		var pattern = /{([^}]*)}/g;
		var items = $(starting.split(pattern, MAX_PATTERN_MATCHES))
			.filter(function(index, value) { return value.length > 1; })
			.each(function(index, value) {
				pattern = /([0-9a-f\-]*)\:\(([^\)]*)\)\(([^\)]*)\)\:(.*)/i;
				var parts = value.split(pattern, MAX_PATTERN_MATCHES);
				varmeta_draw_field(parts[1], parts[2], parts[3], parts[4]);
			});
	});
}

function varmeta_draw_field(id, type, name, options) {
	const MAX_PATTERN_MATCHES = 100;
	
	var container = jQuery("#varmeta_fields");
	/*
	var pattern = /\(([^\)]*)\)/i;
	var o = [];
	if (options.length > 0) {
		jQuery(options.split(pattern, MAX_PATTERN_MATCHES))
			.filter(function(i, v) { return v.length > 1; });
			.each(function(i, v) {
				alert(i + ": " + v);
				o.push(v);
			});
	}
	*/
	var textblock = jQuery('<span>')
		.text(name + " (" + type + ")")
		.addClass('varmeta_field_text');
	var controls = jQuery('<span>')
		.addClass('varmeta_field_controls')
		.append(jQuery('<a>').attr('href', '#').text('Edit'))
		.append(jQuery('<a>').attr('href', '#').text('Remove'));
	container
		.append(jQuery('<div>')
			.attr("id", "varmeta_field_" + id)
			.attr("field_id", id)
			.attr("options", options)
			.addClass("varmeta_field_item")
			.append(textblock)
			.append(controls)
		);
}

function varmeta_add_field() {
	var msg = jQuery('#varmeta_dialog').html();
	varmeta_dialog(true, msg);
}

function varmeta_dialog(state, message) {
	jQuery(document).ready(function($) {
		if (state) {
			var h = $(document).height();
			var w = $(window).width();
			var t = (h/6) - ($('#varmeta_overlay_box').height());
			var l = (w/2) - ($('#varmeta_overlay_box').width()/2);

			$('#varmeta_dialog').html(message);			
			$('#varmeta_overlay').css({height: h, width: w}).show();
			$('#varmeta_overlay_box').css({top: t, left: l}).show();
		} else {
			$('#varmeta_overlay, #varmeta_dialog').hide();
		}
	});
}