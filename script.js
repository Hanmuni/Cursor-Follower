const circleEl = document.querySelector("#circle");

let isMoving = false;
const IDLE_TIMEOUT = 100;

const mousePosition = {
  x: 0,
  y: 0,
};

let mouseStopTimer;
let frameRequested = false;

const updateUI = () => {
  frameRequested = false;
  if (isMoving) {
    circleEl.style.transform = `translate(calc(${mousePosition.x}px - 50%), calc(${mousePosition.y}px - 50%)) scale(1.5)`;
  } else {
    circleEl.style.transform = `translate(calc(${mousePosition.x}px - 50%), calc(${mousePosition.y}px - 50%))`;
  }
};

const handleMouseMove = (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
  isMoving = true;
  if (!frameRequested) {
    frameRequested = true;
    requestAnimationFrame(updateUI);
  }

  clearTimeout(mouseStopTimer);
  mouseStopTimer = setTimeout(handleMouseStop, IDLE_TIMEOUT);
};

const handleMouseStop = () => {
  isMoving = false;
  requestAnimationFrame(updateUI);
};

window.addEventListener("mousemove", handleMouseMove);
