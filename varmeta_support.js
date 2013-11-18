/*
a:2:{
	i:0;O:12:"VarmetaField":4:{s:4:"Name";s:5:"Hard1";s:2:"ID";s:36:"b0f9dce1-d3ce-ad39-36b5-d66933e8a31b";s:4:"Type";s:4:"text";s:7:"Options";a:0:{}}
	i:1;O:12:"VarmetaField":4:{s:4:"Name";s:5:"Hard2";s:2:"ID";s:36:"8cbafe99-afa7-3df3-a0e5-b1792632251f";s:4:"Type";s:4:"text";s:7:"Options";a:3:{i:0;s:2:"o1";i:1;s:2:"o2";i:2;s:2:"o3";}}
}
*/

/*
function varmeta_unserialize (data) {
	const MAX_ARRAY_LENGTH = 1000;
	
	var that = this,
		ReadUntil = function(data, offset, stop) {
//alert("stop: " + stop);
			var i = 0, buf = [], chr = "", part = "";
			var len = stop.length;
			while (part != stop) {
//alert("i: " + i + "; offset: " + offset);
				if ((i + offset + len) > data.length) {
					return null;
				}
				chr = data.substr(i + offset, 1);
//alert("chr [" + chr + "]");
				part = data.substr(i + offset, len);
//alert("part [" + part + "]");
				buf.push(chr);
//alert("buf is [" + buf.join('') + "]");
				i++;
			}
alert("b_len: " + buf.length + ", len: " + len + ", offset: " + offset);
alert("buf: " + buf.join(''));
			return buf.join('').substr(0, buf.length - 1);
		};
	
	var startcheck = ReadUntil(data, 0, ":");
	if (null == startcheck || 1 != startcheck.length || "a" != startcheck) {
		return null;
	}
	
	var fieldcount = ReadUntil(data, startcheck.length + 1, ":");
	if (null == fieldcount || NaN == parseInt(fieldcount) || fieldcount > MAX_ARRAY_LENGTH) {
		return null;
	}

	var fields = [];
	var offset = startcheck.length + fieldcount.length + 2;
alert("fieldcount: " + fieldcount);
	for (var counter = 0; counter < fieldcount; counter++) {
alert("data: " + data);
alert("offset_1: " + offset);
		offset += (3 + (counter + '').length);
alert("offset_2: " + offset);
		var next = ReadUntil(data, offset, "i:" + (counter + 1) + ";");
alert("next: " + next);
		if (null == next) {
			return fields.join('\n\r');
		}
		next = next.substr(1, next.length - 2);
		fields.push(next);
		offset += next.length;
	}
	return null;	
}
*/

function varmeta_unserialize(data) {
	return JSON.parse(data);
}