import { DateTime } from "luxon";

const FORMAT = "dd.LL.y HH:mm:ss";

const clockEl = document.getElementById("clock") as HTMLHeadingElement;
const showTimeBtnEl = document.getElementById("showTimeBtn") as HTMLButtonElement;
const timeModalEl = document.getElementById("timeModal") as HTMLElement;

let intervalId: number | null = null;

function tick() {
  const now = DateTime.now();
  clockEl.textContent = now.toFormat(FORMAT);
}

function showModal() {
  timeModalEl.classList.add("show");
  timeModalEl.style.display = "block";
  document.body.classList.add("modal-open");
  
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop fade show";
  backdrop.id = "modalBackdrop";
  document.body.appendChild(backdrop);
  
  tick();
  
  if (intervalId === null) {
    intervalId = window.setInterval(tick, 1000);
  }
}

function hideModal() {
  timeModalEl.classList.remove("show");
  timeModalEl.style.display = "none";
  document.body.classList.remove("modal-open");
  
  const backdrop = document.getElementById("modalBackdrop");
  if (backdrop) {
    backdrop.remove();
  }
  
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

showTimeBtnEl.addEventListener("click", showModal);

const closeBtns = timeModalEl.querySelectorAll("[data-bs-dismiss='modal']");
closeBtns.forEach(btn => {
  btn.addEventListener("click", hideModal);
});