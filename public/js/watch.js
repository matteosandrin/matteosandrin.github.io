var hours = 0;
var minutes = 0;
var seconds = 0;
var face = 0;

document.getElementById('watch-container').width = "100%";
document.getElementById('watch-container').width = "100%";

var s = Snap.select('#svg');
Snap.load("/public/images/watch-red.svg", function (f) {
	face = f.select('#face');
	s.append(face);
	hours = f.select('#hours');
	s.append(hours);
	minutes = f.select('#minutes');
	s.append(minutes);
	seconds = f.select('#seconds');
	s.append(seconds);
});

document.getElementById('svg').setAttribute('viewBox','0 0 500 500');
document.getElementById('svg').setAttribute('preserveAspectRatio','xMaxYMax');

window.setInterval(function(){

	var w = face.getBBox()["width"] / 2;
	d = new Date();
	var ms  = (d.getMilliseconds() * 6 / 999);
	var h = (d.getHours() % 12) * 360 / 12;
	var m = (d.getMinutes() * 360 / 60);
	var s = (d.getSeconds() * 360 / 60);

	hours.transform( 'r'+ (h+(m * 30 / 360)) +',' + w + ',' + w );
	minutes.transform( 'r'+ (m+(s * 6 / 360)) +',' + w + ',' + w );
	seconds.transform( 'r'+ (s+ms) +',' + w + ',' + w );

}, 1);

// function changeColor (element) {
// 	if (element.css["fill"] == "#901923") {
// 		element.css["fill"] == "#FFFFFF"
// 	}else{
// 		element.css["fill"] == "#901923"
// 	}
// 	var all = element.selectAll('*');
// 	for (var i = 0; i < all.length; i++) {
// 		changeColor(all[i]);
// 	}

// }

// changeColor(s);