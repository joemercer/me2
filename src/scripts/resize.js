'use strict';

// # Resize Icon Effect
// ________________

var $ = require('jquery');

$(function(){

	var $window = $(window);
	var $icon = $('.icon-container');

	var resize = function() {
		var top = $window.scrollTop();

		if (top <= 100) {
			$icon.css('margin-top', 100 - top)
		}
		else {
			$icon.css('margin-top', 0)
		}

		if (top <= 100) {
			$icon.height(250);
		}
		if (top > 100 && top < 275) {
			$icon.height(250 - top + 100);
		}
		if (top >= 275) {
			$icon.height(75);
		}
	};

	resize();

	$window.scroll(function(e){
		resize();
	});

});