import "../app.js";

const music = document.getElementById("background_music");

function playAudio() {
  music.play();
}

function pauseAudio() {
  music.pause();
}

$(".music-control").on("click", function () {
  const music = $(this).hasClass("off");

  if (music) {
    playAudio();

    $(this).removeClass("off");
    $(".sound-off").hide();
    $(".sound-on").show();
  } else {
    pauseAudio();

    $(this).addClass("off");
    $(".sound-off").show();
    $(".sound-on").hide();
  }
});

$("#okay").on("click", function () {
  $("#id02").hide();
  playAudio();
  $(".music-control").show().removeClass("off");
  $(".sound-off").hide();
  $(".sound-on").show();
});
