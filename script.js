"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const dogImg = document.querySelector(".dog-img"); // Corrected class name

const yesAudio = document.getElementById("yes-audio");
const noAudio = document.getElementById("no-audio");

const messages = [
  "No",
  "How about a coffee?",
  "I know a great spot!",
  "We could have a fun time!",
  "I promise it'll be enjoyable!",
  "Just one chance?",
];

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);
noButton.addEventListener("click", handleNoClick);

function handleYesClick() {
  noAudio.play(); // Play the "crying-no" audio
  yesAudio.play(); // Play the "chipi-yes" audio
  titleElement.innerHTML = "SEEEEEEEE YOOOOUUUUU!!!!!!";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
}

function handleNoClick() {
  if (play) {
    noAudio.play();
    noCount++;
    const imageIndex = noCount % messages.length; // Loop through the messages
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    moveNoButtonRandomly();
  }
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messageIndex = noCount % messages.length;
  return messages[messageIndex];
}

function changeImage(image) {
  dogImg.src = `./img/dog-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

function moveNoButtonRandomly() {
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  const maxX = containerRect.width - buttonRect.width;
  const maxY = containerRect.height - buttonRect.height;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noButton.style.position = 'absolute';
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}
