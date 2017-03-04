;(function(){
    window.ueApp = window.ueApp || {};
    ueApp.textScroll = function(opt){

        var defaults = {
            target : "",//滚动对象 一般为 ul
            items : "", //滚动的详细列表
            delay : 2000, //滚动间隔
            loop : 1//循环模式 1 无限循环 0 不循环
        };

        var opt = $.extend({},defaults,opt);


        if(!opt.target){
            return false;
        }

        var _target = $(opt.target);
        var _item = $(opt.items);
        var lnum = _item.length;

        if(lnum<=1){
            return;
        }

        var _fitem = _item.eq(0);
        var _litem = _item.eq(lnum-1);
        var ftc = _fitem.clone();
        var ltc = _litem.clone();

        _target.append(ftc).prepend(ltc);

        var curIndex = 0;
        var preHeight = _item.height();

        _target.css({"-webkit-transform":"translateY(-"+preHeight+"px)","-webkit-transition":"0s"});

        function preScroll(){
            curIndex++;
            nowPos = (curIndex+1)*preHeight;
            _target.css({"-webkit-transform":"translateY(-"+nowPos+"px)"});
            if(curIndex == lnum+1){
                _target.css({"-webkit-transform":"translateY(-"+preHeight+"px)","-webkit-transition":"0s"});
                curIndex = 0;

                setTimeout(function(){
                    preScroll();
                },1);
            }else{
                _target.css({"-webkit-transition":"1s"});
            }

        }

        setInterval(preScroll,opt.delay);
    }

})()
