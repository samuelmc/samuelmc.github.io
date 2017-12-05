var routing = {
    routes: {
        "foundation-plugins/select": {
            location: "foundation-plugins/select.html",
            title: "Foundation Select"
        },
        "foundation-plugins/perfect-scrollbar": {
            location: "foundation-plugins/perfect-scrollbar.html",
            title: "Foundation Perfect Scrollbar"
        }
    },
    error: {
        location: "not-found.html",
        title: "Not Found"
    },
    cache: {},
    route: function (routeName, replace) {
        if (replace === undefined) replace = false;
        var $main = $('main');
        if (this.cache.hasOwnProperty(routeName)) {
            $main.html(this.cache[routeName].html);
            if (!replace) history.pushState({}, this.cache[routeName].title, routeName);
            else history.replaceState({}, this.cache[routeName].title, routeName)
        }
        else {
            if (this.routes.hasOwnProperty(routeName)) {
                $('main').load(this.routes[routeName].location, {}, function (responseText, status, xhr) {
                    console.log(responseText, status, xhr);
                });
            }
        }
    }
};