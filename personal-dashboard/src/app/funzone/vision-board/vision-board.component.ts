import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface BoardItem {
  type: 'note' | 'quote' | 'image';
  className: string;
  html: string;
  left: string;
  top: string;
}

@Component({
  selector: 'app-vision-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vision-board.component.html',
  styleUrls: ['./vision-board.component.css']
})
export class VisionBoardComponent implements AfterViewInit {
  
  showEmailModal = false;
  emailValue = '';

  private colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6'];
  
  private sampleImages = [
    '/slika1.png',
    '/slika2.png',
    '/slika3.png',
    '/slika4.png'
  ];

  private sampleQuotes = [
    'Svaka dovoljno napredna tehnologija jednaka je magiji. —Arthur C. Clarke',
    'Tehnologija je riječ koja opisuje nešto što još ne funkcionira. - Douglas Adams',
    'Ne osnivate zajednice. Zajednice već postoje. Pitanje koje treba postaviti je kako im možete pomoći da budu bolje. — Mark Zuckerberg'
  ];

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.loadBoard();
  }

  addNote(): void {
    const board = document.getElementById('board')!;
    const note = document.createElement('div');
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    note.className = `note ${randomColor}`;
    note.contentEditable = 'true';
    note.style.position = 'absolute';
    note.style.left = Math.random() * 500 + 'px';
    note.style.top = Math.random() * 300 + 'px';
    note.style.minWidth = '150px';
    note.style.minHeight = '150px';
    note.style.padding = '15px';
    note.style.fontSize = '16px';
    note.style.borderRadius = '3px';
    note.style.boxShadow = '0 8px 16px rgba(0,0,0,0.25)';
    note.style.transform = 'rotate(-2deg)';
    note.style.cursor = 'move';
    note.style.userSelect = 'none';
    note.textContent = 'Napiši nešto..';
    this.makeDraggable(note);
    board.appendChild(note);
  }

  addImage(): void {
    const board = document.getElementById('board')!;
    const div = document.createElement('div');
    div.className = 'pinned-img';
    div.style.position = 'absolute';
    div.style.left = Math.random() * 400 + 'px';
    div.style.top = Math.random() * 250 + 'px';
    const img = document.createElement('img');
    img.src = this.sampleImages[Math.floor(Math.random() * this.sampleImages.length)];
    img.style.width = '220px';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
    div.appendChild(img);
    this.makeDraggable(div);
    board.appendChild(div);
  }

  addQuote(): void {
    const board = document.getElementById('board')!;
    const q = document.createElement('div');
    q.className = 'quote';
    q.contentEditable = 'true';
    q.style.position = 'absolute';
    q.style.left = Math.random() * 400 + 'px';
    q.style.top = Math.random() * 250 + 'px';
    q.style.fontFamily = 'Georgia, serif';
    q.style.background = 'linear-gradient(135deg, #fff9e6 0%, #ffe8b3 100%)';
    q.style.border = '5px solid #f4d58d';
    q.style.borderRadius = '15px';
    q.style.padding = '40px 20px 20px';
    q.style.width = '240px';
    q.style.minHeight = '120px';
    q.style.fontSize = '15px';
    q.style.textAlign = 'center';
    q.style.fontStyle = 'italic';
    q.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
    q.style.transform = 'rotate(1deg)';
    q.style.cursor = 'move';
    q.style.userSelect = 'none';
    q.style.lineHeight = '1.6';
    q.textContent = this.sampleQuotes[Math.floor(Math.random() * this.sampleQuotes.length)];
    this.makeDraggable(q);
    board.appendChild(q);
  }

  saveBoard(): void {
    const items: BoardItem[] = [];
    document.querySelectorAll('#board > div').forEach((el: any) => {
      const data: BoardItem = {
        type: el.classList.contains('note') ? 'note' : 
              el.classList.contains('quote') ? 'quote' : 'image',
        className: el.className,
        html: el.innerHTML,
        left: el.style.left,
        top: el.style.top
      };
      items.push(data);
    });
    localStorage.setItem('visionBoardItems', JSON.stringify(items));
    alert('Board saved!');
  }

  loadBoard(): void {
    const data = localStorage.getItem('visionBoardItems');
    if (!data) return;
    
    const items: BoardItem[] = JSON.parse(data);
    const board = document.getElementById('board')!;
    
    items.forEach((item) => {
      const div = document.createElement('div');
      div.className = item.className;
      div.style.left = item.left;
      div.style.top = item.top;
      div.innerHTML = item.html;
      if (item.type !== 'image') div.contentEditable = 'true';
      this.makeDraggable(div);
      board.appendChild(div);
    });
  }

  clearBoard(): void {
    if (confirm('Clear the board?')) {
      const board = document.getElementById('board')!;
      board.innerHTML = '';
      localStorage.removeItem('visionBoardItems');
    }
  }

  openEmailModal(): void {
    this.showEmailModal = true;
    this.emailValue = '';
  }

  closeEmailModal(): void {
    this.showEmailModal = false;
  }

  sendEmail(): void {
    if (!this.validateEmail(this.emailValue)) {
      alert('Unesite validnu email adresu!');
      return;
    }

    const subject = encodeURIComponent('Vision Board');
    const body = encodeURIComponent('Pošalji Vision Board kao sliku.');
    const mailtoLink = `mailto:${this.emailValue}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
    this.closeEmailModal();
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private makeDraggable(el: HTMLElement): void {
    let offsetX = 0, offsetY = 0;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.style.position = 'absolute';
    delBtn.style.top = '5px';
    delBtn.style.right = '5px';
    delBtn.style.background = 'rgba(255,255,255,0.95)';
    delBtn.style.border = '2px solid #e74c3c';
    delBtn.style.color = '#e74c3c';
    delBtn.style.width = '28px';
    delBtn.style.height = '28px';
    delBtn.style.borderRadius = '50%';
    delBtn.style.cursor = 'pointer';
    delBtn.style.fontSize = '16px';
    delBtn.style.fontWeight = 'bold';
    delBtn.style.zIndex = '1000';
    el.appendChild(delBtn);

    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      el.remove();
    });

    el.addEventListener('mousedown', dragStart);

    function dragStart(e: MouseEvent) {
      if ((e.target as HTMLElement) === delBtn) return;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', dragEnd);
    }

    function drag(e: MouseEvent) {
      e.preventDefault();
      el.style.left = e.clientX - offsetX + 'px';
      el.style.top = e.clientY - offsetY + 'px';
    }

    function dragEnd() {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', dragEnd);
    }
  }

  goBack(): void {
    this.router.navigate(['/funzone']);
  }
}
