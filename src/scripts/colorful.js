'use strict';

// # Colorful Effect
// ________________

var $ = require('jquery');

$(function(){

	var sColors = "yellow amber orange sunset red fuchsia purple indigo blue aqua green lime";
	var colors = sColors.split(' ');



	var $window = $(window);

	// ## colorful elements
	// - icon treated differently

	var $colorful = $('.colorful');
	var $borders = $('.border');
	var $icon = $('.icon g');


	// seed icon with a starting color
	var prevI = Math.floor(Math.random()*colors.length);
	$icon.attr('class', colors[prevI]);
	prevI = (prevI + 1) % colors.length;


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


	// if is mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile');

		// !!! better selector names

		$window.on('touchstart', function(e){
			$('p b, ul a.colorful, .dot.colorful').each(function(index, el){
				var $target = $(el);
				var newColor = colors[Math.floor(Math.random()*colors.length)];
				$target.addClass(newColor);
			});
		});

		$window.on('touchend', function(e){
			$('p b, ul a.colorful, .dot.colorful').each(function(index, el){
				var $target = $(el);
				$target.removeClass(sColors);
			});
			$icon.attr('class', colors[prevI]);
			prevI = (prevI + 1) % colors.length;
		});
	}
	else {
		// seed bold elements with a starting color
		// !!! this should be better specified, perhaps as part of article?
		$('p b').each(function(i,target){
			var newColor = colors[Math.floor(Math.random()*colors.length)];
			$(target).addClass(newColor);
		});

		// change colorful element's color
		$colorful.mouseenter(function(e){
			var $target = $(e.target).closest('.colorful');
			var newColor = colors[Math.floor(Math.random()*colors.length)];
			$target.addClass(newColor);
		});

		// back to grey when mouse leaves colorful element
		$colorful.mouseleave(function(e){
			var $target = $(e.target).closest('.colorful');
			$target.removeClass(sColors);
		});
	}

});
