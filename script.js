document.getElementById("input").addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.key === "Enter") {
		playPause();
		console.log("Enter key pressed");
	}
});

var video = document.querySelector("video");

var subs = [];

function playPause(){
	if (video.paused) {
		video.play();
	}else {
		video.pause();
	}
}


function renderText(text, element){
	//remove previous text and replace it with variable text
	element.innerHTML = text;
}

document.getElementById("input").addEventListener("change", (event) => {
	if(event.key !== "Enter"){
		console.log("Text:", event.target.value, "- Time: ", video.currentTime);
		//Push new text and timestamp in an object to array subs
		subs.push({text: event.target.value, timestamp: video.currentTime.toFixed(1)});
	}
})


var checkTime = window.setInterval(function(){
	if(!video.paused){
		console.log("Video is playing at time: " + video.currentTime);
		renderText(video.currentTime.toFixed(1), document.getElementById("time"));
	}
}, 100);


window.addEventListener("keyup", function(event){
	event.preventDefault();
	if(event.key === "Escape"){
		localStorage.setItem("subs", JSON.stringify(subs));
		window.location.href = "play.html";
	}
})

window.addEventListener("keyup", function (event) {
	event.preventDefault();
	if (event.key === "Backspace") {
		console.log("Cleared subs")
		subs = [];
		localStorage.removeItem("subs");
	}
})



//Try to load subs from local storage
var subs = JSON.parse(localStorage.getItem("subs"));
if(subs){
	subs.map((sub) => {
		console.log(sub.text);
		addSub(sub.text, sub.timestamp);
	})
}

function addSub(text, time){
	document.getElementById("sidebar").innerHTML += 
	`
	<div class="sub">
		<p class="side-text">${text}</p>
		<p class="side-time">${time}</p>
	</div>
	`
}