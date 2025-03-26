import { Component } from '@angular/core';
import { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, LineChart, PieChart, RadarChart, GridComponent, CanvasRenderer]);
@Component({
  selector: 'app-entry-page',
  imports: [NgxEchartsModule],
  templateUrl: './entry-page.component.html', providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class EntryPageComponent {
  cycleIndex = 0
  chartTypeIndex = 0;
  chartTypes = ['bar', 'line', 'pie', 'radar']
  chartOption = this.getChartOptions()
  interval = setInterval(() => { }, 1000000)
  ngOnInit() {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.chartOption = this.getChartOptions()
      this.cycleIndex += 1;
      if (!(this.cycleIndex % 4)) this.chartTypeIndex += 1
      if (this.chartTypeIndex > this.chartTypes.length - 1) this.chartTypeIndex = 0
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.interval)
  }
  getNormalData() {
    return Array.from({ length: 7 }).map(_ => 500 + Math.random() * 1000)
  }
  getRadarData() {
    return [{ value: Array.from({ length: 7 }).map(_ => 500 + Math.random() * 1000) }]
  }
  getChartOptions() {
    const type = this.chartTypes[this.chartTypeIndex]
    return {
      xAxis: {
        type: 'category',
        data: type === 'bar' || type === 'line' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']:undefined,
      },
      yAxis: {
        type: 'value',
      },
      
      radar: type === 'radar' ? {
        indicator: [
          { name: 'Mon', max: 1500 },
          { name: 'Tue', max: 1500 },
          { name: 'Wed', max: 1500 },
          { name: 'Thu', max: 1500 },
          { name: 'Fri', max: 1500 },
          { name: 'Sat', max: 1500 },
          { name: 'Sun', max: 1500 }
        ]
      } : undefined,
      series: [
        {
          radius: ['40%', '70%'],
          padAngle: 5,
          itemStyle: {
            borderRadius: 10
          },
          data: type === 'radar' ? this.getRadarData() : this.getNormalData(),
          type: type,
        },
      ],
    } as EChartsCoreOption;

  }
}
