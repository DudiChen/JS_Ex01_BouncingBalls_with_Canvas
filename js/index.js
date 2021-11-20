
// Set global variable i.e. "g_state" to be the canvas element
const g_state = document.getElementById("canvas");

function BouncingBall(radius, fill_color, x_location, y_location, x_velocity, y_velocity) {
    this.radius = radius;
    this.fill_color = fill_color;
    this.x = x_location;
    this.y = y_location;
    this.x_velocity = x_velocity;
    this.y_velocity = y_velocity;
}
BouncingBall.prototype = new BouncingBall();

BouncingBall.prototype.draw = function() {
    const context = g_state.getContext('2d');
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.fill_color;
    // context.strokeStyle = 'black';
    context.fill();
    context.stroke();
}

BouncingBall.prototype.move = function() {
    if (this.x  + this.radius > g_state.width || this.x - this.radius - 1 < 0) {
        this.x_velocity = -1 * this.x_velocity;
    }
    
    if (this.y + this.radius > g_state.height || this.y - this.radius - 1 < 0) {
        this.y_velocity = -1 * this.y_velocity;
    }

    this.x += this.x_velocity;
    this.y += this.y_velocity;
}

const getRandomVelocity = function() { return getRandomValueInRange(1, 11); }
const getRandomRadius = function () { return getRandomValueInRange(20, 80); }

const getRandomValueInRange = function(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

function allMove() {
    const ballList = [];
    for (let i = 0; i < 4 ; i++) {
        const rad = getRandomRadius();
        let color;
        let x;
        let y;
        const x_vel = getRandomVelocity();
        const y_vel = getRandomVelocity();
        switch(i)
        {
            case 0:
                color = 'blue';
                x = getRandomValueInRange(rad + 1, innerWidth - rad - 1);
                y = rad + 1;
                break;
            case 1:
                color = 'green';
                x = innerWidth - (rad + 1)
                y = getRandomValueInRange(rad + 1, innerHeight - rad - 1);
                break;
            case 2:
                color = 'yellow';
                x = getRandomValueInRange(rad + 1, innerWidth - 1)
                y = innerHeight - (rad + 1);
                break;
            case 3:
                color = 'red';
                x = rad + 1;
                y = getRandomValueInRange(rad + 1, innerHeight - rad - 1);
                break;
            default:
                break;
        }
        
        ballList[i] = new BouncingBall(rad, color, x, y, x_vel, y_vel);
    }

    return ballList;
}

function animate(ballList) {
    requestAnimationFrame(animate.bind(null, ballList));
    const context = g_state.getContext('2d');
    context.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < 4; i++) {
        ballList[i].draw();
        ballList[i].move();
    }

}


// const button = document.getElementById('btn1');
// console.log(button)
// button.addEventListener('click', allMove)

// console.log(ballList)
g_state.width = window.innerWidth;
g_state.height = window.innerHeight;
const ballList = allMove();
animate(ballList);

// TESTING:
// const context = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// context.beginPath()
// context.arc(30, 30, 30, 0, Math.PI * 2, false);
// context.fillStyle = 'green';
// context.strokeStyle = 'black';
// context.stroke()
// context.fill();