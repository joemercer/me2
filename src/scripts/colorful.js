'use strict';

// # Colorful Effect
// ________________

var $ = require('jquery');

$(function(){

	var sColors = "yellow amber orange sunset red fuchsia purple indigo blue aqua green lime";
	var colors = sColors.split(' ');



	var $window = $(window);

	// ## colorful elements
	// - colorful => fixed (random) color
	// - rainbow => change color effect
	// - icon treated differently (kaleidascope)

	var $colorful = $('.colorful');
	var $rainbow = $('.rainbow');
	var $borders = $('.border');
	var $icon = $('.icon g');


	// seed icon with a starting color
	var prevI = Math.floor(Math.random()*colors.length);
	$icon.attr('class', colors[prevI]);
	prevI = (prevI + 1) % colors.length;


	// if is mobile
	if( /Android|webOS/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile');

		// tap icon to change color
		$window.on('touchstart', function(e){
			$icon.attr('class', colors[prevI]);
			prevI = (prevI + 1) % colors.length;
		});

		$window.on('touchstart', function(e){
			$('b.colorful, p a.rainbow, ul a.rainbow, .dot.rainbow').each(function(index, el){
				var $target = $(el);
				var newColor = colors[Math.floor(Math.random()*colors.length)];
				$target.addClass(newColor);
			});
		});

		$window.on('touchend', function(e){
			$('b.colorful, p a.rainbow, ul a.rainbow, .dot.rainbow').each(function(index, el){
				var $target = $(el);
				$target.removeClass(sColors);
			});
			$icon.attr('class', colors[prevI]);
			prevI = (prevI + 1) % colors.length;
		});
	}
	else if( /iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile ios');

		// tap icon to change color
		$window.on('touchstart', function(e){
			$icon.attr('class', colors[prevI]);
			prevI = (prevI + 1) % colors.length;
		});

		// seed colorful elements with a starting color
		$colorful.each(function(i,target){
			var newColor = colors[Math.floor(Math.random()*colors.length)];
			$(target).addClass(newColor);
		});
		$('b.colorful, .dot.rainbow').each(function(i, target){
			var newColor = colors[Math.floor(Math.random()*colors.length)];
			$(target).addClass(newColor);
		});
	}
	else {
		// kaleidoscope when mouse enters icon
		$icon.mouseenter(function(){
			$icon.attr('class', colors[prevI]);
			$borders.removeClass(sColors);
			$borders.addClass(colors[prevI]);
			var intervalId = window.setInterval(function(){
				var i = (prevI + 1) % colors.length;
				$icon.attr('class', colors[i]);
				$borders.removeClass(sColors);
				$borders.addClass(colors[i]);
				prevI = i;
			}, 2000);

			$icon.mouseleave(function(){
				window.clearInterval(intervalId);
				$borders.removeClass(sColors);
			});
		});

		// seed colorful elements with a starting color
		$colorful.each(function(i,target){
			var newColor = colors[Math.floor(Math.random()*colors.length)];
			$(target).addClass(newColor);
		});

		// add rainbow element's color
		$rainbow.mouseenter(function(e){
			var $target = $(e.target).closest('.rainbow');
			var newColor = colors[Math.floor(Math.random()*colors.length)];
			$target.addClass(newColor);
		});

		// default rainbow element color
		$rainbow.mouseleave(function(e){
			var $target = $(e.target).closest('.rainbow');
			$target.removeClass(sColors);
		});
	}

});
