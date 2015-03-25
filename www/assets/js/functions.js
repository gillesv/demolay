$(document).ready(function() {
	
	// references
	var $main = $('#main'),
		$container = $('#container'),
		$window = $(window),
		touch = Modernizr.touch;
	
	// STEP 1: load the data
	$container.load("/grid.php", function(evt){
		// while we're waiting 500ms, show some animation or whatever
		
		setTimeout(function() {
			snapToCenter();
			
			if(!touch) {
				initDesktopScrolling();
			}
		}, 500);
	});
	
	// wait for the layout to be finished, then measure
	function snapToCenter() {
		var w1 = $container.width(),
			h1 = $container.height(),
			w2 = $window.width(),
			h2 = $window.height();
		
		// overflow toss to center
		overthrow.toss(
			$main[0], 
			{
				left: (w1 - w2)/2,
				top: (h1 - h2)/2,
				duration: 0	// instant, show animation
			}
		);
	}
	
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