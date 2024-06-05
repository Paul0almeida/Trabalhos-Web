const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const netWidth = 4;
const netHeight = canvas.height;

const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 5;

const ballRadius = 10;

const user = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'WHITE',
    score: 0
};

const computer = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'WHITE',
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'WHITE'
};

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text, x, y);
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(canvas.width / 2 - netWidth / 2, i, netWidth, 10, 'WHITE');
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
    ball.velocityY = 5 * (Math.random() > 0.5 ? 1 : -1);
}

canvas.addEventListener("mousemove", movePaddle);

function movePaddle(event) {
    let rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height / 2;
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function update() {
    if (ball.x - ball.radius < 0) {
        computer.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    computer.y += (ball.y - (computer.y + computer.height / 2)) * 0.1;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width / 2) ? user : computer;

    if (collision(ball, player)) {
        let collidePoint = ball.y - (player.y + player.height / 2);
        collidePoint = collidePoint / (player.height / 2);

        let angleRad = collidePoint * (Math.PI / 4);

        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.5;
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, 'BLACK');

    drawNet();

    drawText(user.score, canvas.width / 4, canvas.height / 5, 'WHITE');
    drawText(computer.score, 3 * canvas.width / 4, canvas.height / 5, 'WHITE');

    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);

    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update();
    render();
}

const framePerSecond = 50;
setInterval(game, 1000 / framePerSecond);
