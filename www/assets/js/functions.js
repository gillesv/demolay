$(document).ready(function() {
	
	// references
	var $main = $('#main'),
		$container = $('#container'),
		touch = Modernizr.touch;
	
	// STEP 1: load the data
	$container.load("/grid.php", function(evt){
		//alert("loaded");
		
		if(!touch) {
			initDesktopScrolling();
		}
		
		// overflow toss to center
		/*
		var h = $container.height();
		
		$main.css({height: h + 'px'});
		*/
		
		overthrow.toss(
			$main[0], 
			{
				top: "+600",
				left: 500,
				duration: 600
			}
		);
	});
	
	// STEP 2: desktop drag scrolling
	
	var curXPos = 0,
		curYPos = 0,
		curDown = false;
	
		
	function initDesktopScrolling () {
		/*
		window.addEventListener("mousedown", function(e) {
			curDown = true;
			curYPos = e.pageY;
			curXPos = e.pageX;
		});
		
		window.addEventListener("mouseup", function(e) {
			curDown = false;
		});
		
		window.addEventListener("mousemove", function(e) {
			if(curDown === true) {
				//console.log(curXPos + " " + e.pageX + " " + curYPos + " " + e.pageY);
				
				$main.scrollLeft(curXPos - e.pageX);
				$main.scrollTop(curYPos + e.pageY);
			}
		});
		*/
	}
});