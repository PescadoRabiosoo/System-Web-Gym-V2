import { Component, OnInit } from '@angular/core';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  constructor(private configuracionesService: ConfiguracionesService) { }

  ngOnInit(): void {
    this.configuracionesService.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.configuracionesService.changeTheme(theme);
  }

}
