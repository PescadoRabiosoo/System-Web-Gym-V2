import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HoraDisponible } from '../models/hora-disponible.model';
import { Membresia } from '../models/membresia.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.correo);
    params.set('password', usuario.clave);
    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post('http://localhost:8080/gym/clientes', usuario).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }

        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }

        return throwError(() => e);
      })
    );
  }

  getMembresias(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>('http://localhost:8080/gym/membresias');
  };

  getHoras(): Observable<HoraDisponible[]> {
    return this.http.get<HoraDisponible[]>('http://localhost:8080/gym/horas');
  };

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.correo = payload.user_name;
    this._usuario.foto = payload.foto;
    this._usuario.telefono = payload.telefono;
    this._usuario.dni = payload.dni;
    this._usuario.id = payload.id;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario))
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
  }

  checkEmail(correo: string) {
    return this.http.get(`http://localhost:8080/gym/clientes/buscar/${correo}`);
  }

  obtenerUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`http://localhost:8080/gym/clientes/${id}`);
  }

}
