window.chrome.runtime.onMessage.addListener(function (request) {
  let vid = document.getElementsByTagName("video")[0];

  if (request.action === "play") {
    vid.play();
  } else if (request.action === "pause") {
    vid.pause();
  } else if (request.action === "restart") {
    vid.currentTime = 0;
  } else if (request.action === "volume_up") {
    vid.volume += 0.1;
  } else if (request.action === "volume_down") {
    vid.volume -= 0.1;
  } else if (request.action === "fullscreen") {
    vid.requestFullscreen();
  } else if (request.action === "exit_fullscreen") {
    document.exitFullscreen();
  } else if (request.action === "forward") {
    if (!isNaN(vid.duration)) {
      vid.currentTime = Math.min(vid.duration, vid.currentTime + 10);
    }
  } else if (request.action === "backward") {
    vid.currentTime = Math.max(0, vid.currentTime - 10);
  }
});
