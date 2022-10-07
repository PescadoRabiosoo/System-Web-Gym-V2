import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HoraDisponible } from '../models/hora-disponible.model';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  constructor(private http: HttpClient) { }

  getHoras(): Observable<HoraDisponible[]> {
    return this.http.get<HoraDisponible[]>('http://localhost:8080/gym/horas');
  };
}
