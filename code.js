//checkers

let GameArea = {
	size: 10,

	renderGameArea: function () {},
};

class GamePiece {
	constructor(colour, x, y, id) {
		this.colour = colour;
		this.x = x;
		this.y = y;
		this.id = id;
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
