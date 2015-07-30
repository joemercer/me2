'use strict';

// # Colorful Effect
// ________________

var $ = require('jquery');

$(function(){

	var sColors = "yellow amber orange sunset red fuchsia purple indigo blue aqua green lime";
	var colors = sColors.split(' ');



	// ## color changing icon and borders

	var $icon = $('.icon g');
	var $borders = $('.border');
	var prevI = 7;

	$(window).mousedown(function(){
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

		$(window).mouseup(function(){
			window.clearInterval(intervalId);
			$icon.attr('class', '');
			$borders.removeClass(sColors);
			prevI = prevI + 1;
		});
	});

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
			$icon.attr('class', '');
			$borders.removeClass(sColors);
			prevI = prevI + 1;
		});
	});



	// ## colorful elements

	var $colorful = $('.colorful');

	// seed each element with a starting color
	$colorful.each(function(i,target){
		var newColor = colors[Math.floor(Math.random()*colors.length)];
		$(target).addClass(newColor);
	});

	// change the color when the mouse leaves the element
	$colorful.mouseleave(function(e){
		var $target = $(e.target).closest('.colorful');
		var newColor = colors[Math.floor(Math.random()*colors.length)];
		$target.removeClass(sColors);
		$target.addClass(newColor);
	});

});
