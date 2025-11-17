// Dodaj zadatak
const modal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");
const savePdfBtn = document.getElementById('savePdfBtn');
const emailBtn = document.getElementById('emailBtn');
const emailModal = document.getElementById('emailModal');
const emailInput = document.getElementById('emailInput');
const sendEmailBtn = document.getElementById('sendEmailBtn');
const cancelEmailBtn = document.getElementById('cancelEmailBtn');

document.getElementById("addTaskBtn").addEventListener("click", () => {
    modal.style.display = "block";
    taskInput.value = "";
    taskInput.focus();
});

// Handle modal buttons
document.getElementById("modalAdd").addEventListener("click", () => {
    let text = taskInput.value.trim();
    if (text === "") return;

    const task = createTask(text);
    document.querySelector('[data-status="todo"] .taskList').appendChild(task);

    modal.style.display = "none";
});

document.getElementById("modalCancel").addEventListener("click", () => {
    modal.style.display = "none";
});


// Kreiraj novi zadatak
function createTask(text) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = text;

    task.draggable = true;

    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    });

    return task;
}

// Handle Drag & Drop
document.querySelectorAll(".taskList").forEach(list => {
    list.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        list.appendChild(dragging);
    });
});

// Ocisti plocu
const clearModal = document.getElementById("clearModal");

document.getElementById("clearBoardBtn").addEventListener("click", () => {
    clearModal.style.display = "block";
});

document.getElementById("clearYes").addEventListener("click", () => {
    document.querySelectorAll(".taskList").forEach(list => list.innerHTML = "");
    clearModal.style.display = "none";
});

// â€œNE â€“ Cancelâ€ button
document.getElementById("clearNo").addEventListener("click", () => {
    clearModal.style.display = "none";
});

// Zatvori van modala
window.addEventListener("click", e => {
    if (e.target === clearModal) {
        clearModal.style.display = "none";
    }
});

// Snimi plocu kao PNG
document.getElementById("saveBoardBtn").addEventListener("click", () => {
    html2canvas(document.body).then(canvas => {
        const link = document.createElement("a");
        link.download = "kanban_board.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Ucitaj html2canvas dynamically
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.body.appendChild(script);

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


savePdfBtn.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('portrait', 'pt', 'a4');
  html2canvas(document.querySelector('.board')).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('kanban_board.pdf');
  });
});

emailBtn.addEventListener('click', () => {
  emailModal.style.display = 'block';
  emailInput.value = '';
  emailInput.focus();
});

sendEmailBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  if (!validateEmail(email)) {
    alert('Molimo unesite validnu email adresu!');
    return;
  }

  const mailtoLink = `mailto:${email}?subject=Kanban ploča&body=Molimo priložite vaš skinuti Kanban PDF kao privitak.`;
  window.open(mailtoLink, '_blank');

  emailModal.style.display = 'none';
});

cancelEmailBtn.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === emailModal) {
    emailModal.style.display = 'none';
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}