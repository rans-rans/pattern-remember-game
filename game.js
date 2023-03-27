const colors = ["blue", "green", "red", "yellow"];
var levelKeys = [];
var keysShowing = false;
var level = 0;

$("body").keypress(function (e) {
  gameStart = true;
  const key = String.fromCharCode(e.which);
  const isA = key == "a"
  if (isA) {
    if (keysShowing == true) return;
    changeLevel();
    showLevelKeys();
  }
});

$(".btn").click(function (e) {
  if (keysShowing == true) return;
  var name = $(this).attr("id");

  if (name == levelKeys[0]) {
    playSound(name);
    levelKeys.shift()
    if (levelKeys.length == 0) {
      changeLevel();
      showLevelKeys();
      return;
    }
  } else {
    playSound("wrong");
    $("#level-title").text("Game over. Reload to restart");
    $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
  }
});

function changeLevel() {
    level = level + 1;
  $("#level-title").text("level " + level);
}

async function showLevelKeys() {
  keysShowing = true;
  levelKeys = [];
  await delay(1500);
  for (let index = 0; index < level; index++) {
    const rand = Math.floor(Math.random() * 4);
    const chosen = colors[rand];
    levelKeys.push(chosen);
  }
  console.log(levelKeys.length);
  for (let index = 0; index < levelKeys.length; index++) {
    playSound(levelKeys[index]);
    animatePress(levelKeys[index]);
    await delay(900);
  }
  keysShowing = false;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function playSound(name) {
  const sound = name + ".mp3"
  const audio = new Audio("sounds/" + sound);
  audio.play();
  animatePress(name);
}

function animatePress(id) {
  $("#" + id).addClass("pressed");
  setTimeout(function () { $("#" + id).removeClass("pressed"); }, 500);
}