;(function(){

        /*_0.0_*/
        var _ = {};
        _.delay = function(func, wait) {
            var args = Array.prototype.slice.call(arguments, 2);
            return setTimeout(function(){
                return func.apply(null, args);
            }, wait);
        };
        _.fadeIn = function($dom,time,callback){
            _.delay(function(){
                $dom.addClass('m-show');
                callback && callback();
                
            },time||0);
        };
        _.input = function(text,target,interval,callback){
            var i = 0;
            text = text.split('');
            target.html('').addClass('input');

            _dom.keyBod.show();
            $dialog.addClass('keybod');

            setTimeout(function fn(){
                target.html(target.html() + text[i]);
                i++;
                if(!text[i]){
                    callback && callback();
                    return;
                };
                setTimeout(fn,interval);
            },interval);
        };
        _.inputClear = function(target){
            target.html('请输入内容').removeClass('input');
            _dom.keyBod.hide();
            $dialog.removeClass('keybod');
        }
        _.dialog = function(html){
            if($("#j-dialog").length>0){
                $("#j-dialog").remove();
            }
            var $result = $('<div class="g-dialog" id="j-dialog"></div>');
            $result.append(html).appendTo($('body'));
            var $con = $result.children('.m-diacon');
            var tipLeft = $con.width()/2;
            var tipTop = $con.height()/2;
            $con.css({
                "marginLeft": -tipLeft,
                "marginTop": -tipTop
            });
            $(document).on('touchmove.zz',function(e){
                e.preventDefault();
            });
        };
        _.closeDialog = function(){
            $('#j-dialog').remove();
            $(document).off('touchmove.zz')
            return false;
        };

        /*p*/
        var myParabola = new Parabola();

        /*dom*/
        var $dialog = $('#j-diacon');
        var _dom = {
            dw: $('#j-dw'),
            dwimg: $('#j-dw div'),
            pos: $('#j-pos'),
            input: $('#j-input'),
            submit: $('#j-submit'),
            keyBod: $('#j-keybod')
        };

        /*dw*/
        var dw = {
            wh: $(window).height()
        }
        dw.dwPlay = function(pos,end,duration,curvature){

            var _index = 0;
           	var _pos = pos;

            myParabola.initialize({
                el: _dom.dw[0],
                targetEl: _dom.pos,
                curvature: curvature || 0.02,
                duration: duration || 400,
                callback: function(){
                    
	            	_index++;
	            	if(!_pos || !_pos[_index]){
	            		_index = 0;
	            		dw.dwDown();
	            		end && end();
	            		myParabola.reset.call(myParabola);
	            	    return;
	            	}
	            	_dom.pos.css({
	            	   left: _pos[_index][0],
	            	   top: _pos[_index][1]
	            	});
	            	
	            	dw.dwDown(function(){
	            	    myParabola.initialize().start();
	            	});
	            }
            }).start();
        };
        dw.dwDown = function(callback){
           _dom.dw.addClass('down');
           setTimeout(function(){
                callback && callback();
              _dom.dw.removeClass('down');
           },300);
        };
        dw.dwAround = function(arr){
            if(arr == 'r'){
                _dom.dw.removeClass('left');
            }else{
                _dom.dw.addClass('left');
            }
        };
        dw.tips = function(text,time){
        	if(text){
        	    _dom.dw.addClass('showtip').find('.pop').html(text);
                if(time !== 'zero'){
                    _.delay(function(){
                        dw.tips();
                    },time || 1200);
                }
        	}else{
        	    _dom.dw.removeClass('showtip');
        	}
        };
        dw.change = function(flag){
            if(flag){
                _dom.dw.addClass('change');
                setTimeout(function(){
                    _dom.dw.hide();
                },1000);
            }else{
                _dom.dw.show().removeClass('change');
            }
        };
        dw.exciting = function(flag){
            if(flag){
                _dom.dw.addClass('exciting');
            }else{
                _dom.dw.removeClass('exciting');
            }
        };
        dw.clicktip = function(flag){
            if(flag){
                _dom.submit.addClass('help');
            }else{
                _dom.submit.removeClass('help');
            }
        };

        function DwPlay(){
            var obj = this;

            /*1*/
            this.play_1 = function(){
                var anim1 = $dialog.find('.j-anim1'),
                	pop = $dialog.find('.j-anim1-pop');

                _.fadeIn(anim1,500,function(){
                    _.fadeIn(pop,700,function(){
                        _.delay(obj.dwPlay_1,1000);
                    });
                });
            }

            /* play1 */
            this.dwPlay_1 = function(){
                $('#j-dwtoui').remove();
                _dom.dw.addClass('show');
                dw.w = _dom.dw.width();
                dw.h =  _dom.dw.height();

                var $pop_1 = $('#j-pop1').offset();
                var _width = $pop_1.width;
                var _left = $pop_1.left;
                var _top = $pop_1.top - dw.h;

                var pos = [
                    [_left,_top],
                    [_left + _width/2 - dw.w,_top],
                    [_left + _width - dw.w*1.5,_top]
                ];

                _dom.pos.css({
                   left: pos[0][0],
                   top: pos[0][1]
                });

                dw.dwPlay(pos,function(){
            	    _.delay(function(){
            			dw.dwAround();
            			_.delay(function(){
            				dw.tips('带你回顾游戏盒2016');	
                            obj.play_dwzzz();
            			    //obj.play_2();
            			},800);
            		},300);
                },400);
            };

            /*2*/
            this.play_2 = function(){
            	var anim2 = $dialog.find('.j-anim2');
            	_.fadeIn(anim2,1500,function(){
            		_.delay(obj.dwPlay_2,500);
            	});
            };
            this.dwPlay_2 = function(){
            	var $pop_2 = $('#j-pop2').offset();
                _dom.pos.css({
                   left: $pop_2.left + $pop_2.width - dw.w*2,
                   top: $pop_2.top - dw.h 
                });
                dw.dwPlay([],function(){
            	    _.delay(function(){
            			dw.tips('11月 主题皮肤系统上线！',1500);
            			obj.play_3();
            		},800);
                });
            };

            /*3*/
            this.play_3 = function(){
            	var anim3 = $dialog.find('.j-anim3');
            	_.fadeIn(anim3,1500,function(){
            		_.delay(obj.dwPlay_3,500);
            	});
            };

            this.dwPlay_3 = function(){
                var _p = $('#j-pop3');
            	var $pop = _p.offset();
                _dom.pos.css({
                   left: $pop.left + $pop.width - dw.w,
                   top: $pop.top - dw.h + $('#j-diacon').height() - dw.wh
                });
                dw.dwPlay([],function(){
            	    _.delay(function(){
            			dw.tips('换新皮肤喽~');
                        dw.exciting(1);
                        _.delay(function(){
                            _p.addClass('help');
                        },300);
                        obj.imgClick();
            		},400);
                });
            };

            this.imgClick = function(){
                $('#j-pop3').one('click',function(){
                    $(this).removeClass('help');
                    _.dialog('<div class="m-diacon m-img"></div>');
                    $('#j-dialog').one('click',function(){
                        _.closeDialog();
                        
                        obj.play_4();
                    });
                });
            }

            /*4*/
            this.play_4 = function(){
                var anim4 = $dialog.find('.j-anim4');

                _.fadeIn(anim4,300,function(){
                    dw.exciting();
                    _.delay(function(){
                        dw.dwAround('r');  
                        _.delay(obj.dwPlay_4,500);
                    },300);
                });
            };

            this.dwPlay_4 = function(){
                var $pop = $('#j-pop4').offset();

                _dom.pos.css({
                   left: $pop.left + $pop.width - dw.w,
                   top: $pop.top - dw.h + $('#j-diacon').height() - dw.wh
                });

                dw.dwPlay([],function(){
                    _.delay(function(){
                        dw.dwAround();
                        _.delay(function(){
                            dw.tips('8月 游戏盒直播开启！',1500);
                            obj.play_5();
                        },500);
                    },400);
                });
            };

            /*5*/
            this.play_5 = function(){
                var anim5 = $dialog.find('#j-anim5');
                _.fadeIn(anim5,1800,function(){
                    dw.tips();
                    _.delay(obj.dwPlay_5,500);
                });
            };

            this.dwPlay_5 = function(){
                var $pop = $('#j-pop5').offset();

                _dom.pos.css({
                   left: $pop.left + $pop.width - dw.w*2,
                   top: $pop.top - dw.h + $('#j-diacon').height() - dw.wh
                });

                dw.dwPlay([],function(){
                    _.delay(function(){
                        dw.tips('直播好好看~');
                        dw.exciting(1);
                        obj.play_6();
                    },400);
                });
            };

            /*6*/
            this.play_6 = function(){
                var anim6 = $dialog.find('#j-anim6');
                _.fadeIn(anim6,2000,function(){
                    dw.exciting();
                    _.delay(obj.dwPlay_6,500);
                });
            };

            this.dwPlay_6 = function(){
                var $pop = $('#j-pop6').offset();

                _dom.pos.css({
                   left: $pop.left + dw.w*2,
                   top: $pop.top - dw.h + $('#j-diacon').height() - dw.wh
                });

                dw.dwPlay([],function(){
                    _.delay(function(){
                        dw.tips('5月 盒币可充值！',1500);
                        obj.play_dwzzz();
                    },400);
                });
            };

            /*dwzz*/
            this.play_dwzzz = function(){
                var anim = $dialog.find('#j-dwzzz');
                _.fadeIn(anim,1500,function(){
                    dw.tips();  
                    _.delay(function(){
                        obj.dwPlay_dwzzz();
                    },500);
                });
            };

            this.dwPlay_dwzzz = function(){
                var $pop = $('#j-dwzzz').offset();
                var anim = $dialog.find('#j-dwzzz');
                _dom.pos.css({
                   left: $pop.left,
                   top: $pop.top + dw.h/2  + $('#j-diacon').height() - dw.wh
                });
                dw.dwPlay([],function(){
                    _.delay(function(){
                        dw.dwAround('r');
                        _.delay(function(){
                            dw.change(1);
                            _.delay(function(){
                                anim.addClass('show');
                                _.delay(function(){
                                    anim.addClass('boom');
                                    _.delay(function(){
                                        obj.play_7();
                                    },3600);
                                },500);
                            },1000);
                        },200);
                    },400);
                });
            };

            /*7*/
            this.play_7 = function(){
                var anim = $dialog.find('#j-anim7');
                _.fadeIn(anim,800,function(){
                    dw.tips();  
                    _.delay(obj.dwPlay_7,500,600);
                });
            };

            this.dwPlay_7 = function(){
                var $pop = $('#j-pop7').offset();

                dw.change();
                _dom.pos.css({
                   left: $pop.left + $pop.width - dw.w,
                   top: $pop.top - dw.h + $('#j-diacon').height() - dw.wh
                });

                dw.dwPlay([],function(){
                    _.delay(function(){
                        dw.tips('4月 商城大改版！');
                        dw.dwAround();
                        obj.play_prize();
                    },400);
                },600);
            };

            /*prize*/
            this.play_prize = function(){
                var anim = $dialog.find('#j-prize');
                _.fadeIn(anim,800,function(){
                    _.delay(function(){
                        dw.exciting(1);
                        obj.dwPlay_prize();
                    },800);
                });
            };

            this.dwPlay_prize = function(){
                $dialog.find('#j-prize').addClass('loadin');
                _.delay(obj.play_dialog1,2000);
            };

            this.play_dialog1 = function(){
                _.input('哇，好棒啊，我也要去换皮肤换商品~',_dom.input,200,function(){
                    dw.clicktip(1);
                    _dom.submit.one('click',function(){
                        dw.clicktip();
                        _.inputClear(_dom.input);
                        obj.myplay_1();
                    });
                });
                
            };

            this.myplay_1 = function(){
                var anim = $('#j-myanim1');
                _.fadeIn(anim,100,function(){
                    obj.play_8();
                });
            }

            /*8*/
            this.play_8 = function(){
                var anim = $dialog.find('#j-anim8');
                dw.exciting();
                _.fadeIn(anim,1400,function(){
                    _.delay(obj.dwPlay_8,500,600);
                });
            }

            this.dwPlay_8 = function(){
                var $pop = $('#j-pop8').offset();

                _dom.pos.css({
                   left: $pop.left + dw.w,
                   top: $pop.top - dw.h + $('#j-diacon').height() - dw.wh
                });

                dw.dwPlay([],function(){
                    _.delay(function(){
                        dw.tips('1月 徽章系统身份！',1500);
                        obj.play_wenzn();
                    },400);
                },600);
            }


            this.play_wenzn = function(){
                var anim = $dialog.find('#j-wenzn');
                _.fadeIn(anim,800,function(){
                    _.delay(function(){
                        dw.exciting(1);
                        _.input('想要想要!',_dom.input,200,function(){
                            dw.clicktip(1);
                            _dom.submit.one('click',function(){
                                dw.clicktip();
                                _.inputClear(_dom.input);
                                obj.myplay_2();
                            });
                        });
                    },500);
                });
            };


            this.myplay_2 = function(){
                var anim = $('#j-myanim2');
                _.fadeIn(anim,100,function(){
                    obj.play_9();
                });
            }

            this.play_9 = function(){
                var anim = $('#j-anim9');
                _.fadeIn(anim,800,function(){
                    dw.exciting();
                    _.delay(obj.play_hongbao,1000,600);
                });
            }

            this.play_hongbao = function(){
                var anim = $('#j-hongbao');
                _.fadeIn(anim,100,function(){
                    dw.tips();
                    _.delay(obj.dwPlay_hongbao,500);
                });
            }

            this.dwPlay_hongbao = function(){
                var $hongbao = $('#j-hongbaopop');
                var $pop1 = $('#j-mypop2').offset();
                var $pop2 = $('#j-pop9').offset();
                var $pop3 = $hongbao.offset();
                var diaHeight = $('#j-diacon').height();


                var pos = [
                    [$pop1.left + $pop1.width - dw.w,$pop1.top - dw.h + diaHeight - dw.wh],
                    [$pop2.left + dw.w,$pop2.top - dw.h + diaHeight - dw.wh],
                    [$pop3.left + $pop3.width - dw.w*1.5,$pop3.top - dw.h + diaHeight - dw.wh]
                ];

                _dom.pos.css({
                   left: pos[0][0],
                   top: pos[0][1]
                });

                dw.dwPlay(pos,function(){
                    _.delay(function(){
                        dw.exciting(1);
                        dw.tips('快来抢盒币呦~','zero');
                        $hongbao.addClass('help');
                        obj.grabHongbao();
                    },900);
                },600,0.01);
            }

            this.grabHongbao = function(){
                var $hongbao = $('#j-hongbaopop');
                $hongbao.one('click',function(){
                        $hongbao.removeClass('help');
                    if(!_config.isTake){
                        _.dialog( baidu.template('j-prizeTemp' , {type: 3} ) ); 
                        /*close*/
                        

                        $('#j-close').one('click',function(){
                            _.closeDialog();
                        }); 
                    }else{
                        $.getJSON(_url.welfare,{},function(data){
                            _config.hebi = data.result[0].hebi;
                            _config.medal = data.result[0].medal;
                            obj.showHongBaoRes();
                        });
                    };
                });
            };

            this.showHongBaoRes = function(){
                _.dialog( baidu.template('j-hongbaoTemp' , {
                    num : _config.hebi,
                    sface: _config.userInfo && _config.userInfo.sface,
                    nick: _config.userInfo && _config.userInfo.nick
                }));

                dw.tips();
                $('#j-close').one('click',function(){
                    _.closeDialog();
                    dw.exciting();

                    if(_config.hebi){
                        _.fadeIn($('#j-hongbaoTip'),100);
                        _.input('我抢到' + _config.hebi + '盒币了，谢谢游戏盒',_dom.input,200,function(){
                            dw.clicktip(1);
                            _dom.submit.one('click',function(){
                                dw.clicktip();
                                _.inputClear(_dom.input);
                                obj.myplay_3();
                            });
                        });
                    }else{
                        obj.myplay_3();
                    }
                });
            };

            this.myplay_3 = function(){
                var anim = $('#j-myanim3');
                _.fadeIn(anim,100,function(){
                    _.delay(obj.play_10,500);
                });
            };

            this.play_10 = function(){
                var anim = $('#j-anim10');
                _.fadeIn(anim,800,function(){
                    obj.play_video();
                });
            };

            this.play_video = function(){
                var anim = $('#j-video');
                _.fadeIn(anim,800,function(){
                    _.delay(function(){
                        obj.dwPlay_10();
                    },500);
                });
            };


            this.dwPlay_10 = function(){
                var $pop = $('#j-pop10').offset();

                _dom.pos.css({
                   left: $pop.left + dw.w,
                   top: $pop.top - dw.h + $('#j-diacon').height() - dw.wh
                });

                dw.dwPlay([],function(){
                    _.delay(function(){
                        dw.dwAround('r');
                        _.delay(function(){
                            obj.dwPlay_11();
                        },400)
                    },400);
                },600);
            };
            

            this.dwPlay_11 = function(){
                var $pop = $('#j-popvideo').offset();

                _dom.pos.css({
                   left: $pop.left + $pop.width - dw.w,
                   top: $pop.top - dw.h + $('#j-diacon').height() - dw.wh
                });

                dw.dwPlay([],function(){
                    _.delay(function(){
                        dw.dwAround();
                        _.delay(function(){
                            dw.exciting(1);
                            dw.tips('点视频就能领哦~','zero');
                            obj.getPrize();
                        },400);
                    },400);
                },600);
            };

            this.getPrize = function(){
                $('#j-popvideo').one('click',function(){
                     _.dialog( baidu.template('j-prizeTemp' , {type : 0} ) );  

                     $('#j-closePrize').one('click',function(){
                        _.closeDialog();
                        dw.exciting();
                        dw.tips()
                     });
                }); 
            };
        }

        window.DwPlay = DwPlay;
        window._ = _;
    })();

        

    