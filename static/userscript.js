// ==UserScript==
// @name         去除PingFang SC字体
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  替换去除PingFang SC字体
// @author       mkmg
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var fontFamily = getComputedStyle(document.body).fontFamily;

if(fontFamily.match(/PingFang SC/i)){
	var styleEle = document.createElement('style');
	fontFamily = fontFamily.replace(/PingFang SC/i,'');

	var setElements = 'body,div, h1, h2, h3, h4, h5, h6, hr, p ,span,i blockquote, dl, dt, dd, ul, ol, li, pre, form, button, input, textarea, th, td';
	var styles = [ setElements, '{ font-family:', fontFamily, ' !important;}' ];
	styleEle.innerHTML = styles.join('');
	document.head.appendChild(styleEle);
}
})();