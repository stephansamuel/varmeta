<?php

require("varmeta_support.php");

$fields = array();
$fields[] = new VarmetaField("test1", "text");
$fields[] = new VarmetaField("test2", "options", array("one", "two", "three"));

$encoded = varmeta_encode_field_list($fields);

?>
<html>
<head>
<script src="varmeta_support.js"></script>
<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
</head>
<body>
<pre id="in"><?php echo $encoded; ?></pre>
<pre id="out"></pre>
<script>
//var input = 'a:2:{i:0;O:12:"VarmetaField":4:{s:4:"Name";s:5:"Hard1";s:2:"ID";s:36:"b0f9dce1-d3ce-ad39-36b5-d66933e8a31b";s:4:"Type";s:4:"text";s:7:"Options";a:0:{}}i:1;O:12:"VarmetaField":4:{s:4:"Name";s:5:"Hard2";s:2:"ID";s:36:"8cbafe99-afa7-3df3-a0e5-b1792632251f";s:4:"Type";s:4:"text";s:7:"Options";a:3:{i:0;s:2:"o1";i:1;s:2:"o2";i:2;s:2:"o3";}}}';
//alert('start');

var input = '<?php echo $encoded; ?>';

var processed = varmeta_unserialize(input);
alert(processed[0].Name);
$("#out").html(processed);
</script>
</body>
</html>
