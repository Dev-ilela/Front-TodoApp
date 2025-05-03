import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from "../tarefa";

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export class ItemComponent {
  emEdicao = false;
  @Input() tarefa: Tarefa = new Tarefa("", false);
  @Output() remove = new EventEmitter();
  @Output() modificaTarefa = new EventEmitter();


  onRemover() {
    this.remove.emit(); 
  }
}
