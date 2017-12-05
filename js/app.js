$(document).foundation();

var query = $.deparam(location.search);

if (query.q) {
    //history.replaceState({}, '', query.q);
    routing.route(query.q, true);
}