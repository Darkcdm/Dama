//checkers

let Game = {
	windowSize: window.innerWidth,
	cellSize: this.windowSize / this.boardSize,
	boardSize: 8,
	pieces: [],
	area: document.createElement("div"),
	board: document.createElement("table"),
	selectedPiece: [],

	load: function () {
		this.setBoard();
		this.renderBoard();
	},
	renderBoard: function () {
		this.removeOldArea();

		for (let y = 0; y < this.boardSize; y++) {
			let row = document.createElement("tr");
			for (let x = 0; x < this.boardSize; x++) {
				let cell = document.createElement("td");
				let img = document.createElement("img");
				let piece;
				for (i = 0; i < this.pieces.length; i++) {
					if (this.pieces[i].id == Pairing.getID(x, y)) {
						piece = this.pieces[i];
						break;
					}
				}
				img.onclick = function (img) {
					Game.selectedPiece = piece;
					if (piece) {
						piece.showPossibleMoves();
					}
					if (!this.occupied && Game.selectedPiece != null) {
						Game.selectedPiece.movePiece(this.id);
					}
				};

				img.id = Pairing.getID(x, y);
				src = this.decideCellSrc(x, y, piece);
				img.src = src;
				if (
					src == "img/BlackSqrWithBlue.png" ||
					src == "img/BlackSqrWithRed.png"
				) {
					img.occupied = true;
				} else {
					img.occupied = false;
				}
				cell.appendChild(img);
				row.appendChild(cell);
			}
			this.board.appendChild(row);
			this.board.id = "board";
		}
		this.area.appendChild(this.board);
		this.area.id = "area";
		document.getElementById("body").appendChild(this.area);
	},
	setBoard: function () {
		//set red
		for (y = 0; y < 3; y++) {
			for (x = 0; x < this.boardSize; x++) {
				if (y == 0 && x % 2 == 1) {
					let piece = new GamePiece("RED", x, y, Pairing.getID(x, y));
					this.pieces.push(piece);
				} else if (y == 1 && x % 2 == 0) {
					let piece = new GamePiece("RED", x, y, Pairing.getID(x, y));
					this.pieces.push(piece);
				} else if (y == 2 && x % 2 == 1) {
					let piece = new GamePiece("RED", x, y, Pairing.getID(x, y));
					this.pieces.push(piece);
				}
			}
		}

		//set blue
		for (y = 5; y < 8; y++) {
			for (x = 0; x < this.boardSize; x++) {
				if (y == 5 && x % 2 == 0) {
					let piece = new GamePiece("BLUE", x, y, Pairing.getID(x, y));
					this.pieces.push(piece);
				} else if (y == 6 && x % 2 == 1) {
					let piece = new GamePiece("BLUE", x, y, Pairing.getID(x, y));
					this.pieces.push(piece);
				} else if (y == 7 && x % 2 == 0) {
					let piece = new GamePiece("BLUE", x, y, Pairing.getID(x, y));
					this.pieces.push(piece);
				}
			}
		}
		return this.pieces;
	},
	removeOldArea: function () {
		while (this.area.firstChild) {
			this.removeAllChildrenRecursively(this.area.firstChild);
		}
	},
	removeAllChildrenRecursively: function (parent) {
		if (parent.firstChild.firstChild != null) {
			this.removeAllChildrenRecursively(parent.firstChild.firstChild);
		} else {
			while (parent.firstChild) {
				parent.removeChild(parent.firstChild);
			}
			parent.remove();
		}
	},
	decideCellSrc: function (x, y, piece) {
		if (x % 2 == 0) {
			if (y % 2 == 0) {
				if (piece) {
					if (piece.colour == "RED") {
						return "img/WhiteSqrWithRed.png";
					} else {
						return "img/WhiteSqrWithBlue.png";
					}
				}
				return "img/WhiteSqr.png";
			} else {
				if (piece) {
					if (piece.colour == "RED") {
						return "img/BlackSqrWithRed.png";
					} else {
						return "img/BlackSqrWithBlue.png";
					}
				}
				return "img/BlackSqr.png";
			}
		} else {
			if (y % 2 == 1) {
				if (piece) {
					if (piece.colour == "RED") {
						return "img/WhiteSqrWithRed.png";
					} else {
						return "img/WhiteSqrWithBlue.png";
					}
				}
				return "img/WhiteSqr.png";
			} else {
				if (piece) {
					if (piece.colour == "RED") {
						return "img/BlackSqrWithRed.png";
					} else {
						return "img/BlackSqrWithBlue.png";
					}
				}
				return "img/BlackSqr.png";
			}
		}
	},
};

class GamePiece {
	constructor(colour, x, y, id) {
		this.colour = colour;
		this.x = x;
		this.y = y;
		this.id = id;
	}
	showPossibleMoves() {
		if (this != Game.selectedPiece) {
			Game.renderBoard();
		}

		console.log(this);
		if (this.colour == "RED") {
			this.checkDown();
		} else {
			this.checkUp();
		}
	}
	movePiece() {
		console.log("moving a piece");
	}
	checkUp() {
		x = this.x;
		y = this.y;

		var img = document.getElementById(Pairing.getID(x - 1, y - 1));

		if (img.occupied == false) {
			img.src = "img/GreenSqr.png";
		}
		var img = document.getElementById(Pairing.getID(x + 1, y - 1));
		if (img.occupied == false) {
			img.src = "img/GreenSqr.png";
		}
	}
	checkDown() {
		x = this.x;
		y = this.y;

		var img = document.getElementById(Pairing.getID(x - 1, y + 1));

		if (img.occupied == false) {
			img.src = "img/GreenSqr.png";
		}
		var img = document.getElementById(Pairing.getID(x + 1, y + 1));
		if (img.occupied == false) {
			img.src = "img/GreenSqr.png";
		}
	}
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
			To calculate ??(47, 32):

			x + y = 79,
			79 + 1 = 80,
			79 ?? 80 = 6320,
			6320 ?? 2 = 3160,
			3160 + y = 3192,
			so ??(47, 32) = 3192.

			To find x and y such that ??(x, y) = 3192 = z:

			8 * z = 25??536,
			25??536 + 1 = 25??537,
			???25 537 = 159.799,
			159.799 - 1 = 158.799,
			159.799 / 2 = 79,8995,
			???79,8995??? = 79,
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
	if (a > 0) {
		a--;
		console.log(a);
		test(a);
	} else {
		return a;
	}
}
