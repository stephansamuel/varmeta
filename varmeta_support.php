<?php

function varmeta_create_id() {
	$parts = array(8, 4, 4, 4, 12);
	$values = array();
	for ($i = 0; $i < count($parts); $i++) {
		$val = "";
		for ($j = 0; $j < $parts[$i]; $j++) {
			$val .= sprintf("%x", mt_rand(0, 15));
		}
		$values[] = $val;
	}
	return implode("-", $values);
}

function varmeta_encode_field_list($list) {
	// TODO check type
	return esc_attr(json_encode($list));
}

class VarmetaField {
	public $Name;
	public $ID;
	public $Type;
	public $Options = array();
	
	public function __construct($n, $t, $o = NULL, $i = NULL) {
		// TODO check types
		$this->ID = NULL == $i ? varmeta_create_id() : $i;
		$this->Name = $n;
		$this->Type = $t;
		if (!is_null($o)) {
			$this->Options = $o;
		}
	}
}

class VarmetaOptions {
	private $external = array(
		"Group" => "varmeta_settings",
		"Options" => array(
			"general" => "varmeta_general_options",
			"fields" => "varmeta_field_list"
		),
		"Fields" => array()
	);

	public function __construct() {
		$this->external["Fields"][] = new VarmetaField("Hard1", "text");
		$this->external["Fields"][] = new VarmetaField("Hard2", "options", array("o1", "o2", "o3"));
	}
	
	public function __get($name) {
		return $this->external[$name];
	}
}

?>