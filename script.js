const circleEl = document.querySelector("#circle");

let isMoving = false;

const mousePosition = {
  x: 0,
  y: 0,
};

let mouseStopTimer;

const updateUI = () => {
  if (isMoving) {
    circleEl.classList.add("is-moving");
  } else {
    circleEl.classList.remove("is-moving");
  }

  circleEl.style.top = `${mousePosition.y}px`;
  circleEl.style.left = `${mousePosition.x}px`;
};

const handleMouseMove = (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
  isMoving = true;
  updateUI();

  clearTimeout(mouseStopTimer);
  mouseStopTimer = setTimeout(handleMouseStop, 100);
};

const handleMouseStop = () => {
  isMoving = false;
  updateUI();
};

window.addEventListener("mousemove", handleMouseMove);
