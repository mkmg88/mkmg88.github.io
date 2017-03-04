var Mo = Mo || {};
(function(){
    Mo.slide = function (options){
        this.cur = 0;
        this.options = $.extend({delay : 5000}, options);
        this.init();
        Mo.slide.list.push(this);
    }

    Mo.slide.prototype = {
        init : function(){
            var _this = this,
                items = $(this.options.items),
                target = $(this.options.target),
                hasTap = this.options.hasTap === false ? false : true,
                nav_target = $(this.options.nav_target),
                margin = this.options.margin || 0,
                width = this.options.width,
                ratio = this.options.ratio || 0,
                height;

            if(this.options.resize === true){
                width = this.options.width = window.innerWidth || document.documentElement.clientWidth;
            }

            _this.prehtml = target.html();

            this.item_lenth =items.length;
            _this.cur = this.item_lenth;
            _this.real_cur = 0;

            var html = target.html();
            target.append(html + html);
            items = $(this.options.items);

            items.removeClass("cur").eq(_this.cur).addClass("cur");
            
            if (ratio > 0){
                height = Math.round(width / ratio);
                items.width(width).height(height).show();
                target.width(items.length * (width + margin)).height(height);
            } else {
                items.width(width).show();
                target.width(items.length * (width + margin));
            }

            target.css("margin-left", - this.item_lenth * (width + margin));
            this.max_margin_left = (items.length - 1) * (width + margin);

            nav_target.html("");

            for(var i = 0; i < this.item_lenth; i++){
                nav_target.append("<li></li>");
            }

            nav_target.find("li").eq(0).addClass("cur");

            _this.bind();

            _this.autoPlay();
        },

        bind : function(){
            var _this = this,
                items = $(this.options.items),
                target = $(this.options.target),
                hasTap = this.options.hasTap === false ? false : true,
                nav_target = $(this.options.nav_target),
                margin = this.options.margin || 0,
                width = this.options.width,
                ratio = this.options.ratio || 0;

            var is_touch_start = false;
            var start_x, end_x, start_y, end_y, margin_left;

            target.unbind("touchstart").bind("touchstart", function(e){
                var $this = $(this);
                if (is_touch_start) return false;

                is_touch_start = true;
                margin_left = parseInt(target.css("margin-left"));
                start_x = e.changedTouches[0].clientX;
                start_y = e.changedTouches[0].clientY;
                _this.stop();

            }).unbind("touchmove").bind("touchmove", function(e){
                var $this = $(this);
                if (!is_touch_start) return false;

                end_x = e.changedTouches[0].clientX;
                end_y = e.changedTouches[0].clientY;

                var _margin_left = end_x - start_x + margin_left;
                (_margin_left > 0) && (_margin_left = 0);
                (_margin_left < -_this.max_margin_left) && (_margin_left = -_this.max_margin_left);

                target.css({
                    "margin-left" : _margin_left
                });

                if (Math.abs(end_x - start_x) > 20 ){
                    e.preventDefault();
                }

            }).unbind("touchend").bind("touchend", function(e){
                is_touch_start = false;
                width = _this.options.width;
                var next = end_x - start_x > 0 ? _this.cur - 1 : _this.cur + 1;

                setTimeout(function(){
                    if (next >= 0 && next < items.length && Math.abs(end_x - start_x) > width / 3){
                        target.animate({
                            "margin-left" : - next * (width + margin)
                        }, 200, 'linear', function(){
                            items = $(_this.options.items);
                            if (next > _this.cur){
                                target.append(items[0]);
                                _this.real_cur++;
                                if (_this.real_cur == _this.item_lenth){
                                    _this.real_cur = 0;
                                }
                            } else {
                                target.prepend(items[items.length - 1]);
                                 _this.real_cur--;
                                if (_this.real_cur == -1){
                                    _this.real_cur = _this.item_lenth - 1;
                                }
                            }

                            items.removeClass("cur").eq(next).addClass("cur");
                            nav_target.find("li").removeClass("cur").eq(_this.real_cur).addClass("cur");
                            target.css("margin-left", - _this.item_lenth * (width + margin));
                            items = $(_this.options.items);

                            _this.autoPlay();

                        });
                    } else {
                        target.animate({
                            "margin-left" : - _this.cur * (width + margin)
                        }, 200, 'linear', function(){
                             _this.autoPlay();
                        });
                    }

                },0);

            });
        },

        stop : function(){
            if (!this.options.autoplay) return;
            clearInterval(this.autoplaytimer);
        },

        autoPlay : function(){
            if (!this.options.autoplay) return;
            var _this = this,
                items = $(this.options.items),
                target = $(this.options.target),
                hasTap = this.options.hasTap === false ? false : true,
                nav_target = $(this.options.nav_target),
                margin = this.options.margin || 0,
                width = this.options.width,
                delay = this.options.delay;

            _this.stop();

            _this.autoplaytimer = setInterval(function(){
                var next = _this.cur + 1;
                width = _this.options.width;
                target.animate({
                    "margin-left" : - next * (width + margin)
                }, 200, function(){
                    items = $(_this.options.items);
                    target.append(items[0]);
                    _this.real_cur++;
                    if (_this.real_cur == _this.item_lenth){
                        _this.real_cur = 0;
                    }

                    nav_target.find("li").removeClass("cur").eq(_this.real_cur).addClass("cur");
                    target.css("margin-left", - _this.item_lenth * (width + margin));
                });

            }, delay);
        },

        reset : function(width){
            var _this = this,
                items = $(this.options.items),
                target = $(this.options.target),
                margin = this.options.margin  || 0,
                nav_target = $(this.options.nav_target),
                ratio = this.options.ratio || 0,
                height;

            this.options.width = width;

            if (ratio > 0){
                height = Math.round(width / ratio);
                items.width(width).height(height).show();
                target.width(items.length * (width + margin)).height(height);
            } else {
                items.width(width).show();
                target.width(items.length * (width + margin));
            }

            this.max_margin_left = (items.length - 1) * (width + margin);

            target.css({
                "margin-left" : - _this.cur * (width + margin)
            }, 200);
        }
    }

    Mo.slide.list = [];

    var RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        resize_time;

    var v_width; 
    window.addEventListener(RESIZE_EV, function(){
        clearTimeout(resize_time);

        v_width = window.innerWidth || document.documentElement.clientWidth;
        resize_time = setTimeout(function(){
            for(var i = Mo.slide.list.length - 1; i >= 0; i--){
                if(typeof Mo.slide.list[i].options.resize === "function"){
                    Mo.slide.list[i].resize();
                } else if(Mo.slide.list[i].options.resize === true){
                    Mo.slide.list[i].reset(v_width);
                }
            }
        }, 500);
    });
})();