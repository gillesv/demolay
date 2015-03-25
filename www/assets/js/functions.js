$(document).ready(function() {
	
	// references
	var $main = $('#main'),
		$container = $('#container'),
		$window = $(window),
		touch = Modernizr.touch;
	
	// STEP 1: load the data
	$container.load("grid.html", function(evt){
		// while we're waiting 500ms, show some animation or whatever
		
		alert($window.height());
		
		setTimeout(function() {
			snapToCenter();
		}, 500);
	});
	
	// wait for the layout to be finished, then measure
	function snapToCenter() {
		var w1 = $container.width(),
			h1 = $container.height(),
			w2 = $window.width(),
			h2 = $window.height();  // 460 iphone 5
		
		// overflow toss to center
		overthrow.toss(
			$main[0], 
			{
				left: (w1 - w2)/2,
				top: (h1 - h2)/2,
				duration: 0	// instant, show animation
			}
		);
		
		setTimeout(function(){
			if(!touch) {
				initDesktopScrolling();
			};
		}, 500);
	}
	
	// STEP 2: desktop drag scrolling
	
	var curXPos = 0,
		curYPos = 0,
		curScrollLeft = 0,
		curScrollTop = 0,
		deltaX = 0,
		deltaY = 0,
		maxScrollLeft = 0,
		maxScrollTop = 0,
		curDown = false;
	
		
	function initDesktopScrolling () {
		curScrollLeft = $main.scrollLeft();
		curScrollTop = $main.scrollTop();
		maxScrollLeft = $main[0].scrollWidth - $main.width();
		maxScrollTop = $main[0].scrollHeight - $main.height();
	
		window.addEventListener("mousedown", function(e) {
			curDown = true;
			curYPos = e.pageY;
			curXPos = e.pageX;
			curScrollLeft = $main.scrollLeft();
			curScrollTop = $main.scrollTop();
		});
	
		window.addEventListener("mouseup", function(e) {
			curDown = false;
			
			deltaX = deltaY = 0;
		});
	
		window.addEventListener("mousemove", function(e) {
			if(curDown) {
				deltaX = curXPos - e.pageX;
				deltaY = curYPos - e.pageY;
			};
		});
		
		function moveScroll() {
			if(curDown) {			
				$main.scrollLeft(curScrollLeft + deltaX);
				$main.scrollTop(curScrollTop + deltaY);
			}
		}
		
		(function animationLoop() {
			requestAnimFrame(animationLoop);
			moveScroll();
		})();
	}
});

// RAF fallback by http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();