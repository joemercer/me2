'use strict';

// # Colorful Effect
// ________________

var $ = require('jquery');

$(function(){

	var sColors = "yellow amber orange sunset red fuchsia purple indigo blue aqua green lime";
	var colors = sColors.split(' ');

	var $colorful = $('.colorful');

	$colorful.each(function(i,target){
		var newColor = colors[Math.floor(Math.random()*colors.length)];
		$(target).addClass(newColor);
	});

	$colorful.mouseleave(function(e){
		var $target = $(e.target).closest('.colorful');
		var newColor = colors[Math.floor(Math.random()*colors.length)];
		$target.removeClass(sColors);
		$target.addClass(newColor);
	});

});
