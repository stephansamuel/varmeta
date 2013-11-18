// TODO add handler for navigate-away with soiled indicator

const EMPTY_ID = "00000000-0000-0000-0000-000000000000";


var VarmetaField = (function() {
	var ctor = function(id, type, name, options) {
		// TODO validate ID with regexp
		
		// TODO validate type is in a valid list of options
		
		// TODO validate name is not null/empty and contains valid characters
		
		var opttype = Object.prototype.toString.call(options);
		if (null == options) {
			options = [];
		} else if (opttype != "[object Array]") {
			options = options.split('|');
		}

		this.ID = id;
		this.Name = name;
		this.Type = type;
		this.Options = options;
	};
	return ctor;
})();

var VarmetaFieldCollection = (function() {
	var ctor = function(ser) {
		
	};
	return ctor;
})();

function varmeta_update_starting_fields() {
	const MAX_PATTERN_MATCHES = 100;

	jQuery(document).ready(function($) {
		var starting = $("#varmeta_starting_fields").val();
		$.each(varmeta_unserialize(starting), function(index, value) {
			varmeta_draw_field(value);
		});
		//alert(starting);
		// TODO check we have values
		/*
		var pattern = /{([^}]*)}/g;
		var items = $(starting.split(pattern, MAX_PATTERN_MATCHES))
			.filter(function(index, value) { return value.length > 1; })
			.each(function(index, value) {
				pattern = /([0-9a-f\-]*)\:\(([^\)]*)\)\(([^\)]*)\)\:(.*)/i;
				var parts = value.split(pattern, MAX_PATTERN_MATCHES);
				varmeta_draw_field(parts[1], parts[2], parts[3], parts[4]);
			});
		*/
	});
}

function varmeta_encode_fields() {
	/*
	jQuery(document).ready(function($) {
		var content = "";
		$("#varmeta_fields div").each(function() {
			var id = $(this).attr("field_id");
			var name = $(this).attr("field_name");
			var type = $(this).attr("field_type");
			var options = $(this).attr("field_options");
			content += "{" + id + ":(" + type + ")(" + name + "):" + options + "}";
		});
		$("#varmeta_content").val(content);
	});
	*/
	jQuery(document).ready(function($) {
		var content = [];
		$("#varmeta_fields div").each(function() {
			var id = $(this).attr("field_id");
			var type = $(this).attr("field_type");
			var name = $(this).attr("field_name");
			var options = $(this).attr("field_options").split('|');
			var obj = new VarmetaField(id, type, name, options);
			content.push(obj);
			//content.push({ ID: $(this).attr("field_id"), Type: $(this).attr("field_type"), Name: $(this).attr("field_name"), Options: $(this).attr("field_options").split('|') });
		});
		$("#varmeta_content").val(JSON.stringify(content));
	});
}

function varmeta_draw_field(item) {
	// TODO check contract

	const MAX_PATTERN_MATCHES = 100;
	
	if (null == item.ID) { item.ID = EMPTY_ID; }
	if (null == item.Options) { item.Options = []; }

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
		.text(item.Name + " (" + item.Type + ")")
		.addClass('varmeta_field_text');
	var controls = jQuery('<span>')
		.addClass('varmeta_field_controls')
		.append(jQuery('<a>').attr('href', '#').text('Edit'))
		.append(jQuery('<a>').attr('href', '#').text('Remove'));
	var options = jQuery('<p>')
		.text(item.Options.join(' | '))
		.addClass('varmeta_field_options');
	container
		.append(jQuery('<div>')
			.attr("id", "varmeta_field_" + item.ID)
			.attr("field_id", item.ID)
			.attr("field_name", item.Name)
			.attr("field_type", item.Type)
			.attr("field_options", item.Options.join('|'))
			.addClass("varmeta_field_item")
			.attr("onclick", "javascript:varmeta_show_field_dialog('" + item.ID + "');")
			.append(textblock)
			.append(controls)
			.append(options)
		);
}

function varmeta_show_field_dialog(id) {
	var dialog = jQuery('#varmeta_dialog');
	if (null != id) {
		var current = jQuery("#varmeta_field_" + id);
		if (null != current) {
			var name = current.attr("field_name");
			jQuery(dialog).children("#varmeta_field_name").val(current.attr("field_name"));
			jQuery(dialog).children("#varmeta_field_type").val(current.attr("field_type"));
		}
	}
	varmeta_dialog(true, dialog.html());
}

function varmeta_dialog(state, message) {
	jQuery(document).ready(function($) {
		if (state) {
			var h = $(document).height();
			var w = $(window).width();
			var t = (h/6) - ($('#varmeta_overlay_box').height());
			var l = (w/2) - ($('#varmeta_overlay_box').width()/2);

			if (null != message) {
				$('#varmeta_dialog').html(message);			
			}
			$('#varmeta_overlay').css({height: h, width: w}).show();
			$('#varmeta_overlay_box').css({top: t, left: l}).show();
			$('#varmeta_dialog').show();
		} else {
			$('#varmeta_overlay, #varmeta_overlay_box, #varmeta_dialog').hide();
		}
	});
}

function varmeta_edit_submit() {
	// TODO validate values
	var type = jQuery('#varmeta_field_type').val();
	var name = jQuery('#varmeta_field_name').val();
	// TODO validate field name doesn't already exist
	var options = null;
	varmeta_draw_field(new VarmetaField(null, type, name, options));
	varmeta_dialog(false, null);
	varmeta_encode_fields();
	return false;
}
