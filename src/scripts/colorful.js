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
	$icon.attr('class', 'colorful ' + colors[prevI]);
	$borders.removeClass(sColors);
	$borders.addClass(colors[prevI]);
	window.setInterval(function(){
		var i = (prevI + 1) % colors.length;
		$icon.attr('class', 'colorful ' + colors[i]);
		$borders.removeClass(sColors);
		$borders.addClass(colors[i]);
		prevI = i;
	}, 2000);



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
