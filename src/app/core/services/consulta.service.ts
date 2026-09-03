import { Service, Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Consulta, ConsultaRequest } from '../models/consulta.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/consultas`;

  listar(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/`);
  }

  buscarPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  criar(consulta: ConsultaRequest): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.apiUrl}/`, consulta);
  }

  atualizar(id: number, consulta: ConsultaRequest): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/{id}`, consulta);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/{id}`);
  }
}
