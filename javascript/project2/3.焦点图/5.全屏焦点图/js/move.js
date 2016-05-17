//获取计算后的样式
function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj, false)[attr];
    }
}
 
//运动代码
function starMove(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //1.初始化停止值
        var oStop = true;     
 
        //开始循环json
        for(attr in json){
            //获取值
            var objw = 0;
            attr == 'opacity' ?  objw = parseInt(parseFloat(getStyle(obj, attr))*100): objw = parseInt(getStyle(obj,attr));
             
            //计算速度
            var iSpeed = (json[attr] - objw)/8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
             
            //2.还有没运行完的就是false
            if(objw !== json[attr]){
                oStop = false;    
            }  
 
            //运动进行中
            if(attr == 'opacity'){     //是透明度
                obj.style.filter = 'alpha(opacity:' + (objw + iSpeed) +')';   //括号注意
                obj.style.opacity = (objw + iSpeed)/100;
            }else{                   //不是透明度
                obj.style[attr] = objw + iSpeed + 'px';
            }
             
        }
 
        //3.都运行完了结束定时器
        if(oStop == true){    
            clearInterval(obj.timer);
            if(fn) fn.call(obj);
        }
 
    },30)
}
function getClass(iClass,parent){
    var node = null;
    if(arguments.length == 1){
        node = document;
    }else{
        node = parent;
    }
    var arr1 = node.getElementsByTagName('*');
    var arr2 = [];
    var re = new RegExp('\\b' + iClass + '\\b');
    for(var i = 0; i < arr1.length; i++){
        if(re.test(arr1[i].className)){
            arr2.push(arr1[i]);
        }
    }
    return arr2;
}

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