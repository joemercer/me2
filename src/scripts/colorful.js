'use strict';

// # Colorful Effect
// ________________

var $ = require('jquery');

$(function(){

	var sColors = "yellow amber orange sunset red fuchsia purple indigo blue aqua green lime";
	var colors = sColors.split(' ');



	// ## colorful elements
	// - icon treated differently

	var $colorful = $('.colorful');
	var $borders = $('.border');
	var $icon = $('.icon g');

	// seed each element with a starting color

	var prevI = Math.floor(Math.random()*colors.length);
	$icon.attr('class', colors[prevI]);
	prevI = prevI + 1;

	$colorful.each(function(i,target){
		var newColor = colors[Math.floor(Math.random()*colors.length)];
		$(target).addClass(newColor);
	});

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

	// change the color when the mouse leaves the element
	$colorful.mouseleave(function(e){
		var $target = $(e.target).closest('.colorful');
		var newColor = colors[Math.floor(Math.random()*colors.length)];
		$target.removeClass(sColors);
		$target.addClass(newColor);
	});

});
