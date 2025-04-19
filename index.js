const okButton = document.querySelector(".ok-btn");
const playButton = document.querySelector(".play-btn");
const container = document.querySelector(".container");
const userInput = document.querySelector(".user-input");
const userInfo = document.querySelector(".user-info");
const playForm = document.querySelector(".play-form");
const guessForm = document.querySelector(".guess-form");
const guessNumber = document.querySelector(".guess-number");
const card = document.querySelector(".card");
const playSect = document.querySelector(".play-section");
const maxInput = document.querySelector(".max");
const minInput = document.querySelector(".min");
const guessInput = document.querySelector(".guess-input");
const userName = document.querySelector(".user-name");
const minimum = document.querySelector(".minimum");
const maximum = document.querySelector(".maximum");
const message = document.querySelector(".message");
const submitBtn = document.querySelector(".submit-btn");
const warnning = document.querySelector(".alert");

let minNumber = 1,
  max = 12,
  winningNumber = 2,
  min = 1,
  guessLeft = 5;
maximum.textContent = max;
minimum.textContent = min;

// guessForm.addEventListener("mousedown", function (e) {
//   e.preventDefault();
//   if (e.target.className === "submit-btn") {
//     guessInput.reload();
//   }
// });

function action(e) {
  let val = userInput.value.trim();
  e.preventDefault();
  if (val == "") {
    warnning.classList.add("error");
    warnning.innerHTML = "please enter your username";
    setTimeout(() => {
      warnning.classList.remove("error");
      warnning.innerHTML = "";
    }, 3000);
    return;
  } else {
    card.style.display = "none";
    playSect.style.display = "block";
    userName.textContent += " " + val;
  }
}
userName.textContent += " " + userInput.value;
function play(e) {
  e.preventDefault();

  const minNum = parseInt(minInput.value);
  const maxNum = parseInt(maxInput.value);

  if (maxNum - minNum === 10 || maxNum - minNum > 10) {
    playSect.style.display = "none";
    guessForm.style.display = "block";
  } else {
    warnning.classList.add("error");
    warnning.innerHTML =
      "the difference between your max and min should be atleast 10";
    setTimeout(() => {
      warnning.classList.remove("error");
      warnning.innerHTML = "";
    }, 3000);
    minInput.value = "";
    maxInput.value = "";
    return;
    ("");
  }
}
function onSubmit(e) {
  e.preventDefault();
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess > max || guess < min) {
    setMessage(`please enter a number between ${min} and ${max}`, "red");
    return;
  }

  if (guess === winningNumber) {
    gameOver(true, `${winningNumber} is correct bravo`);
    return;
  } else {
    guessLeft -= 1;
  }

  if (guessLeft === 0) {
    gameOver(
      false,
      `game over,(you have exhausted your trials ${userInput.value},${winningNumber} is the winning game)`
    );
  } else {
    guessInput.value = "";
    setMessage(
      `${guess} is not correct, you have ${guessLeft} guesses left`,
      "red"
    );
  }
  function gameOver(won, msg) {
    let color;
    won === true ? (color = "green") : (color = "red");
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);
    submitBtn.value = "PLAY AGAIN";
  }

  function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
  }
}

guessForm.addEventListener("submit", onSubmit);
playButton.addEventListener("click", play);
okButton.addEventListener("click", action);
