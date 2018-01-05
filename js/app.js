$(document).foundation();
$('#loader').spin(routing.loaderSettings);

var routeName = '/';
var query = $.deparam(location.search);

routing.matchAnchors();

if (query.q) routeName = query.q;
routing.route(routeName, true);