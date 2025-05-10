import { Component, OnInit } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TODOapp';

  arrayDeTarefas: Tarefa[] = [];
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'https://back-todoapp-5e0l.onrender.com';
    this.READ_tarefas(); 
  }

  async ngOnInit(): Promise<void> {
    const novaTarefa = new Tarefa('TESTE', false);
    await firstValueFrom(this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa));
    await this.READ_tarefas(); 
  }

  async CREATE_tarefa(descricaoNovaTarefa: string): Promise<void> {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    await firstValueFrom(this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa));
    await this.READ_tarefas();
  }

  async READ_tarefas(): Promise<void> {
    this.arrayDeTarefas = await firstValueFrom(
      this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`)
    );
  }

  async DELETE_tarefa(tarefaAserRemovida: Tarefa): Promise<void> {
    const indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
    const id = this.arrayDeTarefas[indice]._id;
    await firstValueFrom(this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`));
    await this.READ_tarefas();
  }

  async UPDATE_tarefa(tarefaAserModificada: Tarefa): Promise<void> {
    const indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    const id = this.arrayDeTarefas[indice]._id;
    await firstValueFrom(
      this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada)
    );
    await this.READ_tarefas();
  }
}
