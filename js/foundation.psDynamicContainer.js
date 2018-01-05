'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Foundation Perfect Scrollbar Dynamic Container by Samuel Moncarey.
 */

!function ($) {
    var PsDynamicContainer = function () {
        function PsDynamicContainer(element, options) {
            _classCallCheck(this, PsDynamicContainer);

            this.$element = element;
            this.options = $.extend({}, PsDynamicContainer.defaults, this.$element.data(), options);

            this._init();
            this._events();

            Foundation.registerPlugin(this, 'PsDynamicContainer');
        }

        _createClass(PsDynamicContainer, [{
            key: '_init',
            value: function _init() {
                this.$ps = this.$element.find('[data-perfect-scrollbar]');
                this.$heightTarget = this.$ps.find(this.options.heightTarget);
                this.$heightTarget.attr('data-mutate', Foundation.GetYoDigits(6, 'psdc'));
            }
        }, {
            key: '_events',
            value: function _events() {
                var _this = this;

                this.$heightTarget.add(this.$heightTarget.find('[data-mutate]')).on('mutateme.zf.trigger', function (e) {
                    var height = Foundation.Box.GetDimensions(_this.$heightTarget).height,
                        ownDims = Foundation.Box.GetDimensions(_this.$element),
                        maxHeight = window.innerHeight - (ownDims.offset.top - ownDims.windowDims.offset.top);
                    _this.$element.css({
                        position: 'relative',
                        height: height + 'px',
                        maxHeight: maxHeight + 'px'
                    });
                    _this.$ps.perfectScrollbar('update');
                });
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                Foundation.unregisterPlugin(this);
            }
        }]);

        return PsDynamicContainer;
    }();

    PsDynamicContainer.defaults = {
        heightTarget: '> *:not(.ps-scrollbar-y-rail):not(.ps-scrollbar-x-rail)'
    };

    Foundation.plugin(PsDynamicContainer, 'PsDynamicContainer');
}(jQuery);