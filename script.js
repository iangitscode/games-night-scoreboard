// Load data from csv
let players = "A,B,C,D,E";
let data = `
1,2,3,4,5
10,50,20,40,30
`;

players	= players.split(',');
data = data.split('\n').map((line) => {
	return line.split(",").map((num) => {
		return parseFloat(num);
	});
});
data = data.slice(1, data.length - 1);

function getScore(player, rounds) {
	let count = 0;
	for (let i = 0; i < rounds; ++i) {
		count += data[i][player];
	}
	return count;
}

function calculateScores(rounds) {
	let output = [];
	for (let i in players) {
		output.push([players[i], getScore(i, rounds)])
	}
	return output.sort((a,b) => b[1] - a[1]);
}

function populateScores(rounds) {
	const playerBox = document.getElementById("players");
	const scores = calculateScores(rounds);
	for (let i = 0; i < scores.length; ++i) {
		playerBox.children[i].innerText = scores[i][0] + ": " + scores[i][1];		
	}
}

// Create initial boxes
let playerBox = document.createElement("div");
playerBox.id = "players";
for (let i in data[0]) {
	let pBox = document.createElement("div");
	pBox.classList.add("player");
	playerBox.appendChild(pBox);
}
document.body.appendChild(playerBox);
populateScores(0);

let game = [];
