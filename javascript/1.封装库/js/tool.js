//浏览器检测
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();	
	var s;		
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
	
	if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();

//DOM加载
function addDomloaded(fn){
	var isReady = false;
	var timer = null;
	function doReady(){
		if(timer) clearInterval(timer);
		if(isReady) return;
		isReady = true;
		fn();
	}
	
	if(document.addEventListener){    //W3C
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else if(sys.ie && sys.ie < 9){   //IE678
		timer = setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				doReady();
			} catch(e){};
		},1);
	}
}

//事件绑定/移除函数
function addEvent( obj, type, fn ) {
   if ( obj.attachEvent ) {
      obj['e'+type+fn] = fn;
      obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
      obj.attachEvent( 'on'+type, obj[type+fn] );
   } else
      obj.addEventListener( type, fn, false );
}
function removeEvent( obj, type, fn ) {
   if ( obj.detachEvent ) {
      obj.detachEvent( 'on'+type, obj[type+fn] );
      obj[type+fn] = null;
   } else
      obj.removeEventListener( type, fn, false );
}

//获取计算后的样式
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}

//获取浏览器窗口大小
function getInner(){
	if(document.innerWidth){
		return{
			width : document.innerWidth,
			height : document.innerHeight
		}
	}else{
		return{
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}	
	}
}

//跨浏览器获取滚动条位置
function getScroll() {
	return {
		top : document.body.scrollTop || document.documentElement.scrollTop,
		left : document.body.scrollLeft || document.documentElement.scrollLeft
	}
}

//阻止默认事件
function preDef(evt){
	var e = evt || window.event;
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}

//获取事件目标
function getTarget(e){
	if(e.target){
		return e.target;
	}else{
		return e.srcElement;
	}
}

//阻止冒泡
function setStop(e){
	e.stopPropagation ? e.stopPropagation : e.cancelBubble = true ; 
}

//IE常用的event对象方法跟W3C配对
addEvent.fixEvent = function(event){
	event.preventDefault = function(){
		return event.returnValue = false;
	};
	event.stopPropagation = function(){
		return e.cancelBubble = true;
	};
	event.target = event.srcElement;
	return event;
}

//class是否存在
function hasClass(str,iClass){
	var re = new RegExp('\\b' + iClass + '\\b');
	return re.test(str);
}
//删除左右空格
function trim(str){
	return str.replace(/(^\s+)|(\s+$)/g,'');
}