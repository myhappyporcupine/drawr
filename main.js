// Canvas Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Point
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

// Thing
class Thing {
	constructor(x, y) {
		this.anchor = new Point(x, y);
		this.points = [
			new Point(   0, -100),
			new Point(  50,  -50),
			new Point( 100,  -50),
			new Point(  50,    0),
			new Point( 100,  100),
			new Point(   0,   50),
			new Point(-100,  100),
			new Point( -50,    0),
			new Point(-100,  -50),
			new Point( -50,  -50)
		];

		this.strokeStyle = 'white'
		this.fillStyle = 'green';

		this.isClosed = false;
		this.isFilled = false;
		this.isStroked = true;
	}

	draw() {
		if (this.points.length > 1) {
			ctx.save();
			ctx.translate(this.anchor.x, this.anchor.y);
			ctx.beginPath();
			ctx.moveTo(this.points[0].x, this.points[0].y);
			for (let i = 1; i < this.points.length; i++) {
				ctx.lineTo(this.points[i].x, this.points[i].y);
			}
			if (this.isClosed) {
				ctx.closePath();
			}
			if (this.isFilled) {
				ctx.fillStyle = this.fillStyle;
				ctx.fill();
			}
			if (this.isStroked) {
				ctx.strokeStyle = this.strokeStyle;
				ctx.stroke();
			}
			ctx.restore();
		}
	}

	push(x, y) {
		const point = new Point(x, y);
		this.points.push(point);
		return point;
	}

	pop() {
		return this.points.pop();
	}

	close() {
		return this.isClosed = true;
	}

	unclose() {
		return this.isClosed = false;
	}

	fill() {
		return this.isFilled = true;
	}

	unfill() {
		return this.isFilled = false;
	}

	stroke() {
		return this.isStroked = true;
	}

	unstroke() {
		return this.isStroked = false;
	}
}

// Setup
const star = new Thing(400, 300);

// Drawing Loop
(function loop() {
	requestAnimationFrame(loop);
	ctx.clearRect(0, 0, canvas.width, canvas.height);  // background
	star.draw();
})();
