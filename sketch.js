let lyrics;
let keywordPositions = [];
let keywords = ["blood", "mind", "kill", "burn", "control", "machine", "error", "dark", "soul"];
let totalLines = 0;
let margin = 40;

function preload() {
  lyrics = loadStrings("lyrics.txt"); 
}

function setup() {
  textFont('Courier');
  textSize(14);

  //Estimate height based on wrapping at screen width
  let x = margin;
  let y = 30;

  for (let i = 0; i < lyrics.length; i++) {
    let words = lyrics[i].split(' ');

    for (let j = 0; j < words.length; j++) {
      let wordWidth = textWidth(words[j] + " ");

      if (x + wordWidth > windowWidth - margin) {
        x = margin;
        y += 22;
        totalLines++;
      }
      x += wordWidth;
    }

    x = margin;
    y += 22;
    totalLines++;
  }

  createCanvas(windowWidth, totalLines * 22 + 100);
  background(255);
  drawLyrics();
}

function drawLyrics() {
  background(255);
  fill(0);
  noStroke();
  textFont('Courier');
  textSize(14);

  let x = margin;
  let y = 30;

  for (let i = 0; i < lyrics.length; i++) {
    let words = lyrics[i].split(' ');

    for (let j = 0; j < words.length; j++) {
      let raw = words[j];
      let clean = raw.toLowerCase().replace(/[^a-z']/g, "");
      let wordWidth = textWidth(raw + " ");

      if (x + wordWidth > windowWidth - margin) {
        x = margin;
        y += 22;
      }

      text(raw, x, y);

      if (keywords.includes(clean)) {
        keywordPositions.push({ word: clean, x: x, y: y });
      }

      x += wordWidth;
    }

    x = margin;
    y += 22;
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
