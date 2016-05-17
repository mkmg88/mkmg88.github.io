//获取计算后的样式
function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

//运动代码
function starMove(obj,attr,iTarget){
	clearInterval(obj.timer);
    obj.timer = setInterval(function(){
       var objw = 0;
       attr == 'opacity' ?  objw = parseInt(parseFloat(getStyle(obj, attr))*100): objw = parseInt(getStyle(obj,attr));
 
        var iSpeed = (iTarget - objw)/8;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
 		
        if(objw == iTarget){
            clearInterval(obj.timer);
        }else{
            if(attr == 'opacity'){     //是透明度
                obj.style.filter = 'alpha(opacity:' + (objw + iSpeed) +')';   //括号注意
                obj.style.opacity = (objw + iSpeed)/100;
            }else{                   //不是透明度
                obj.style[attr] = objw + iSpeed + 'px';
            }
        }
    },30)
}