document.addEventListener('DOMContentLoaded', function () {
	var images = document.getElementsByTagName('img');
	for (var i = images.length - 1; i >= 0; i--) {
		images[i].addEventListener("click", function () {
			if (screenfull.enabled) {
		        screenfull.toggle(this);
		    }
		    console.log("clicked");
		},false);
	}

	$(document).keyup(function(e) {
	    if (e.keyCode == 27) {
	        screenfull.exit();
	    }
	});

}, false);

