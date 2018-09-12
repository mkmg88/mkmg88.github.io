 /*
  * 启动高速下载，需引入2015-7-16
 */
 var AndroidConnect = {
        initLaunch : function(){
            var _this = this;
            if( !this.frame ){
                this.frame = document.createElement("iframe");
                this.frame.height = "0";
                this.frame.width = "0";
                this.frame.frameBorder = 0;

                document.body.appendChild(this.frame);
                this.timeout = 1000;

                window.onblur = function(){
                    clearTimeout(_this.timer);
                    _this.timer = null;
                };

                this.frame.onload = function(){
                    console.log("404 onload");
                    if(_this.timer == null){
                        return;
                    }
                    clearTimeout(_this.timer);
                    _this.timer = null;
                    _this.launchFallback(new Date() - 0);
                }

                this.frame.onerror = function(){
                    console.log("onerror");
                    if(_this.timer == null){
                        return;
                    }
                    clearTimeout(_this.timer);
                    _this.timer = null;
                    _this.launchFallback(new Date() - 0);
                }
            }
        },

        launchFallback : function(start_time){
            var now_time = Date.now();

            console.log(now_time - start_time , this.timeout + 200);
            if (!start_time || now_time - start_time < this.timeout + 200){
                this.fallback();
            }
        },
            
        launch : function(launch_url, fallback){
            var _this = this,
                start_time = Date.now();

                this.launch_url = launch_url || 'm5400://launch';
                this.fallback = typeof fallback === "function" ? fallback : function(){};

                this.initLaunch();

                if( this.fallback ){
                    this.timer = setTimeout(function(){
                        console.log("timeout");
                        _this.launchFallback(start_time);
                    }, _this.timeout);
                }

                this.redirect();
            },

            redirect : function(){
                this.frame.setAttribute("src", this.launch_url);
            }
        }