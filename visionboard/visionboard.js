const board = document.getElementById("board");
const addNoteBtn = document.getElementById("add-note");
const addImageBtn = document.getElementById("add-image");
const addQuoteBtn = document.getElementById("add-quote");
const saveBtn = document.getElementById("save-board");
const loadBtn = document.getElementById("load-board");
const clearBtn = document.getElementById("clear-board");
const savePdfBtn = document.getElementById('savePdfBtn');
const emailBtn = document.getElementById('emailBtn');
const emailModal = document.getElementById('emailModal');
const emailInput = document.getElementById('emailInput');
const sendEmailBtn = document.getElementById('sendEmailBtn');
const cancelEmailBtn = document.getElementById('cancelEmailBtn')

const colors = ["color1", "color2", "color3", "color4", "color5", "color6"];

const sampleImages = [
  "../slike/slika1.png",
  "../slike/slika2.png",
  "../slike/slika3.png",
  "../slike/slika4.png"
];

const sampleQuotes = [
  "Svaka dovoljno napredna tehnologija jednaka je magiji. —Arthur C. Clarke",
  "Tehnologija je riječ koja opisuje nešto što još ne funkcionira. - Douglas Adams",
  "Ne osnivate zajednice. Zajednice već postoje. Pitanje koje treba postaviti je kako im možete pomoći da budu bolje. — Mark Zuckerberg"
];

function makeDraggable(el) {
  let offsetX, offsetY;

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";
  el.appendChild(delBtn);


  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    el.remove();
  });

  el.addEventListener("mousedown", dragStart);

  function dragStart(e) {
    if (e.target === delBtn) return; 
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);
  }

  function drag(e) {
    e.preventDefault();
    el.style.left = e.clientX - offsetX + "px";
    el.style.top = e.clientY - offsetY + "px";
  }

  function dragEnd() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", dragEnd);
  }
}

addNoteBtn.addEventListener("click", () => {
  const note = document.createElement("div");
  note.className = "note " + colors[Math.floor(Math.random() * colors.length)];
  note.contentEditable = "true";
  note.style.left = Math.random() * 500 + "px";
  note.style.top = Math.random() * 300 + "px";
  note.textContent = "Napiši nešto..";
  makeDraggable(note);
  board.appendChild(note);
});

addImageBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "pinned-img";
  div.style.left = Math.random() * 400 + "px";
  div.style.top = Math.random() * 250 + "px";
  const img = document.createElement("img");
  img.src = sampleImages[Math.floor(Math.random() * sampleImages.length)];
  div.appendChild(img);
  makeDraggable(div);
  board.appendChild(div);
});

// ======= Dodaj citat =======
addQuoteBtn.addEventListener("click", () => {
  const q = document.createElement("div");
  q.className = "quote";
  q.textContent = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
  q.style.left = Math.random() * 400 + "px";
  q.style.top = Math.random() * 250 + "px";
  q.contentEditable = "true";
  makeDraggable(q);
  board.appendChild(q);
});

// ======= Snimi Visual Board =======
saveBtn.addEventListener("click", saveBoard);

function saveBoard() {
  const items = [];
  document.querySelectorAll("#board > div").forEach((el) => {
    const data = {
      type: el.classList.contains("note")
        ? "note"
        : el.classList.contains("quote")
        ? "quote"
        : "image",
      className: el.className,
      html: el.innerHTML,
      left: el.style.left,
      top: el.style.top,
    };
    items.push(data);
  });
  localStorage.setItem("visionBoardItems", JSON.stringify(items));
  alert("Board saved!");
}

// ======= Ucitaj Visual Board =======
function loadBoard() {
  const data = localStorage.getItem("visionBoardItems");
  if (!data) return;
  const items = JSON.parse(data);
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = item.className;
    div.style.left = item.left;
    div.style.top = item.top;
    div.innerHTML = item.html;
    if (item.type !== "image") div.contentEditable = "true";
    makeDraggable(div);
    board.appendChild(div);
  });
}
loadBoard();

// ======= Ocisti Visual Board =======
clearBtn.addEventListener("click", () => {
  if (confirm("Clear the board?")) {
    board.innerHTML = "";
    localStorage.removeItem("visionBoardItems");
  }
}); 

savePdfBtn.addEventListener('click', () => {
  html2canvas(document.getElementById('board')).then((canvas) => {
    const { jsPDF } = window.jspdf;
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = canvas.width;
    const pdfHeight = canvas.height;
    const pdf = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('visionboard.pdf');
  });
});


emailBtn.addEventListener('click', () => {
  emailModal.style.display = 'flex';  
  emailInput.value = '';
  emailInput.focus();
});

window.addEventListener('click', (e) => {
  if (e.target === emailModal) {
    emailModal.style.display = 'none';
  }
});


sendEmailBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  if (!validateEmail(email)) {
    alert('Unesite validnu email adresu!');
    return;
  }
  const subject = encodeURIComponent('Vision Board crtež');
  const body = encodeURIComponent('Pošalji whiteboard kao sliku (ručno priloži preuzetu PNG sliku)');
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
  emailModal.style.display = 'none';
});

cancelEmailBtn.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}