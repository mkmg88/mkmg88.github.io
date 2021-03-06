(function() {
  var Background = (function() {
    var that;

    function Background(target) {
      var ua = navigator.userAgent.toLowerCase();
      if (/msie 8./.test(ua)) {
        return;
      }
      this.$window = $(window);
      this.$bgLeaf = $(target);

      this.bindEvents();
      that = this;
    }

    Background.prototype.bindEvents = function() {
      return this.$window.on('scroll',this.parallaxLeaf);
    };

    Background.prototype.parallaxLeaf = function() {
      var elem, pos_bg_1, pos_bg_2, pos_bg_3, ref, results, y, y_1, y_2, y_3;
      
      y = this.scrollY;
      ref = that.$bgLeaf;
      for (var i = 0; i < ref.length; i++) {
        elem = ref[i];
        y_1 = y * .8;
        y_2 = y * .5;
        y_3 = y * .3;
        pos_bg_1 = '0px ' + y_1 + 'px,';
        pos_bg_2 = '0px ' + y_2 + 'px,';
        pos_bg_3 = '0px ' + y_3 + 'px';
        elem.style.backgroundPosition = pos_bg_1 + pos_bg_2 + pos_bg_3;
      }
    };

    return Background;

  })();

  window.ks = window.ks || (ks = {});
  window.ks.Background = Background || (Background = {});

}).call(this);
