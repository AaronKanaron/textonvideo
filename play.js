var video = document.querySelector("video");


window.addEventListener("keydown", (event) => {
	if (event.key == " "){
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}
});

window.addEventListener("keydown", (event) => {
	if (event.key == "r") {
		video.currentTime = 0;
		renderText(0.0, document.getElementById("time"));
	}
});

window.addEventListener("keyup", function (event) {
	event.preventDefault();
	if (event.key === "Escape") {
		window.location.href = "index.html";
	}
})


function renderText(text, element) {
	//remove previous text and replace it with variable text
	element.innerHTML = text;
}


var checkTime = window.setInterval(function () {
	if (!video.paused) {
		console.log("Video is playing at time: " + video.currentTime);
		renderText(video.currentTime.toFixed(1), document.getElementById("time"));

		//Check if video currentTime is equal to subs localhost time
		//Get item from local storage
		var subs = JSON.parse(localStorage.getItem("subs"));
		console.log(subs);
		for (var i = 0; i < subs.length; i++) {
			if (subs[i].timestamp == video.currentTime.toFixed(1)) {
				console.log("Rendering New Element")
				renderText(subs[i].text, document.getElementById("display"));
			}
		}
	}
}, 100);