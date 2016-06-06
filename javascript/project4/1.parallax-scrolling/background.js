(function() {
  var Background = (function() {
    var that;

    function Background(target,bgs) {
      var ua = navigator.userAgent.toLowerCase();
      if (/msie 8./.test(ua)) {
        return;
      }
      this.$window = $(window);
      this.$bgLeaf = $(target);
      this.bgs = bgs;

      this.bindStyle();
      this.bindEvents();
      that = this;
    }

    Background.prototype.bindStyle = function() {
        var imgs = this.bgs,bgsAr = [];

        for(var i=0; i<imgs.length; i++){
            bgsAr.push('url(' + imgs[i] +') repeat 0px 0px');
        }
        
        this.$bgLeaf.css({
            'transition': '0.6s cubic-bezier(0.39, 0.575, 0.565, 1)',
            'background':  bgsAr.join(',')
        });
    };

    Background.prototype.bindEvents = function() {
      return this.$window.on('scroll',this.parallaxLeaf);
    };

    Background.prototype.parallaxLeaf = function() {
      var elem, pos_bg_1, pos_bg_2, pos_bg_3, ref, results, y, y_1, y_2, y_3;
      
      y = this.scrollY;
      ref = that.$bgLeaf;
      results = [];
      for (var i = 0; i < ref.length; i++) {
        elem = ref[i];
        y_1 = y * .8;
        y_2 = y * .5;
        y_3 = y * .3;
        pos_bg_1 = '0px ' + y_1 + 'px,';
        pos_bg_2 = '0px ' + y_2 + 'px,';
        pos_bg_3 = '0px ' + y_3 + 'px';
        results.push(elem.style.backgroundPosition = pos_bg_1 + pos_bg_2 + pos_bg_3);
      }
      return results;
    };

    return Background;

  })();

  window.ks = window.ks || (ks = {});
  window.ks.Background = Background || (Background = {});

}).call(this);
