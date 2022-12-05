import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  @Input('labels') doughnutChartLabels: string[] = ['Label1', 'Label2', 'Label3'];

  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#9E120E', '#FF5800', '#FFB414']
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  cargar() {
    this.chart.update();
  }

}
