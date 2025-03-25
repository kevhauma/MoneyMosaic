import { Component } from '@angular/core';
import { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-entry-page',
  imports: [NgxEchartsModule],
  templateUrl: './entry-page.component.html',
})
export class EntryPageComponent {
  chartOption: EChartsCoreOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };
}
