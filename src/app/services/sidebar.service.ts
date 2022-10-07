import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      url: '/dashboard',
      submenu: []
    },
    {
      titulo: 'Clientes',
      icono: 'mdi mdi-account-multiple',
      url: '/customers',
      submenu: []
    },
    {
      titulo: 'Membresias',
      icono: 'mdi mdi-account-card-details',
      url: '/memberships',
      submenu: []
    },
    {
      titulo: 'Productos',
      icono: 'mdi mdi-dumbbell',
      url: '/products',
      submenu: []
    },
    {
      titulo: 'Entrenadores',
      icono: 'mdi mdi-human-handsup',
      url: '/trainers',
      submenu: []
    },
    {
      titulo: 'Cursos',
      icono: 'mdi mdi-book-multiple',
      url: '/courses',
      submenu: [
        {
          titulo: 'Presencial',
          url: 'on-site',
        },
        {
          titulo: 'Virtual',
          url: 'virtual',
        }
      ]
    },


  ]

  constructor() { }
}
