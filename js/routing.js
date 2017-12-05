var routing = {
    routes: {
        "foundation-plugins/selectt": {
            location: "foundation-plugins/select.html",
            title: "Foundation Select"
        },
        "foundation-plugins/perfect-scrollbar": {
            location: "foundation-plugins/perfect-scrollbar.html",
            title: "Foundation Perfect Scrollbar"
        }
    },
    error: {
        html: "<h1>404 Not found...</h1>",
        title: "Not Found"
    },
    cache: {},
    route: function (routeName, replace) {
        var $main = $('main');
        routeName = routeName.replace(/^\/|\/$/g, '');
        if (replace === undefined) replace = false;

        if (this.cache.hasOwnProperty(routeName)) {
            $main.html(this.cache[routeName].html);
            this.setHistory(this.cache[routeName].title, routeName, replace);
        }
        else {
            if (this.routes.hasOwnProperty(routeName)) {
                $main.load(this.routes[routeName].location, {type: 'get'}, function (responseText, status, xhr) {
                    console.log(responseText, status, xhr);
                });
            }
            else {
                $main.html(this.error.html);
                this.setHistory(this.error.title, routeName, replace);
            }
        }
    },
    setHistory: function (title, routeName, replace) {
        if (!replace) history.pushState({}, title, routeName);
        else history.replaceState({}, title, routeName);
    }
};