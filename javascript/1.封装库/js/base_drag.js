$().extend('drag',base_drag);

function base_drag(areaClass){
    for(var i = 0; i < this.elements.length; i++){   
        addEvent(this.elements[i],'mousedown',function(e){
        	if(trim(this.innerHTML).length == 0){
        		preDef(e);
        	}
            var _this = this;
            var iCliX = e.clientX - _this.offsetLeft;
            var iCliY = e.clientY - _this.offsetTop;
            
            //只让某个区域的元素拖动
            if(areaClass){
	            if(hasClass(getTarget(e).className,areaClass)){
	            	addEvent(document,'mousemove',move);
	           		addEvent(document,'mouseup',up);
	            }else{
	            	removeEvent(document,'mousemove',move);
	            	removeEvent(document,'mouseup',up);
	            }
            }else{
	            	addEvent(document,'mousemove',move);
	           		addEvent(document,'mouseup',up);
	        }
            
            function move(e){
                var l = e.clientX - iCliX;
                var t = e.clientY - iCliY;
                if(l < 0){
                    l = 0;
                }else if(l > getInner().width - _this.offsetWidth){
                    l = getInner().width - _this.offsetWidth;
                }
                if(t < 0){
                    t = 0;
                }else if(t > getInner().height - _this.offsetHeight){
                    t = getInner().height - _this.offsetHeight;
                }
                _this.style.left = l + 'px';
                _this.style.top = t + 'px';
                if(_this.setCapture){
                    _this.setCapture();
                }
            }
            function up(){
            	removeEvent(this,'mousemove',move);
                removeEvent(this,'mouseup',up);
                if(this.releaseCapture){
                    this.releaseCapture();
                }
            }
        });
    };
    return this;
}