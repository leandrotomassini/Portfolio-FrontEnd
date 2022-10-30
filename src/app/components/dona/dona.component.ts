import { Component, Input } from '@angular/core';

import { ChartData, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.scss'],
})
export class DonaComponent {

  @Input() titulo: string = 'Sin título';
  @Input('labels') doughnutChartLabels: string[] = ['English'];


  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450],
        backgroundColor: ['#00ff00', '#3E3E3E']
      },
    ]
  };

}
