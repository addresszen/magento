var interval = setTimeout(function() {
  if (window.zenStart) {
    window.zenStart();
    clearInterval(interval);
  }
}, 1000);
