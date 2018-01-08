$(document).foundation();

var routeName = '/';
var query = $.deparam(location.search);
if (query.q) routeName = query.q;

routing.init(routeName);
