$(document).ready(function() {
	
	// references
	var $main = $('#main'),
		$container = $('#container'),
		$window = $(window),
		$darken = $('#darken'),
		$overlay = $('#overlay'),
		$animator = $('#animator'),
		touch = Modernizr.touch;
	
	// STEP 1: load the data
	$container.load("grid.html", function(evt){
		// while we're waiting 500ms, show some animation or whatever
		setTimeout(function() {
			snapToCenter();
		}, 500);
	});
	
	// wait for the layout to be finished, then measure
	function snapToCenter() {
		var w1 = $container.width(),
			h1 = $container.height(),
			w2 = $window.width(),
			h2 = $window.height();  //  iphone 5: 460 Safari, 505 in QR 
		
		if(touch) {	// really dirty device detection hack
			if(h2 == 505) {
				h2 = 460;
			}
		}
		
		// overflow toss to center
		overthrow.toss(
			$main[0], 
			{
				left: (w1 - w2)/2,
				top: (h1 - h2)/2,
				duration: 0	// instant, show animation
			}
		);
		
		// system to figure out which elements are in the viewport, and animate them
		function showMicromonials() {
			$main.toggleClass("loading", false);
			
			var $inviewport = $('.micromonial:in-viewport'),
				total = Math.max(1, $inviewport.length);
			
			// get visible tiles
			$inviewport.each(function(i) {
				var $ref = $(this);
				
				$ref.addClass("animate");
				
				setTimeout(function() {
					$ref.addClass("zoom");
				}, i*(1000/total));
			});
		}
		
		setTimeout(function() {
			// show animation
			showMicromonials();
		}, 100);
		
		// init interactivity
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
		curDown = false,
		isDragging = false;
		
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
			
			setTimeout(function() {
				isDragging = false;
			}, 100);
			
			deltaX = deltaY = 0;
		});
	
		window.addEventListener("mousemove", function(e) {
			if(curDown) {
				deltaX = curXPos - e.pageX;
				deltaY = curYPos - e.pageY;
				
				isDragging = true;
			};
		});
		
		function moveScroll() {
			if(curDown && !overlayVisible) {			
				$main.scrollLeft(curScrollLeft + deltaX);
				$main.scrollTop(curScrollTop + deltaY);
			}
		}
		
		(function animationLoop() {
			requestAnimFrame(animationLoop);
			moveScroll();
		})();
	}
	
	// STEP 3: interactivity
	var overlayVisible = false,
		selectedIndex = -1,
		isSwiping = false;
	
	function showDarken() {
		$darken.fadeIn("slow");
	}
	
	function hideDarken() {
		$darken.fadeOut("slow");
	}
	
	function showSelectedIndex(newIndex) {
		if(newIndex < 0) {
			$overlay.fadeOut("slow", function(){
				$animator.hide();
			});
		}else {
			$animator.show();
			$overlay.fadeIn("slow");
			
		}
	}
	
	function hideOverlay() {
		hideDarken();
		
		overlayVisible = false;
		isSwiping = false;
		
		showSelectedIndex(-1);
	}
	
	function animRTL() {	// next
		isSwiping = true;
		
		$animator.animate({
			left: "-100%"
		},
		400,
		function(){
			$animator.css({
				left: "100%" 
			});
			
			$animator.animate({
				left: "0%"
			},
			400,
			function(){
				isSwiping = false;
			});
		});
	}
	
	function animLTR() {	// prev
		isSwiping = true;
		
		$animator.animate({
			left: "100%" 
		},
		400,
		function(){
			$animator.css({
				left: "-100%" 
			});
			
			$animator.animate({
				left: "0%"	
			},
			400,
			function(){
				isSwiping = false;
			});
		});
	}
			
	// event listeners
	$main.on('click', '.micromonial', function(evt){
		if(!isDragging) {
			overlayVisible = true;
			
			showDarken();
			
			var newIndex = parseInt($(this).attr('id').toString().split("micromonial-").join("").toString());
			
			showSelectedIndex(newIndex);
		}
	});
	
	$('#overlay .close').click(function(evt) {
		evt.preventDefault();
		
		hideOverlay();		
	});
	
	// touch events
	var hammertime;
	
	if(touch) {
		hammertime = new Hammer(document.getElementById("overlay"), {});
		
		hammertime.on("swipe", function(ev) {
			if(!isSwiping) {
				// swipe left & right
				switch(ev.direction) {
					case Hammer.DIRECTION_LEFT:
						animRTL();
					break;
					case Hammer.DIRECTION_RIGHT:
						animLTR();
					break;
				}
			}
		});
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