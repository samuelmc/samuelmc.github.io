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
    route: function (routeName, replace) {
        var _this = this;
        var $main = $('main');
        var $loader = $('#loader');
        if (replace === undefined) replace = false;

        if (this.cache.hasOwnProperty(routeName)) {
            $main.html(this.cache[routeName].html);
            this.setHistory(this.cache[routeName].title, routeName, replace);
        }
        else {
            if (this.routes.hasOwnProperty(routeName)) {
                this.setHistory(this.routes[routeName].title, routeName, replace);
                this.setLoader();
                $.ajax({
                    url: this.routes[routeName].location,
                    success: function (data) {
                        $loader.fadeOut();
                        $html = $(data);
                        $main.replaceWith($html);
                        $html.foundation();
                        $html.find('pre code').each(function (index, block) {
                            hljs.highlightBlock(block);
                        });

                        _this.matchAnchors();
                        $main.fadeIn();
                        //_this.cache[routeName] = {html: $html, title: _this.routes[routeName].title};
                    }
                });
            }
            else {
                $main.html(this.error.html);
                this.setHistory(this.error.title, routeName, replace);
            }
        }
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
        if (!replace) history.pushState({}, title, routeName);
        else history.replaceState({}, title, routeName);
    },
    setLoader: function () {
        var $main = $('main'),
            $loader = $('#loader');
        $loader.fadeIn();
        $main.fadeOut();
    }
};