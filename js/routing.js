var routing = {
    routes: {
        "/": {
            location: "/views/home.html",
            title: "Foundation Select"
        },
        "/foundation-plugins/select": {
            location: "/views/foundation-plugins/select.html",
            title: "Foundation Select"
        },
        "/foundation-plugins/perfect-scrollbar": {
            location: "/views/foundation-plugins/perfect-scrollbar.html",
            title: "Foundation Perfect Scrollbar"
        }
    },
    error: {
        html: "<h1>404 Not found...</h1>",
        title: "Not Found"
    },
    cache: {},
    loaderSettings: {
        lines: 10,
        length: 48,
        width: 24,
        radius: 48,
        scale: .6,
        corners: 2,
        color: '#333333',
        fadeColor: '#ffffff',
        opacity: 0,
        rotate: 30,
        direction: 1,
        speed: 1.2,
        trail: 96,
        fps: 20,
        zIndex: 2e9,
        className: 'spinner',
        top: '33%',
        left: '50%',
        shadow: 'none',
        position: 'absolute'
    },
    route: function (routeName, replace) {
        var $main = $('main');
        var $loader = $('#loader');
        if (replace === undefined) replace = false;

        if (this.cache.hasOwnProperty(routeName)) {
            this.loadHtml(routeName);
            this.setHistory(this.routes[routeName].title, routeName, replace);
        }
        else {
            if (this.routes.hasOwnProperty(routeName)) {
                var setHistoryCb = function (routName, replace) {
                    this.setHistory(this.routes[routeName].title, routeName, replace);
                };
                this.getHtml(routeName, setHistoryCb.apply(this, [routeName, replace]));
            }
            else {
                $main.html(this.error.html);
                this.setHistory(this.error.title, routeName, replace);
            }
        }
    },
    getHtml: function (routeName, callback) {
        var _this = this;
        this.setLoader();
        $.ajax({
            url: this.routes[routeName].location,
            success: function (data) {
                _this.cache[routeName] = data;
                _this.loadHtml(routeName);
                if (typeof callback === 'function') callback(data);
            }
        });
    },
    loadHtml: function (routeName) {
        var $main = $('main'),
            $loader = $('#loader');

        $loader.stop().animate({opacity: 0}, 100, 'swing', function () {$loader.css({'display':'none'})});
        $html = $(this.cache[routeName]);
        $main.replaceWith($html);
        $html.foundation();
        $html.find('pre code').each(function (index, block) {
            hljs.highlightBlock(block);
        });

        this.matchAnchors();
        $('main').animate({opacity: 1}, 400);

    },
    matchAnchors: function () {
        var _this = this;
        $(document).find('a').each(function (index, anchor) {
            var $anchor = $(anchor);
            if (_this.routes.hasOwnProperty($anchor.attr('href'))) {
                $anchor.off('click').on('click', function (e) {
                    e.preventDefault();
                    _this.route($(this).attr('href'), false);
                });
            }
        });
    },
    setHistory: function (title, routeName, replace) {
        if (!replace) history.pushState(routeName, title, routeName);
        else history.replaceState(routeName, title, routeName);
    },
    popHistory: function (popevent) {
        var routeName = popevent.state;
        if (this.cache.hasOwnProperty(routeName)) {
            this.loadHtml(routeName);
        }
        else {
            if (this.routes.hasOwnProperty(routeName)) {
                this.getHtml(routeName);
            }
            else {
                $main.html(this.error.html);
            }
        }
    },
    setLoader: function () {
        var $main = $('main'),
            $loader = $('#loader');
        $loader.css({'display':'block'});
        $loader.animate({opacity: 1}, 200);
        $main.animate({opacity: 0}, 100);
    },

    init: function (routeName) {
        $('#loader').spin(this.loaderSettings);
        this.matchAnchors();
        window.addEventListener('popstate', this.popHistory.bind(this), false);
        this.route(routeName, true);
    }
};