var audio;

// Hide Pause Button

$("#pause").hide();

// Initialize Audio first song

initaudio($("#playlist li:first-child"));

// Initializer Function

function initaudio(element) {
  //Element is song!
  var song = element.attr("song");
  var title = element.text();
  var cover = element.attr("cover");
  var artist = element.attr("artist");

  // Create Audio Object

  audio = new Audio("../media/" + song);

  if (!audio.currentTime) {
    // If song isnt start duration is 0.00
    $("#duration").html("0.00");
  }

  $("#audio-player.title").text(title);
  $("#audio-player.artist").text(artist);

  // Inser Cover image
  $("img.cover").attr("src", "../img/covers/" + cover);

  $("#playlist li").removeClass("active");
  element.addClass("active");
}

// Play Button
$("#play").click(function() {
  // We grab song from API, named audio, before few lines!
  audio.play();
  $("#play").hide();
  $("#pause").show();
  $("#duration").fadeIn(400);
  showDuration();
});
// Pause Button
$("#pause").click(function() {
  audio.pause();
  $("#play").show();
  $("#pause").hide();
});

// Stop Buttion
$("#stop").click(function() {
  // We grab song from API, named audio, before few lines!
  audio.pause();
  audio.currentTime = 0;
  $("#play").show();
  $("#pause").hide();
  $("#duration").fadeOut(400);
});

// Next Buttion
$("#next").click(function() {
  // We grab song from API, named audio, before few lines!
  audio.pause();
  var next = $("#playlist li.active").next();
  if (next.length == 0) {
    next = $("#playlist li:first-child");
  }
  if ($("#play").is(":visible")) {
    $("#play").hide();
    $("#pause").show();
  }
  initaudio(next);
  audio.play();
  showDuration();
});

// Prev Buttion
$("#prev").click(function() {
  // We grab song from API, named audio, before few lines!
  audio.pause();
  var prev = $("#playlist li.active").prev();
  if (prev.length == 0) {
    prev = $("#playlist li:last-child");
  }
  if ($("#play").is(":visible")) {
    $("#play").hide();
    $("#pause").show();
  }
  initaudio(prev);
  audio.play();
  showDuration();
});
// Volume Control
$("#volume").change(function() {
  audio.volume = parseFloat(this.value / 10);
});

// Time Duration
function showDuration() {
  $(audio).bind("timeupdate", function() {
    // Get Hours & Minutes
    var s = parseInt(audio.currentTime % 60);
    var m = parseInt(audio.currentTime / 60) % 60;

    // Add 0 if less than 10
    if (s < 10) {
      s = "0" + s;
    }

    $("#duration").html(m + "." + s);
    var value = 0;
    if (audio.currentTime > 0) {
      value = Math.floor((100 / audio.duration) * audio.currentTime);
    }
    $("#progress").css("width", value + "%");
  });
}

//After song ends play next song
$(audio).on("ended", function() {
  audio.pause();
  var next = $("#playlist li.active").next();
  if (next.length == 0) {
    next = $("#playlist li:first-child");
  }
  initAudio(next);
  audio.play();
  showDuration();
});

// Timeline jumper
$("#progressBar").mouseup(function(e) {
  var leftOffset = e.pageX - $(this).offset().left;
  var songPercents = leftOffset / $("#progressBar").width();
  audio.currentTime = parseFloat(songPercents * audio.duration);
});

//CLICK ON SONG
$("#playlist li").click(function() {
  audio.pause();
  initaudio($(this));
  audio.play();
  showDuration;
  $("#play").hide();
  $("#pause").show();
});
