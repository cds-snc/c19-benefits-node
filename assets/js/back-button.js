var backLinkContainer = document.getElementsByClassName('back-button-container')[0];

if (backLinkContainer) {
  backLinkContainer.className = backLinkContainer.className.replace(/\bno-js\b/g, "");
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('backButton') && document.getElementById('backButton').addEventListener('click', function () {
    window.history.go(-1);
  }, true)
}, false);