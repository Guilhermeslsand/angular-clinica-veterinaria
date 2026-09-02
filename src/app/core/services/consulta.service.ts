import { Service, Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    Consulta,
    ConsultaRequest
} from '../models/consulta.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {

    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/consultas`;

    listar(): Observable<Consulta[]> {
        return this.http.get<Consulta[]>(`${this.apiUrl}`);
    }
}
