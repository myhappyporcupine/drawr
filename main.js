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

// Animatron - an animation particle containing deltas and duration
class Animatron {
	constructor(dx, dy, dr, start, end) {
		this.dx = dx;  // delta for x coordinate
		this.dy = dy;  // delta for y coordinate
		this.dr = dr;  // delta for rotation
		this.startFrame = start;
		this.endFrame = end;
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
		this.rotation = 0;

		this.strokeStyle = 'white'
		this.fillStyle = 'green';

		this.isClosed = false;
		this.isFilled = false;
		this.isStroked = true;
		this.isAnimated = false;

		this.animatrons = [];
		this.frameCounter = 0;
		this.frames = 100;
	}

	run() {
		// Update
		if (this.isAnimated) {
			for (const animatron of this.animatrons) {
				if (this.frameCounter >= animatron.startFrame
				    && this.frameCounter < animatron.endFrame) {
					this.anchor.x += animatron.dx;
					this.anchor.y += animatron.dy;
					this.rotation += animatron.dr;
				}
			}
		}

		// Draw
		if (this.points.length > 1) {
			ctx.save();
			ctx.translate(this.anchor.x, this.anchor.y);
			ctx.rotate(this.rotation);
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

		// Counter
		this.frameCounter++;
		if (this.frameCounter >= this.frames) {
			this.frameCounter = 0;
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

	pushAnimatron(dx, dy, dr, start, end) {
		const animatron = new Animatron(dx, dy, dr, start, end);
		this.animatrons.push(animatron);
		return animatron;
	}

	animate() {
		return this.isAnimated = true;
	}

	unanimate() {
		return this.isAnimated = false;
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
star.pushAnimatron(4, 2, 0.2, 20, 30);
star.pushAnimatron(-2, -1, -0.1, 50, 70);

// Drawing Loop
(function loop() {
	requestAnimationFrame(loop);
	ctx.clearRect(0, 0, canvas.width, canvas.height);  // background
	star.run();
})();
