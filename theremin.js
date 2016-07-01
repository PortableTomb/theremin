// var context = new AudioContext(),
// oscillator = context.createOscillator();

// oscillator.connect(context.destination);

// oscillator.start(context.currentTime);
// oscillator.stop(context.currentTime + 1);
var gainNode = context.createGain();

var context = new AudioContext(),
	mousedown = false,
	oscillator;

var calculateFrequency = function (mouseXPosition){
	var minFrequency = 20,
	var maxFrequency = 2000;

return ((mouseXPosition / window.innerWidth) * maxFrequency) + minFrequency;
};

var calculateGain = function (mouseYPosition){
	var minGain = 0,
	var maxGain = 1;

return ((mouseYPosition / window.innerWidth) * maxGain) + minGain;
};

document.body.addEventListener('mousedown', function(e) {
mousedown = true;
oscillator = context.createOscillator();
oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX),context.currentTime, 0.01);
gainNode.gain.setTargetAtTime(calculateGain(e.clientY),context.currentTime, 0.01);
oscillator.connect(gainNode);
gainNode.connect(context.destination);
oscillator.start(context.currentTime);
});

document.body.addEventListener('mouseup', function() {
	mousedown = false;
	oscillator.stop(context.currentTime);
	oscillator.disconnect();
});

document.body.addEventListener('mousemove', function(e){
	if (mousedown) {
		oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX),context.currentTime, 0.01);
		gainNode.gain.setTargetAtTime(calculateGain(e.clientY),context.currentTime, 0.01);
	}
});

