import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations:[
    trigger('fade', [
    transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
    transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
  ])]
})
export class CarouselComponent implements OnInit {
  current = 0;
  imagenes = [
    {
      id: 1,
      source: 'https://picsum.photos/600/400/?image=0',
      name: 'Los Angeles'
    },
    {
      id: 2,
      source: 'https://picsum.photos/600/400/?image=1',
      name: 'Chicago'
    },
    {
      id: 3,
      source: 'https://picsum.photos/600/400/?image=2',
      name: 'New york'
    }
  ]

  constructor() { }

  ngOnInit() {
      setInterval(() => {
        debugger
        this.current = ++this.current % this.imagenes.length;
      }, 2000);
  }

}
