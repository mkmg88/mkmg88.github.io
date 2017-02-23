function Jump(target,dx){
   this.target = target;
   this.dx = dx;
   this.dxIndedx = 0;
   
};

Jump.prototype = {
   jump: function(options){
      if(this.req) return;

      var _default = {
         speedX: 5,
         speedY: -20
      };
      this.options = $.extend(_default,options);
      this.over = false;

      this.options.begin && this.options.begin();

      if(!this.isSetRange){
         this.setRange();
         this.isSetRange = true;
      };
      this.req = requestAnimationFrame(this.draw.bind(this));
   },

   draw: function(){
      //加上重力
      this.options.speedY += 3;

      //用l和t储存当前的距离
      var t = this.target.offsetTop + this.options.speedY;
      var l = this.target.offsetLeft + this.options.speedX;
      /*横向*/
      if(l >= this.range.docMaxWidth){
         l = this.range.docMaxWidth;
         this.options.speedX *= -0.8;
      }else if(l <= this.range.docMinWidth){
         this.options.speedX *= -0.8;
         l = this.range.docMinWidth;
      }else if(l >= this.range.maxWidth || l <= this.range.minWidth){
         console.log('down');
         this.down();
      };

      /*竖向*/
      if(t >= this.range.docMaxHeight){
         t= this.range.docMaxHeight;
         this.options.speedY = 0;
         this.options.speedX = 0;
         this.over = true;
      }else if(t >= this.range.maxHeight){
         t = this.range.maxHeight;
         this.options.speedY = 0;
         this.options.speedX = 0;
         this.over = true;
      };

      this.target.style.top = t + 'px';
      this.target.style.left = l + 'px';

      if(this.over){
         console.log('over');
         this.req = null;
         this.options.complete && this.options.complete();
      }else{
         requestAnimationFrame(arguments.callee.bind(this));
      };
   },

   getRange: function(i){
      if(this.dx[i]){
         this.range.minWidth = this.dx[i].offsetLeft - this.target.offsetWidth;
         this.range.maxWidth = this.dx[i].offsetLeft + this.dx[i].offsetWidth;
         this.range.maxHeight = this.dx[i].offsetTop - this.target.offsetHeight;
      }else{
         this.range.minWidth = 0;
         this.range.maxWidth = this.range.docMaxWidth;
         this.range.maxHeight = this.range.docMaxHeight;
      }
      console.log(this.range.maxHeight);
   },
   setRange: function(){
      this.range = {}
      this.range.docMinWidth = 0;
      this.range.docMaxWidth = document.documentElement.clientWidth - this.target.offsetWidth;
      this.range.docMaxHeight = document.documentElement.clientHeight - this.target.offsetHeight;
      this.getRange(0);
   },
   down: function(){
      this.dxIndedx++;
      this.getRange(this.dxIndedx)
   }
}