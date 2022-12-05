import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CantidadCursos, CantidadProductos, ClientesRegistrados, GananciasCurso, GananciasMembresia, GananciasProducto, PlanesVendidos } from 'src/app/interfaces/dashboard.interface';
import { ComprobanteMembresia } from 'src/app/models/comprobante-membresia.model';
import { Membresia } from 'src/app/models/membresia.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  @ViewChild('producto') producto: ElementRef;
  @ViewChild('tipo') tipo: ElementRef;
  @ViewChild('cursos') chart: BaseChartDirective;

  cantidadPlanes: PlanesVendidos;
  clientesRegistrados: ClientesRegistrados;
  cantidadProductos: CantidadProductos;
  cantidadCursos: CantidadCursos;
  comprobantes: ComprobanteMembresia[];
  membresias: Membresia[];

  nombres: string[] = [];
  data: number[] = [];

  nombresp: string[] = [];
  datap: number[] = [];

  nombresc: string[] = [];
  datac: number[] = [];

  color: string[] = [];

  public cargando: Boolean = true;

  membershipChartData: ChartData<'bar'> = {
    labels: this.nombres,
    datasets: [
      {
        data: this.data,
        label: 'Membresias',
        backgroundColor: ['#FF5680']
      },
    ]
  };

  productChartData: ChartData<'doughnut'> = {
    labels: this.nombresp,
    datasets: [
      {
        data: this.datap,
        backgroundColor: this.color
      },
    ]
  };

  courseChartData: ChartData<'doughnut'> = {
    labels: this.nombresc,
    datasets: [
      {
        data: this.datac,
        backgroundColor: this.color
      },
    ]
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.planes();
    this.clientes();
    this.productos();
    this.cursos();
    this.gananciasMembresia();
    this.gananciasProducto();
    this.gananciasCursos();
    setTimeout(() => {
      this.cargando = false;
    }, 2000);
    this.generarArrayColores();
  }

  planes() {
    this.dashboardService.getPlanes().subscribe(resp => {
      this.cantidadPlanes = resp as PlanesVendidos;
    })
  }

  clientes() {
    this.dashboardService.getClientes().subscribe(resp => {
      this.clientesRegistrados = resp as ClientesRegistrados;
    })
  }

  productos() {
    this.dashboardService.getProductos().subscribe(resp => {
      this.cantidadProductos = resp as CantidadProductos;
    })
  }

  cursos() {
    this.dashboardService.getCursos().subscribe(resp => {
      this.cantidadCursos = resp as CantidadCursos;
    })
  }

  gananciasMembresia() {
    this.dashboardService.getCcomprobantes().subscribe((resp: GananciasMembresia) => {
      resp.nombres.forEach(element => {
        this.nombres.push(element);
      });
      resp.ganancias.forEach(element => {
        this.data.push(element);
      });
    });
  }

  gananciasProducto() {
    this.dashboardService.getPComprobantes('total', 1).subscribe((resp: GananciasProducto) => {
      console.log(resp);
      resp.nombres.forEach(element => {
        this.nombresp.push(element);
      });
      resp.ganancias.forEach(element => {
        this.datap.push(element);
      });
    });
  }

  gananciasCursos() {
    this.dashboardService.getCComprobantes('total').subscribe((resp: GananciasCurso) => {
      console.log(resp);
      resp.nombres.forEach(element => {
        this.nombresc.push(element);
      });
      resp.ganancias.forEach(element => {
        this.datac.push(element);
      });
    });
  }

  onChangeCurso(centroId) {
    this.dashboardService.getCComprobantes(centroId).subscribe((resp: GananciasCurso) => {
      console.log(resp);
      this.nombresc.splice(0, this.nombresc.length);
      this.datac.splice(0, this.datac.length);
      resp.nombres.forEach(element => {
        this.nombresc.push(element)
      });
      resp.ganancias.forEach(element => {
        this.datac.push(element);
      });
    });
  }

  onChangeProducto(centroId) {
    console.log(centroId)
    console.log(this.tipo.nativeElement.value)
    this.dashboardService.getPComprobantes(centroId, this.tipo.nativeElement.value).subscribe((resp: GananciasProducto) => {
      console.log(resp);
      this.nombresp.splice(0, this.nombresp.length);
      this.datap.splice(0, this.datap.length);
      resp.nombres.forEach(element => {
        this.nombresp.push(element);
      });
      resp.ganancias.forEach(element => {
        this.datap.push(element)
      });
    });

  }

  onChangeTipo(tipo) {
    console.log(tipo)
    console.log(this.producto.nativeElement.value)
    this.dashboardService.getPComprobantes(this.producto.nativeElement.value, tipo).subscribe((resp: GananciasProducto) => {
      console.log(resp);
      this.nombresp.splice(0, this.nombresp.length);
      this.datap.splice(0, this.datap.length);
      resp.nombres.forEach(element => {
        this.nombresp.push(element);
      });
      resp.ganancias.forEach(element => {
        this.datap.push(element);
      });
    });
  }

  generarColor() {
    var simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";

    for (var i = 0; i < 6; i++) {
      color = color + simbolos[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generarArrayColores() {
    for (var i = 0; i < 50; i++) {
      var nuevocolor = this.generarColor();
      this.color.push(nuevocolor);
    }
    return this.color;
  }
}
