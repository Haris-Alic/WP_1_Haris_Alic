const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const sizeValue = document.getElementById('sizeValue');
const drawBtn = document.getElementById('drawBtn');
const eraseBtn = document.getElementById('eraseBtn');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');
const savePdfBtn = document.getElementById('savePdfBtn');
const emailBtn = document.getElementById('emailBtn');
const emailModal = document.getElementById('emailModal');
const emailInput = document.getElementById('emailInput');
const sendEmailBtn = document.getElementById('sendEmailBtn');
const cancelEmailBtn = document.getElementById('cancelEmailBtn');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

ctx.strokeStyle = '#000000';
ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.globalCompositeOperation = 'source-over';
});

brushSize.addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
    sizeValue.textContent = e.target.value;
});

drawBtn.addEventListener('click', () => {
    ctx.strokeStyle = colorPicker.value;
    ctx.globalCompositeOperation = 'source-over';
});

eraseBtn.addEventListener('click', () => {
    ctx.globalCompositeOperation = 'destination-out';
});

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

savePdfBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('l', 'px', [canvas.width, canvas.height]);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('whiteboard.pdf');
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    
    const elementRelativeX = e.clientX - rect.left;
    const elementRelativeY = e.clientY - rect.top;
    lastX = elementRelativeX * canvas.width / rect.width;
    lastY = elementRelativeY * canvas.height / rect.height;
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    
    const elementRelativeX = e.clientX - rect.left;
    const elementRelativeY = e.clientY - rect.top;
    const currentX = elementRelativeX * canvas.width / rect.width;
    const currentY = elementRelativeY * canvas.height / rect.height;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    
    lastX = currentX;
    lastY = currentY;
}

function stopDrawing() {
    isDrawing = false;
}

canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', stopDrawing);

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    
    const elementRelativeX = touch.clientX - rect.left;
    const elementRelativeY = touch.clientY - rect.top;
    lastX = elementRelativeX * canvas.width / rect.width;
    lastY = elementRelativeY * canvas.height / rect.height;
    
    isDrawing = true;
}

function handleTouchMove(e) {
    if (!isDrawing) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    
    const elementRelativeX = touch.clientX - rect.left;
    const elementRelativeY = touch.clientY - rect.top;
    const currentX = elementRelativeX * canvas.width / rect.width;
    const currentY = elementRelativeY * canvas.height / rect.height;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    
    lastX = currentX;
    lastY = currentY;
}

emailBtn.addEventListener('click', () => {
  emailModal.style.display = 'flex';  // ili 'block' ako nema flex stilove
  emailInput.value = '';
  emailInput.focus();
});

// Poništi i zatvori modal
cancelEmailBtn.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

// Klik van modala sakriva modal
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

  const imageData = canvas.toDataURL('image/png');
  const subject = encodeURIComponent('Whiteboard crtež');
  const body = encodeURIComponent(
    'Poštovani,\n\nPrilažem Whiteboard crtež kao sliku.\n\n' +
    'Napomena: zbog ograničenja mailto metode, molim vas da slikovno prilog preuzmete sa stranice.\n\n'
  );

  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');

  emailModal.style.display = 'none';
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
