import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Membresia } from '../models/membresia.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipsService {
  private urlEndPoint: string = "http://localhost:8080/gym/membresias";

  constructor(private http: HttpClient,
    private router: Router) { }

  getMembresias(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint + '/page/' + page}`)
  }

  getMembresiasAll(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(`${this.urlEndPoint}`);
  };
}
