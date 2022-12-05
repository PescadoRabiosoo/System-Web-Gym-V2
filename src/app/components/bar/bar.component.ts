import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styles: [
  ]
})
export class BarComponent {

  @Input('labels') doughnutChartLabels: string[] = ['Label1', 'Label2', 'Label3'];

  @Input('data') barChartData: ChartData<'bar'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        label: 'Membresias',
        backgroundColor: ['#9E120E', '#FF5800', '#FFB414']
      },
    ]
  };

  constructor() { }
}
