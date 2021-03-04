// Load data from csv
let players;
let data;

fetch("game.csv")
.then(resp => resp.text())
.then(csv => {
	data = csv.split('\n');
	players = data.shift();

	players	= players.split(',');
	const NUM_PLAYERS = players.length;

	data = data.map(line => {
		return line.split(",").map(num => {
			return isNaN(parseFloat(num)) ? num : parseFloat(num);
		});
	});
	data = data.slice(1, data.length - 1);

	// Create initial boxes
	let playerBox = document.createElement("div");
	playerBox.id = "players";
	for (let i in players) {
		let pBox = document.createElement("div");
		let psBox = document.createElement("span");
		let addBox = document.createElement("span");
		pBox.classList.add("player");
		psBox.classList.add("player-score");
		addBox.classList.add("add");
		pBox.appendChild(psBox);
		pBox.appendChild(addBox);
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
});

function getScore(player, rounds) {
	let count = 0;
	// Since there is a row of zeros
	for (let i = 1; i < rounds + 1; ++i) {
		count += data[i][player];
	}
	return count;
}

// @returns [[name, total score, last earned score]]
function calculateScores(rounds) {
	let output = [];
	for (let i = 0; i < NUM_PLAYERS; ++i) {
		output.push([players[i], getScore(i, rounds), data[rounds][i]])
	}
	return output.sort((a,b) => b[1] - a[1]);
}

function populateScores(rounds) {
	const playerBox = document.getElementById("players");
	const scores = calculateScores(rounds);
	for (let i in scores) {
		playerBox.children[i].children[0].innerText = scores[i][0] + ": " + scores[i][1];
		playerBox.children[i].children[1].innerText = rounds > 0 ? " ( +" + scores[i][2] + ")" : ""; 
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
		// Snip pic gives .PNG
		if (context.includes(".PNG")) {
			contextBox.innerHTML = `<img src="assets/` + context + `">`;
		} else {
			contextBox.innerHTML = context;
		}
	} catch (e) {}
	populateScores(stage);
}