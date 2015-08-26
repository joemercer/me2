'use strict';

// # ScrollTo Effect
// __________________

var $ = require('jquery');

$(function(){

	var startY = $('.map-container').offset().top;

	$('.dot.seattle').click(function(){
		var targetY = $('.seattle-header').offset().top;
		$('html, body').animate({
      scrollTop: targetY - 50
    }, 500*targetY/startY);
	});

	$('.dot.hk').click(function(){
		var targetY = $('.hk-header').offset().top;
		$('html, body').animate({
      scrollTop: targetY - 50
    }, 500*targetY/startY);
	});

	$('.dot.nyc').click(function(){
		var targetY = $('.nyc-header').offset().top;
		$('html, body').animate({
      scrollTop: targetY - 50
    }, 500*targetY/startY);
	});

	$('.dot.sf').click(function(){
		var targetY = $('.sf-header').offset().top;
		$('html, body').animate({
      scrollTop: targetY - 50
    }, 500*targetY/startY);
	});

	$('.dot.austin').click(function(){
		var targetY = $('.austin-header').offset().top;
		$('html, body').animate({
      scrollTop: targetY - 50
    }, 500*targetY/startY);
	});

	$('.dot.waterloo').click(function(){
		var targetY = $('.waterloo-header').offset().top;
		$('html, body').animate({
      scrollTop: targetY - 50
    }, 500*targetY/startY);
	});

});