$().extend('animate',animate);
$().extend('starMove',starMove);

//匀速运动
function animate(attr,iTarget){
    for(var i = 0; i < this.elements.length; i++){
        var _this = this.elements[i];
        clearInterval(_this.timer);
        var iSpeed = 0;

        _this.timer = setInterval(function(){
            var iCur =  (attr == 'opacity') ? parseInt(getStyle(_this,attr)*100) : parseInt(getStyle(_this,attr));
            
            if(iTarget > iCur){
                iSpeed = 10;
            }else if(iTarget < iCur){
                iSpeed = -10;
            }

            if(Math.abs(iCur + iSpeed - iTarget) <= 10){
                if(attr == 'opacity'){
                    _this.style.opacity = iTarget/100;
                    _this.style.filter = 'alpha(opacity=' + iTarget + ')';
                }else{
                    _this.style[attr] = iTarget + 'px';
                }
                clearInterval(_this.timer);
            }else{
                if(attr == 'opacity'){
                    _this.style.opacity = (iCur + iSpeed)/100;
                    _this.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                }else{
                    _this.style[attr] = iCur + iSpeed + 'px';
                }
            }
            
        },30);
    }
    return this;
}

//缓冲运动
function starMove(json,fn){
    for(var i = 0; i < this.elements.length; i++){
        var _this = this.elements[i];
        clearInterval(_this.timer);
        _this.timer = setInterval(function(){
            var oStop = true;
            for(attr in json){
                var iCur = (attr == 'opacity') ? parseInt(parseFloat(getStyle(_this,attr))*100) : parseInt(getStyle(_this,attr));
                var iSpeed = (json[attr] - iCur)/8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if(iCur !== json[attr]){
                    oStop = false;
                }
                if(attr == 'opacity'){
                    _this.style.opacity = (iCur + iSpeed)/100;
                    _this.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                }else{
                    _this.style[attr] = iCur + iSpeed + 'px';
                }
            }
            if(oStop){
                clearInterval(_this.timer);
                if(fn) fn();
            }
        },30);
    }
    return this;
}