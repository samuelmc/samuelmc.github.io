$(document).foundation();
$('#loader').spin({
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
});

var routeName = '/';
var query = $.deparam(location.search);

routing.matchAnchors();

if (query.q) routeName = query.q;
routing.route(routeName, true);