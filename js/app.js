$(document).foundation();

var routeName = '/';
var query = $.deparam(location.search);

routing.init();

if (query.q) routeName = query.q;
routing.route(routeName, true);