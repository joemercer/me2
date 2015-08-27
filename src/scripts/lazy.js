'use strict';

// # LazyLoad Effect
// __________________

var $ = require('jquery');
var jQuery = $;
require('jquery-lazy');

$(function(){

	$("img.lazy").Lazy();

});