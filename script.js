// Load data from csv
let players = "A,B,C,D,E";
let data = `
0,0,0,0,0,Start,"Everyone is equal.",Capture.PNG
1,2,3,4,5,First Game,"But some are more equal than others.",here is some context
10,50,20,40,30,Second Game, another desc
`;

players	= players.split(',');
const NUM_PLAYERS = players.length;

data = data.split('\n').map((line) => {
	return line.split(",").map((num) => {
		return isNaN(parseFloat(num)) ? num : parseFloat(num);
	});
});
console.log(data);
data = data.slice(1, data.length - 1);

function getScore(player, rounds) {
	let count = 0;
	// Since there is a row of zeros
	for (let i = 1; i < rounds + 1; ++i) {
		count += data[i][player];
	}
	return count;
}

function calculateScores(rounds) {
	let output = [];
	for (let i = 0; i < NUM_PLAYERS; ++i) {
		output.push([players[i], getScore(i, rounds)])
	}
	return output.sort((a,b) => b[1] - a[1]);
}

function populateScores(rounds) {
	const playerBox = document.getElementById("players");
	const scores = calculateScores(rounds);
	for (let i in scores) {
		playerBox.children[i].innerText = scores[i][0] + ": " + scores[i][1];		
	}
}

function showStage(stage) {
	document.getElementsByClassName("title")[0].innerText = data[stage][NUM_PLAYERS];
	document.getElementsByClassName("description")[0].innerText = data[stage][NUM_PLAYERS + 1];
	// Shit code because speed matters
	const contextBox = document.getElementsByClassName("context")[0];
	try {
		contextBox.innerHTML = "";
		let context = data[stage][NUM_PLAYERS + 2];
		console.log(context)
		// Snip pic gives .PNG
		if (context.includes(".PNG")) {
			console.log("hello");
			contextBox.innerHTML = `<img src="assets/` + context + `">`;
		} else {
			contextBox.innerHTML = context;
		}
	} catch (e) {}
	populateScores(stage);
}

// Create initial boxes
let playerBox = document.createElement("div");
playerBox.id = "players";
for (let i in players) {
	let pBox = document.createElement("div");
	pBox.classList.add("player");
	playerBox.appendChild(pBox);
}
document.body.appendChild(playerBox);

// Register event listeners
document.getElementsByClassName("button")[0].addEventListener("click", () => {
	if (currStage != 0) showStage(--currStage);
});

document.getElementsByClassName("button")[1].addEventListener("click", () => {
	if (currStage < data.length - 1) showStage(++currStage);
});

// Initialize with the current scores
let currStage = data.length - 1;
showStage(currStage);
