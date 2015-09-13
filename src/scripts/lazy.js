'use strict';

// # LazyLoad Effect
// __________________

var $ = require('jquery');
window.jQuery = $;
require('jquery-lazy/jquery.lazy');

$(function(){

	$('img.lazy').Lazy({
		delay: 1500,
		afterLoad: function(el) {
      $(el).closest('.date-img').removeClass('blank');
    },
	});

});