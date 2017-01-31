$.fn.scrollTo =function(options){
    var defaults = {
        toT : 0,    
        durTime : 500,  
        delay : 13,    
        callback:null   
    };
    var opts = $.extend(defaults,options),
        timer = null,
        _this = this,
        curTop = _this.scrollTop(),
        subTop = opts.toT - curTop,    
        index = 0,
        
        dur = Math.round(opts.durTime / opts.delay),
        smoothScroll = function(){
            index++;
            var per = Math.round(subTop/dur);
            if(index >= dur){
                _this.scrollTop(opts.toT);
                if(opts.callback && typeof opts.callback == 'function'){
                    opts.callback();
                }
                return;
            }else{
                _this.scrollTop(curTop + index*per);

                if(window.requestAnimationFrame){
                    timerId = requestAnimationFrame(smoothScroll);
                }else{
                    setTimeout(smoothScroll,opts.delay);
                }
            }
        };

    if(window.requestAnimationFrame){
        timer = requestAnimationFrame(smoothScroll);
    }else{
        timer = setTimeout(smoothScroll,opts.delay);
    }

    return _this;
};