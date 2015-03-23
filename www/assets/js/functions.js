$(document).ready(function() {
	
	// references
	var $container = $('#container');
	
	// STEP 1: load the data
	$container.load("/grid.php", function(evt){
		//alert("loaded");
	});
	
});