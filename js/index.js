let x = 0;
let img;
let img2;
let hei = window.innerHeight
let num = 500
let j = 0;
let r = [];
let score = 0;
let gameOver = document.getElementById("gameOver")
let Score = document.getElementById("score")
gameOver.style.display = 'none';
for (let i = 0; i <= 500; i++) {
    r[i] = Math.floor(Math.random() * 300);
}

function preload() {
    img = loadImage('img/bird.png');
    img2 = loadImage('img/pillar.png');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    imageMode(CENTER); // Set image mode to draw from its center
}

function draw() {
    let color1 = color(0, 173, 255); // Red color
    let color2 = color(0, 124, 49); // Blue color
    setGradient(0, 0, width, height, color1, color2)
    drawPillars(num + 50, 0, 60, 500);
    
    // if (mouseIsPressed) {
    if (keyIsPressed) {
        keyPressed();
    } else {
        out(hei / 2);
    }
    // ellipse(mouseX, mouseY, 5, 5);
    // Draw the image within the ellipse
    image(img, width / 2, hei / 2, 30, 30);
    let he = random(50, 200);
    // rect(10,10, 25, he);
    hei += 2;
    num -= 1.5;
}

function keyPressed() {
    if (keyCode === 32) {
        hei -= 7;
    }
}

function setGradient(x, y, w, h, c1, c2) {
    noFill();
    for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let gradientColor = lerpColor(c1, c2, inter);
        stroke(gradientColor);
        line(x, i, x + w, i);
    }
}

function drawPillars(x, y, w, h) {
    gap = 100;
    let numberOfPillars = 100; // Number of pillars to draw
    let pillarWidth = w; // Calculate the width of each pillar
    // console.log(hei);
    for (let i = 0; i < numberOfPillars; i++) {
        let pillarX = x + i * (pillarWidth + gap); // Calculate x position for each pillar
        // fill(100)
        // rect(pillarX, y, pillarWidth, h + r[i]); // Draw each pillar
        image(img2, pillarX, y, pillarWidth, h + r[i]); // Draw each pillar
        // if (hei - 15 <= h+r[i] && pillarX == width / 2 + 45 || pillarX == width / 2 - 35 && hei - 15 <= h+r[i] || pillarX == width / 2 && hei + 15 <= h+r[i]) {
        if (hei - 15 <= h + r[i] || hei + 15 <= h + r[i]) {
            if (pillarX >= width / 2 - 45 && pillarX <= width / 2 + 45) {
                // console.log("Game Over")
                gameOver.style.display = "block";
                Score.innerHTML += score;
                noLoop();
            }
        }
    }
        score += 1;
        // console.log(score);
}

function out(hei) {
    if (hei >= window.innerHeight - 15) {
        // console.log("Game Over")
        gameOver.style.display = "block";
        Score.innerHTML += score;
        noLoop();
    }
}
