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

// Показать модальное окно
function showModal() {
  timeModalEl.classList.add("show");
  timeModalEl.style.display = "block";
  document.body.classList.add("modal-open");
  
  // Добавить backdrop
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop fade show";
  backdrop.id = "modalBackdrop";
  document.body.appendChild(backdrop);
  
  tick(); // Показать время сразу
  
  // Запустить обновление каждую секунду
  if (intervalId === null) {
    intervalId = window.setInterval(tick, 1000);
  }
}

// Скрыть модальное окно
function hideModal() {
  timeModalEl.classList.remove("show");
  timeModalEl.style.display = "none";
  document.body.classList.remove("modal-open");
  
  // Удалить backdrop
  const backdrop = document.getElementById("modalBackdrop");
  if (backdrop) {
    backdrop.remove();
  }
  
  // Остановить обновление
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Показать модальное окно при клике на кнопку
showTimeBtnEl.addEventListener("click", showModal);

// Закрыть модальное окно через кнопки закрытия
const closeBtns = timeModalEl.querySelectorAll("[data-bs-dismiss='modal']");
closeBtns.forEach(btn => {
  btn.addEventListener("click", hideModal);
});

// Закрыть при клике на backdrop
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.id === "modalBackdrop") {
    hideModal();
  }
});