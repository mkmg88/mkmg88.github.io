
var _url = {
    userInfo: 'json/play.json',
    gameList: 'json/gameList.json',
    attack: 'json/play.json',
    tracePv: 'json/play.json',
    myReward: 'json/myReward.json',
    submit: 'json/play.json'
};

var _config = {
    scookie: ''
}

/* TOOL */
var GlobeAr = function(){};

GlobeAr.prototype.dialog = function(html){
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

GlobeAr.prototype.closeDialog = function(){
    $('#j-dialog').remove();
    $(document).off('touchmove.zz')
    return false;
};

var Monster = function(){
    var obj = this;

    this.globe = new GlobeAr();

    this.init = function(){
        this.setTopData();
        this.getDate();
        this.bindEvent();
    };

    this.setTopData = function(){
        $('#j-topbpx').html( baidu.template('j-topTemp' , {list : JSON.parse(rankList) } ) );
    };

    this.getDate = function(){
        var dataObj = {};
        $.getJSON(_url.userInfo,{},function(data){
            if(data.code == 100){
                if(!data.result.progress){
                    new GameBox({}).gameOver();
                    return;
                }
                dataObj.mission = data.result.progress.level;
                dataObj.times = data.result.progress.times;
                dataObj.slNum = data.result.num;
                dataObj.taskFin = data.result.taskFinish;
                new GameBox(dataObj).init(); 
            }else{
                alert(data.message);
            }
        });
    };

    this.bindEvent = function(){
        $('#j-rule').on('tap',function(){
            obj.globe.dialog($('#j-ruleTemp').html());
        });

        $('#j-prize').on('tap',function(){
            obj.getMyPrize();
        });

        $(document).on('click','.j-close',function(){
            obj.globe.closeDialog();
        });

        $('#j-feedback').on('submit',function(){
            var textarea = $(this).find('textarea');
            var text = textarea.val();
            if(text.length == 0){
                alert('请填写反馈信息哦~');
            }else if(text.length >= 600){
                alert('超过字数限制，再精简一下吧~');
            };
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: _url.submit,
                data: {scookie: _config.scookie,content: text,udid: ''},
                success: function(data){
                    if(data.code == 100){
                        textarea.val('');
                        alert('提交成功~');
                    }else{
                        alert(data.message);
                    }
                }
            });
            return false;
        });
    };

    this.getMyPrize = function(){
        $.getJSON(_url.myReward,{},function(data){
            if(data.code == 100){
                obj.globe.dialog(  baidu.template('j-prizeTemp' , {task : 1, res: data.result} ) );
            }else{
                alert(data.message);
            }
        });
    };
};

/*  
    game
*/
var GameBox = function(opt){
    var obj = this;

    this.globe = new GlobeAr();

    var $gameBox = $('#j-gamebox');
    var $lvBox = $('#j-lvbox');
    var _harm = [3,5,6,7,8];

    obj.config = {
        mission: opt.mission || 1,
        slNum: opt.slNum || 0,
        times: opt.times || 0,
        taskFin: opt.taskFin || []
    };
    obj.config.harm = Math.ceil(100/_harm[obj.config.mission - 1]);
    obj.config.blood = 100 - obj.config.times*obj.config.harm;

    this.init = function(){
        if(opt.isEnd){
            this.gameOver();
        }else{
            this.render();
            this.bindEvent();
        }
    };

    /* 初始化 */
    this.render = function(){
        $lvBox.html(baidu.template('j-lvtemp' , {mission : obj.config.mission} ));
        obj.dom = {
            mission: $gameBox.find('.m-lv'),
            zz: $gameBox.find('.j-zz'),
            sld: $gameBox.find('.j-sld'),
            dptext: $gameBox.find('.dptext'),
            smoke: $gameBox.find('.m-smoke'),
            monster: $gameBox.find('.monster'),
            blood: $gameBox.find('.blood i'),
            sldNum: $gameBox.find('.j-sldnum'),
            tips: $gameBox.find('.j-tips'),
            dw: $gameBox.find('.dw')
        };
        obj.dom.sldNum.html( 'X' + obj.config.slNum );
        obj.dom.blood.css('width', obj.config.blood + '%');

        if( $gameBox.find('.j-startGame').length == 0 ){
            obj.gameStart();
        };
    };
};


GameBox.prototype.bindEvent = function(){
    var obj = this;
    var $gameBox = $('#j-gamebox');

    /*开始游戏*/
    $gameBox.on('click','.j-startGame',function(){
        $.getJSON(_url.tracePv,{},function(){});
        obj.gameStart($(this).parent());
    });
    /*对话*/
    $gameBox.on('click','.j-dialogue',function(){
        obj.dom.dptext.removeClass('show').on('webkitTransitionEnd',function(){
            $(this).remove();
            obj.dom.zz.removeClass('j-dialogue').addClass('j-playGame');
        });
    });
    /*开始玩*/
    $gameBox.on('click','.j-playGame a',function(){
        obj.gameIng();
    });

    /*增加手榴弹*/
    $(document).on('click','.j-addSld',function(){
        obj.globe.closeDialog();
        $gameBox.append( baidu.template('j-lvmission' , {task : obj.config.taskFin} ) );
    });

    $(document).on('click','.j-close',function(){
        obj.globe.closeDialog();
    });

    /* 任务窗口 */
    $gameBox.on('click','.j-addclose',function(){
        $(this).parent().remove();
    });
    /* 做任务 */
    $gameBox.on('click','.j-task a',function(){
        var id = $(this).attr('data-id');
        obj.taskFer(id);
    });

    /*下一关*/
    $(document).on('click','.j-nextMission',function(){
        obj.globe.closeDialog();
        obj.nextMission();
    });

    /*反馈*/
    $(document).on('click','.j-feedback',function(){
        if($(this).attr('data-feed')){
            var $feedBox = $('#j-feedbox');
            window.scrollTo(0, $feedBox.offset().top - 100 );
            $feedBox.find('textarea')[0].focus();
        };
        obj.globe.closeDialog();
        obj.gameOver();
    });
};

/* 点击开始游戏 */
GameBox.prototype.gameStart = function($dom){
    var obj = this;
    obj.dom.zz.show().addClass('j-playGame');
    

    if($dom){
        $dom.addClass('remove').on('webkitTransitionEnd',function(){
            $dom.remove();
            obj.dom.dptext.addClass('show');
        });
    }else if(obj.dom.dptext.length > 0){
        setTimeout(function(){
            obj.dom.dptext.addClass('show');
        },10);
    }
};

/* 扔手榴弹 */
GameBox.prototype.gameIng = function(){
    var obj = this;

    /* 没有血 */
    if(obj.config.blood <= 0 || obj.isBoomImg){
        return;
    };

    /* 没有手榴弹 */
    if(obj.config.slNum == 0){
        obj.globe.dialog( $('#j-nosldtemp').html() );
        return;
    };

    $.getJSON(_url.attack,{},function(data){
        if(data.code == 100){
            obj.isBoomImg = true;
            obj.dom.dw.addClass('reng');
            obj.dom.sld.addClass('anim').on('webkitAnimationEnd',function(){
                /* boom - begin */
                obj.dom.sld.removeClass('anim');
                obj.dom.monster.addClass('shake-opacity').addClass('monster-hit');
                obj.dom.smoke.removeClass('hide').addClass('show');
                
                /* boom - end */
                clearTimeout(obj.boomTimer);
                obj.boomTimer = setTimeout(function(){
                    obj.gameStatus();
                    obj.dom.dw.removeClass('reng');
                },400);
            });
        }else{
            alert(data.message);
        }
    });
};

/* 炸后状态 */
GameBox.prototype.gameStatus = function(){
    var obj = this;

    if(obj.dom.tips && obj.dom.tips.length > 0){
        obj.dom.tips.remove();
        obj.dom.tips = null;
    };
    
    /* blood & slNum */
    obj.config.blood = obj.config.blood - obj.config.harm;
    obj.config.blood = obj.config.blood > 0 ? obj.config.blood : 0;
    obj.config.slNum = obj.config.slNum - 1;

    /* status */
    obj.dom.blood.css('width', obj.config.blood + '%');
    obj.dom.sldNum.html( 'X' + obj.config.slNum );

    obj.dom.smoke.removeClass('show').addClass('hide');
    obj.dom.monster.removeClass('shake-opacity monster-hit');

    /* isDed */
    if(obj.config.blood <= 0){
        obj.dom.monster.addClass('monster-die');
    };

    /* isNext */
    if(obj.config.blood <= 0){
        setTimeout(function(){
            if(obj.config.mission >= 3 ){
                obj.globe.dialog(baidu.template('j-misTemp' , {mission : obj.config.mission} ));
            }else{
                obj.nextMission();
            };
        },1500);
    };
    obj.isBoomImg = false;
};

/* 下一关 */
GameBox.prototype.nextMission = function(){
    var obj = this;
    obj.dom.mission.addClass('hide');

    /* off EventListener */
    $(document).off('click');
    $('#j-gamebox').off('click');

    new GameBox({
        mission: obj.config.mission + 1,
        slNum: obj.config.slNum
    }).init();
};

GameBox.prototype.gameOver = function(){
    $('#j-gamebox').append( $('#j-gameEndTemp').html() ).find('.m-start').remove();
    $('#j-lvbox').html( baidu.template('j-lvtemp' , {mission : 6} ) );
};

GameBox.prototype.taskFer = function(id){
    var obj = this;
    if(id == 5){
        $.getJSON(_url.gameList,{},function(data){
            if(data.code == 100){
                obj.globe.dialog(baidu.template('j-taskTemp' , {task : id,list: data.result} ));
            }else{
                alert(data.message);
            }
        });
    }else{
        obj.globe.dialog(baidu.template('j-taskTemp' , {task : id} ));
    };  
}


$(function(){
    new Monster().init();
});