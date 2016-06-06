

function $(args){
	return new Base(args);
}

function Base(args){
	this.elements = [];
	if(typeof args == 'string'){
		if(args.indexOf(' ') != -1){
			//CSS模拟
			var elements = args.split(' ');
			var parentNode = [];
			var childElement = [];
			for(var i = 0; i < elements.length; i++){
				if(parentNode.length == 0){
					parentNode.push(document);
				};
				switch(elements[i].charAt(0)){
					case '#' : 
						childElement = [];
						childElement.push(this.getId(elements[i].substring(1)));
						parentNode = childElement;
					break;
					case '.' :
						childElement = [];
						for(var j = 0; j < parentNode.length; j++){
							var temps = this.getClass(elements[i].substring(1),parentNode[j]);
							for(var k = 0; k < temps.length; k++){
								childElement.push(temps[k]);
							}
						}
						parentNode = childElement;
					break;
					default :
						childElement = [];
						for(var j = 0; j < parentNode.length; j++){
							var temps = this.getTagName(elements[i],parentNode[j]);
							for(var k = 0; k < temps.length; k++){
								childElement.push(temps[k]);
							}
						}
						parentNode = childElement;
				}
			}
			this.elements = parentNode;
		}else{
			//find模拟
			switch(args.charAt(0)){
				//id
				case '#' : 
					this.elements.push(this.getId(args.substring(1)));
				break;
				//class
				case '.' : 
					this.elements = this.getClass(args.substring(1));
				break;
				//没有前缀
				default : 
					this.elements = this.getTagName(args);
			}
		}
	}else if(typeof args == 'object'){
		this.elements[0] = args;
	}else if(typeof args == 'function'){
		this.ready(args);
	};		
}

//addDomLoaded
Base.prototype.ready = function(fn){
	addDomloaded(fn);
}


//设置Css选择器子节点
Base.prototype.find = function(str){
	var argsElements = [];
	for(var i = 0; i < this.elements.length; i++){
		switch(str.charAt(0)){
			//id
			case '#' : 
				argsElements.push(this.getId(str.substring(1)));
			break;
			//class
			case '.' :
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for(var j = 0; j < temps.length; j++){
					argsElements.push(temps[j]);
				}
			break;
			//没有前缀
			default : 
				var temps = this.getTagName(str,this.elements[i]);
				for(var j = 0; j < temps.length; j++){
					argsElements.push(temps[j]);
				}
		}
	}
	this.elements = argsElements;
	return this;
}




/*---获取元素---*/
//元素筛选器,返回这个节点对象
Base.prototype.ge = function(num){
	return  this.elements[num]; 
};
//获取第一个节点
Base.prototype.first = function(){
	return  this.elements[0]; 
};
//获取最后一个对象
Base.prototype.last = function(){
	return  this.elements[this.elements.length - 1]; 
};

//获取当前节点的下一个节点
Base.prototype.next = function(){
	for(var i = 0; i < arr1.length; i++){
		this.elements[i] = this.elements[i].nextSibling;
		if(this.elements[i].nodeType == 3 )	this.next();
	};
	return this;
};

//获取当前节点的上一个节点
Base.prototype.prev = function(){
	for(var i = 0; i < arr1.length; i++){
		this.elements[i] = this.elements[i].previousSibling;
		if(this.elements[i].nodeType == 3 )	this.next();
	};
	return this;
};

//元素筛选器,返回Base对象
Base.prototype.eq = function(num){
	var ele = this.elements[num]; //中转
	this.elements = [];   //清空
	this.elements.push(ele);  //添加
	return this;
};

//id
Base.prototype.getId = function(id){
	return document.getElementById(id);
};

//tagName
Base.prototype.getTagName = function(tagName,parentNode){
	var arr1 = [];
	var arr2 = [];
	var node = null;
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}
	arr1 = node.getElementsByTagName(tagName);
	for(var i = 0; i < arr1.length; i++){
		arr2.push(arr1[i]);
	};
	return arr2;
}
//name
Base.prototype.getName = function(Name){
	var names = document.getElementsByName(Name);
	for(var i = 0; i < names.length; i++){
		this.elements.push(names[i]);
	}
	return this;
}
//class
Base.prototype.getClass = function(iClass,parentNode){
	var arr1 = [];
	var arr2 = [];
	var node = null;
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	};
	arr1 = node.getElementsByTagName('*')
	for(var i = 0; i < arr1.length; i++){
		if(hasClass(arr1[i].className,iClass)){
			arr2.push(arr1[i]);
		};
	};
	return arr2;
}
//获取元素数量
Base.prototype.size = function(){
	return this.elements.length;
}
//获取当前元素的在统计元素中的索引值
Base.prototype.index = function(){
	var brode = this.elements[0].parentNode.children;
	for(var i = 0; i < brode.length; i++){
		if(brode[i] == this.elements[0]){
			return i;
		}
	}
}


//设置元素样式
Base.prototype.css = function(attr,value){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 1){
 			if(window.getComputedStyle){
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else{
				return this.elements[i].currentStyle[attr];
			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}
//设置元素innerHTML
Base.prototype.html = function(iHtml){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 0){
			return this.elements[i].innerHTML;
		};
		this.elements[i].innerHTML = iHtml;
	};
	return this;
}
//添加Class
Base.prototype.addClass = function(iClass){
	for(var i = 0; i < this.elements.length; i++){
		var re = new RegExp('\\b' + iClass + '\\b');
		if(!re.test(this.elements[i].className)){
			this.elements[i].className += ' ' + iClass;
		};
	};
	return this;
};
//移除Class
Base.prototype.removeClass = function(iClass){
	for(var i = 0; i < this.elements.length; i++){
		var re = new RegExp('\\b' + iClass + '\\b');
		if(re.test(this.elements[i].className)){
			this.elements[i].className = this.elements[i].className.replace(re,' ');
		};
	}
	return this;
}

//移入移出事件
Base.prototype.hover = function(over,out){
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
}
//点击切换事件
Base.prototype.toggle = function(){
	for(var i = 0; i < this.elements.length; i++){
		(function(element,args){
			var count = 0;
			addEvent(element,'click',function(){
				args[count++ % args.length].call(this);
			});
		})(this.elements[i],arguments);
	}
	return this;
}

//显示隐藏
Base.prototype.show = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = 'block';
	}
	return this;
}
Base.prototype.hide = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = 'none';
	}
	return this;
}

//点击事件
Base.prototype.click = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i],'click',fn);
	}
	return this;
}
//窗口大小改变事件改
Base.prototype.resize = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		var element = this.elements[i];
		addEvent(window,'resize',function(){
			fn();
			//窗口大小改变时会判断实例对象的距离,超过就拉回到可视区
			if(element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth + 'px';

			};
			if(element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight + 'px'
			};
		});
	}
	return this;
}

//水平垂直居中函数
Base.prototype.center = function(width,height){
	var l = (getInner().width - width)/2;
	var t = (getInner().height - height)/2;
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.left = l + 'px';
		this.elements[i].style.top = t + 'px';
	}
	return this;
}
//锁屏遮罩
Base.prototype.lock = function(){
	for(var i = 0; i < this.elements.length; i++){
		if(window.innerWidth){     //ff获取浏览器窗口大小有小bug
			this.elements[i].style.width = window.innerWidth + 'px';
			this.elements[i].style.height = window.innerHeight + 'px';
		}else{                            
			this.elements[i].style.width = getInner().width  + 'px';
			this.elements[i].style.height = getInner().height + 'px';
		}
	}
	return this;
};

//插件接口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
	return this;
}










