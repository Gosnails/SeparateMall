'use strict';
var _mm = require('util/mm.js');
var html = '<div>{{data}}</div>';
var data = {
    data: 1
};
console.log(_mm.renderHtml(html, data));