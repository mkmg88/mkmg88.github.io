/*
焦点图插件
*/
;(function($){
	$.fn.extend({
		'banner' : function(){
			option = {
				interval : 8000
			};

			var oBan = this;
			var aLi = oBan.find('li');
			aLi.first().css({display:'block',opacity:1});
			oBan.append($('<div class="ban-dot"></div><div class="btn next"></div><div class="btn prev"></div>'));
			//小点
			$.each(aLi,function(){
				oBan.find('.ban-dot').append($('<span></span>'));
			});
			oBan.find('.ban-dot span').first().addClass('hover');
			//左右按钮
			oBan.hover(function(){
				oBan.find('.btn').fadeTo('fast',0.5,function(){
					$(this).hover(function(){
						$(this).fadeTo('fast',1);
					},function(){
						$(this).fadeTo('fast',0.5);
					});
				});
				clearInterval(timer);
			},function(){
				oBan.find('.btn').fadeOut();
				timer = setInterval(iNowAdd,option.interval);
			});

			//动画
			var iNow = 0;
			var aSpan = oBan.find('.ban-dot span');
			oBan.find('.ban-dot span').click(function(){
				tab($(this).index());
				iNow = $(this).index();
			});

			function tab(iTarget){
				aSpan.removeClass('hover');
				aSpan.eq(iTarget).addClass('hover');
				oBan.find('li:visible').animate({opacity:0},function(){
					$(this).hide();
				});
				aLi.eq(iTarget).stop(true,false).show().animate({opacity:1});
			}

			function iNowAdd(){
				iNow++;
				if(iNow >= aLi.size()){
					iNow = 0;
				}
				tab(iNow);
			}

			function iNowLess(){
				iNow--;
				if(iNow <= -1){
					iNow = aLi.size()-1;
				}
				tab(iNow);
			}

			oBan.find('.next').click(iNowAdd);
			timer = setInterval(iNowAdd,option.interval);
			oBan.find('.prev').click(iNowLess);

			return this;
		}
	});
})(jQuery);