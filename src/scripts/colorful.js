'use strict';

// # Colorful Effect
// ________________

var $ = require('jquery');

$(function(){

	var sColors = "yellow amber orange sunset red fuchsia purple indigo blue aqua green lime";
	var colors = sColors.split(' ');



	var $icon = $('.icon g');
	var prevI = 7;
	$icon.attr('class', 'colorful ' + colors[prevI]);
	window.setInterval(function(){
		var i = (prevI + 1) % colors.length;
		$icon.attr('class', 'colorful ' + colors[i]);
		prevI = i;
	}, 2000);

	var $borders = $('.border');
	window.setInterval(function(){
		var i = (prevI) % colors.length;
		$borders.removeClass(sColors);
		$borders.addClass(colors[i]);
	}, 2000);



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
