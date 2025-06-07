let lyrics;
let keywordPositions = [];
let keywords = ["blood", "mind", "kill", "burn", "control", "machine", "error", "dark", "soul"];
let margin = 20;
let totalLines = 0;
let fontSize, lineHeight;

function preload() {
  lyrics = loadStrings("lyrics.txt");
}

function setup() {
  calculateFontAndHeight();

  // First pass: estimate required canvas height
  let x = margin;
  let y = 30;
  totalLines = 0;

  textFont('Courier');
  textSize(fontSize);

  for (let i = 0; i < lyrics.length; i++) {
    let words = lyrics[i].split(' ');

    for (let j = 0; j < words.length; j++) {
      let wordWidth = textWidth(words[j] + " ");

      if (x + wordWidth > windowWidth - margin) {
        x = margin;
        y += lineHeight;
        totalLines++;
      }

      x += wordWidth;
    }

    x = margin;
    y += lineHeight;
    totalLines++;
  }

  createCanvas(windowWidth, totalLines * lineHeight + 100);
  drawLyrics();
}

function drawLyrics() {
  background(255);
  fill(0);
  noStroke();
  textFont('Courier');
  textSize(fontSize);

  keywordPositions = [];

  let x = margin;
  let y = 30;

  for (let i = 0; i < lyrics.length; i++) {
    let words = lyrics[i].split(' ');

    for (let j = 0; j < words.length; j++) {
      let raw = words[j];
      let clean = raw.toLowerCase().replace(/[^a-z']/g, "");
      let wordWidth = textWidth(raw + " ");

      if (x + wordWidth > width - margin) {
        x = margin;
        y += lineHeight;
      }

      text(raw, x, y);

      if (keywords.includes(clean)) {
        keywordPositions.push({ word: clean, x: x, y: y });
      }

      x += wordWidth;
    }

    x = margin;
    y += lineHeight;
  }

  // Draw connecting lines
  stroke(200, 0, 0, 90);
  strokeWeight(0.8);

  for (let i = 0; i < keywordPositions.length - 1; i++) {
    for (let j = i + 1; j < keywordPositions.length; j++) {
      if (keywordPositions[i].word === keywordPositions[j].word) {
        line(keywordPositions[i].x, keywordPositions[i].y, keywordPositions[j].x, keywordPositions[j].y);
      }
    }
  }
}

function calculateFontAndHeight() {
  // Smaller text on smaller screens
  fontSize = windowWidth < 500 ? 11 : 14;
  lineHeight = fontSize + 8;
}

function windowResized() {
  resizeCanvas(1, 1); // prevent canvas flicker on mobile
  setup(); // reprocess layout
}
