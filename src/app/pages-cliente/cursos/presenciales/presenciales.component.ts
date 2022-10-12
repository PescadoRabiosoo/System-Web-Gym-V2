import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';
import { OnSiteService } from 'src/app/services/on-site.service';

@Component({
  selector: 'app-presenciales',
  templateUrl: './presenciales.component.html',
  styleUrls: ['./presenciales.component.css']
})
export class PresencialesComponent implements OnInit {

  presenciales: CursoPresencial[];
  paginador: any;


  constructor(private activatedRoute: ActivatedRoute,
    private onSiteService: OnSiteService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.onSiteService.getCursosPresenciales(page)
        .subscribe(response => {
          this.presenciales = response.content as CursoPresencial[]
          this.paginador = response;
        })
    });
  }

}
