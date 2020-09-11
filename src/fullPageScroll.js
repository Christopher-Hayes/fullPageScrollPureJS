/**
 * Full page
 */
(function () {
	'use strict';
	
	/**
	 * Full scroll main function
	 */
	var fullScroll = function (params) {
		/**
		 * Main div
		 * @type {Object}
		 */
		var main = document.querySelector(params.mainSelector);
		
		/**
		 * Sections divclass
		 * @type {Array}
		 */
		var sections = main.querySelectorAll(params.sectionSelector);
		
		/**
		 * Full page scroll configurations
		 * @type {Object}
		 */
		var defaults = {
			container : main,
			sections : sections || main.querySelectorAll('section'),
			animateTime : params.animateTime || 700,
			animateFunction : params.animateFunction || 'ease',
			maxPosition: sections.length - 1,
			currentPosition: 0,
		};

		this.defaults = defaults;
		/**
		 * Init build
		 */
		this.init();
	};

	/**
	 * Init plugin
	 */
	fullScroll.prototype.init = function () {
		this.buildPublicFunctions()
        .buildSections()
        .addEvents();

		var anchor = location.hash.replace('#', '').split('/')[0];
		location.hash = 0;
		this.changeCurrentPosition(anchor);
		this.registerIeTags();
	};

	/**
	 * Build sections
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.buildSections = function () {
		var sections = this.defaults.sections;
		for (var i = 0; i < sections.length; i++) {
			sections[i].setAttribute('data-index', i);
		}
		return this;
	};

	/**
	 * Add Events
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.addEvents = function () {
		
		if (document.addEventListener) {
			document.addEventListener('mousewheel', this.mouseWheelAndKey, false);
			document.addEventListener('wheel', this.mouseWheelAndKey, false);
			document.addEventListener('keyup', this.mouseWheelAndKey, false);
			document.addEventListener('touchstart', this.touchStart, false);
			document.addEventListener('touchend', this.touchEnd, false);
			window.addEventListener("hashchange", this.hashChange, false);

			/**
			 * Enable scroll if device doesn't have touch support
			 */
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				if(!('ontouchstart' in window)){
					document.body.style = "overflow: scroll;";
					document.documentElement.style = "overflow: scroll;";
				}
			}			

		} else {
			document.attachEvent('onmousewheel', this.mouseWheelAndKey, false);
			document.attachEvent('onkeyup', this.mouseWheelAndKey, false);
		}
		
		return this;
	};	

	/**
	 * Build public functions
	 * @return {[type]} [description]
	 */
	fullScroll.prototype.buildPublicFunctions = function () {
		var mTouchStart = 0;
		var mTouchEnd = 0;
		var _self = this;

		this.mouseWheelAndKey = function (event) {
			if (event.deltaY > 0 || event.keyCode == 40) {	
				_self.defaults.currentPosition ++;
				_self.changeCurrentPosition(_self.defaults.currentPosition);				
			} else if (event.deltaY < 0 || event.keyCode == 38) {
				_self.defaults.currentPosition --;
				_self.changeCurrentPosition(_self.defaults.currentPosition);	
			}
			_self.removeEvents();
		};

		this.touchStart = function (event) {
			mTouchStart = parseInt(event.changedTouches[0].clientY);
			mTouchEnd = 0;
		};

		this.touchEnd = function (event) {
			mTouchEnd = parseInt(event.changedTouches[0].clientY);
			if (mTouchEnd - mTouchStart > 100 || mTouchStart - mTouchEnd > 100) {
				if (mTouchEnd > mTouchStart) {
					_self.defaults.currentPosition --;
				} else {
					_self.defaults.currentPosition ++;					
				}
				_self.changeCurrentPosition(_self.defaults.currentPosition);
			}			
		};

		this.hashChange = function (event) {
			if (location) {
				var anchor = location.hash.replace('#', '').split('/')[0];
				if (anchor !== "") {
					if (anchor < 0) {
						_self.changeCurrentPosition(0);
					} else if (anchor > _self.defaults.maxPosition) {
						_self.changeCurrentPosition(_self.defaults.maxPosition);
					} else {
						_self.defaults.currentPosition = anchor;
						_self.animateScroll();
					}					
				}				
			}
		};

		this.removeEvents = function () {
			if (document.addEventListener) {
        document.removeEventListener('mousewheel', this.mouseWheelAndKey, false);
        document.removeEventListener('wheel', this.mouseWheelAndKey, false);
        document.removeEventListener('keyup', this.mouseWheelAndKey, false);
        document.removeEventListener('touchstart', this.touchStart, false);
        document.removeEventListener('touchend', this.touchEnd, false);
			} else {
				document.detachEvent('onmousewheel', this.mouseWheelAndKey, false);
				document.detachEvent('onkeyup', this.mouseWheelAndKey, false);
			}

			setTimeout(function(){
				_self.addEvents();
			}, 600);
		};

		this.animateScroll = function () {
			var position = this.defaults.currentPosition * 100;

      let startScrollY = getScrollTop();
      setTransition();
      setTranslate(position);


      setTimeout(() => {
        // Remove transition
        setTransition(0, animateFunction);
        // Wait a moment for the transition CSS to take effect
        setTimeout(() => {
          // Swap translate for scroll position
          setTranslate(0);
          let deltaScrollY = getScrollTop() - startScrollY;
          window.scrollTo(window.scrollY || 0, position + deltaScrollY);
        }, 50);

      }, animateTime);
		};

    this.setTranslate = position => {
			this.defaults.container.style.webkitTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.mozTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.msTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.transform = 'translateY(-' + position + '%)';
    };
    this.setTransition = (animateTime=this.defaults.animateTime,
                          animateFunction=this.defaults.animateFunction) => {
			this.defaults.container.style.webkitTransition = 'all ' + animateTime + 'ms ' + animateFunction;
			this.defaults.container.style.mozTransition = 'all ' + animateTime + 'ms ' + animateFunction;
			this.defaults.container.style.msTransition = 'all ' + animateTime + 'ms ' + animateFunction;
			this.defaults.container.style.transition = 'all ' + animateTime + 'ms ' + animateFunction;
    };

		this.changeCurrentPosition = function (position) {
			if (position !== '') {
				_self.defaults.currentPosition = position;
				// location.hash = _self.defaults.currentPosition;
			}
		};

		return this;
	};
	window.fullScroll = fullScroll;

  // Utility functions
  // Get scroll position; source: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
  function getScrollTop() {
    var supportPageOffset = window.pageYOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : docume
    return y;
  }
})();
