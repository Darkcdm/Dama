//checkers

let Game = {
	windowSize: window.innerWidth,
	cellSize: this.windowSize / this.gameBoardSize,
	gameBoardSize: 8,
	gamePieces: [],
	gameArea: document.createElement("div"),
	gameBoard: document.createElement("table"),

	load: function () {
		this.setGameBoard();
		this.renderGameBoard();
	},
	renderGameBoard: function () {
		if (this.gameArea != null && this.gameBoard != null) {
			this.gameArea.remove();
			this.gameBoard.remove();
		}

		for (let y = 0; y < this.gameBoardSize; y++) {
			let row = document.createElement("tr");
			for (let x = 0; x < this.gameBoardSize; x++) {
				let cell = document.createElement("td");
				let img = document.createElement("img");

				img.id = Pairing.getID(x, y);

				if (x % 2 == 0) {
					if (y % 2 == 0) {
						img.src = "img/WhiteSqr.png";
					} else {
						img.src = "img/BlackSqr.png";
					}
				} else {
					if (y % 2 == 1) {
						img.src = "img/WhiteSqr.png";
					} else {
						img.src = "img/BlackSqr.png";
					}
				}
				cell.appendChild(img);
				row.appendChild(cell);
			}
			this.gameBoard.appendChild(row);
		}
		this.gameArea.appendChild(this.gameBoard);
		document.getElementById("body").appendChild(this.gameArea);
	},
	setGameBoard: function () {
		//set red
		for (y = 0; y < 2; y++) {
			for (x = 0; x < this.gameBoardSize; x++) {
				let piece = new GamePiece("RED", x, y, Pairing.getID(x, y));

				this.gamePieces.push(piece);
			}
		}

		//set blue
		for (y = 6; y < 8; y++) {
			for (x = 0; x < this.gameBoardSize; x++) {
				let piece = new GamePiece("BLUE", x, y, Pairing.getID(x, y));

				this.gamePieces.push(piece);
			}
		}
		return this.gamePieces;
	},
};

class GamePiece {
	constructor(colour, x, y, id) {
		this.colour = colour;
		this.x = x;
		this.y = y;
		this.id = id;
	}
	showPossibleMoves() {}
	movePiece() {}
}

let Pairing = {
	getID: function (x, y) {
		return ((x + y + 1) * (x + y)) / 2 + y;
	},
	getCoords: function (z) {
		w = Math.floor((Math.sqrt(z * 8 + 1) - 1) / 2);

		t = ((w + 1) * w) / 2;

		y = z - t;

		x = w - y;

		const coords = [x, y];
		return coords;
	},
	/*
		pairing function = pi
		................................
		[[GRID TO ID]]
		pi(x,y) = z

		z = ( ((x+y+1)*(x+y)) /2 ) + y
		
		--------------------------------
		[[ID TO GRID]]
		w = floorDown(sqrt((z*8) + 1) - 1)  /2);

		t = ((w+1)*w)/2;

		y = z - t;

		x = w - y;

		................................
		Examples
			To calculate π(47, 32):

			x + y = 79,
			79 + 1 = 80,
			79 × 80 = 6320,
			6320 ÷ 2 = 3160,
			3160 + y = 3192,
			so π(47, 32) = 3192.

			To find x and y such that π(x, y) = 3192 = z:

			8 * z = 25 536,
			25 536 + 1 = 25 537,
			√25 537 = 159.799,
			159.799 - 1 = 158.799,
			159.799 / 2 = 79,8995,
			⌊79,8995⌋ = 79,
			-------
			w = 79;
			-------

			w + 1 = 80,
			w * 80 = 6 320,
			6 320 / 2 = 3160,
			----------
			t = 3 160;
			----------

			z - t = 32,
			----------
			y = 32;
			----------

			w - y = 78,
			----------
			x = 47;
			----------
	*/
};

function test(a) {
	console.log(a % 2);
}
