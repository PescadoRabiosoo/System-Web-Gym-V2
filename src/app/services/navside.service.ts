import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavsideService {

  menu: any[] = [
    {
      titulo: 'Productos',
      icono: 'mdi mdi-dumbbell',
      url: '/productos',
      submenu: []
    },
    {
      titulo: 'Membresias',
      icono: 'mdi mdi-account-card-details',
      url: '/membresias',
      submenu: []
    },
    {
      titulo: 'Cursos Presenciales',
      icono: 'mdi mdi-book-multiple',
      url: '/presenciales',
      submenu: []
    },
    {
      titulo: 'Cursos Virtuales',
      icono: 'mdi mdi-television',
      url: '/virtuales',
      submenu: []
    }
  ]
  constructor() { }
}
