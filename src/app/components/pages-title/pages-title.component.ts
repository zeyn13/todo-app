import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-title',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './pages-title.component.html',
  styleUrl: './pages-title.component.scss'
})
export class PagesTitleComponent {
  dateNow=new Date();  

}
