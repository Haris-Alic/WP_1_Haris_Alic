import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('brushSlider') brushSlider!: ElementRef<HTMLInputElement>;
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;

  currentColor = '#000000';
  brushSize = 3;
  showEmailModal = false;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    if (this.brushSlider) {
    this.brushSlider.nativeElement.addEventListener('input', (e: any) => {
      this.brushSize = +e.target.value;
      this.ctx.lineWidth = this.brushSize;
    });
  }

    canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));
    canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

    canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    canvas.addEventListener('touchend', this.stopDrawing.bind(this));
  }

  handleColorChange(event: any): void {
    this.currentColor = event.target.value;
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.globalCompositeOperation = 'source-over';
  }

  handleBrushChange(event: any): void {
    this.brushSize = +event.target.value;
    this.ctx.lineWidth = this.brushSize;
  }


  setDrawMode(): void {
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.globalCompositeOperation = 'source-over';
  }

  setEraseMode(): void {
    this.ctx.globalCompositeOperation = 'destination-out';
  }

  clearCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  saveAsPNG(): void {
    const canvas = this.canvasRef.nativeElement;
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  openEmailModal(): void {
    this.showEmailModal = true;
  }

  closeEmailModal(): void {
    this.showEmailModal = false;
  }

  sendEmail(email: string): void {
    if (!this.validateEmail(email)) {
      alert('Unesite validnu email adresu!');
      return;
    }

    const subject = encodeURIComponent('Whiteboard crtež');
    const body = encodeURIComponent('Poštovani,\n\nPrilažem Whiteboard crtež.\n\n');
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
    this.closeEmailModal();
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private startDrawing(e: MouseEvent): void {
    this.isDrawing = true;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const canvas = this.canvasRef.nativeElement;
    
    const elementRelativeX = e.clientX - rect.left;
    const elementRelativeY = e.clientY - rect.top;
    this.lastX = elementRelativeX * canvas.width / rect.width;
    this.lastY = elementRelativeY * canvas.height / rect.height;
  }

  private draw(e: MouseEvent): void {
    if (!this.isDrawing) return;
    
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const canvas = this.canvasRef.nativeElement;
    
    const elementRelativeX = e.clientX - rect.left;
    const elementRelativeY = e.clientY - rect.top;
    const currentX = elementRelativeX * canvas.width / rect.width;
    const currentY = elementRelativeY * canvas.height / rect.height;
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    
    this.lastX = currentX;
    this.lastY = currentY;
  }

  private stopDrawing(): void {
    this.isDrawing = false;
  }

  private handleTouchStart(e: TouchEvent): void {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const canvas = this.canvasRef.nativeElement;
    
    const elementRelativeX = touch.clientX - rect.left;
    const elementRelativeY = touch.clientY - rect.top;
    this.lastX = elementRelativeX * canvas.width / rect.width;
    this.lastY = elementRelativeY * canvas.height / rect.height;
    
    this.isDrawing = true;
  }

  private handleTouchMove(e: TouchEvent): void {
    if (!this.isDrawing) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const canvas = this.canvasRef.nativeElement;
    
    const elementRelativeX = touch.clientX - rect.left;
    const elementRelativeY = touch.clientY - rect.top;
    const currentX = elementRelativeX * canvas.width / rect.width;
    const currentY = elementRelativeY * canvas.height / rect.height;
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    
    this.lastX = currentX;
    this.lastY = currentY;
  }

  goBack(): void {
    this.router.navigate(['/funzone']);
  }


}
