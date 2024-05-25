import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../dashboard.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexDataLabels,
  ApexXAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexPlotOptions,
  ApexYAxis,
  ApexFill,
  ApexMarkers,
  ApexTheme,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexResponsive,
  ApexStates
} from 'ng-apexcharts';
import { colors } from 'app/colors.const';

// interface ChartOptions
export interface ChartOptions {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  legend?: ApexLegend;
  title?: ApexTitleSubtitle;
  colors?: string[];
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  yaxis?: ApexYAxis;
  fill?: ApexFill;
  labels?: string[];
  markers: ApexMarkers;
  theme: ApexTheme;
}

@Component({
  selector: 'app-chanel-interactive-monthly',
  templateUrl: './chanel-interactive-monthly.component.html',
  styleUrls: ['./chanel-interactive-monthly.component.scss']
})
export class ChanelInteractiveMonthlyComponent implements OnInit {

  public apexBarChart: Partial<ChartOptions>;
  public topInteractiveChanel = [
    {storyName: "Zalo", amount: 20},
    {storyName: "Facebook", amount: 57},
    {storyName: "Web", amount: 11},
    {storyName: "App EVNHN", amount: 86},
  ]

  constructor(private service:DashboardService) { 
    // Apex Bar Chart
    this.apexBarChart = {
      series: [
        {
          data: [700, 350, 480, 600, 210, 550, 150]
        }
      ],
      chart: {
        height: 400,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '50%',
          distributed: true
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      colors: [colors.solid.primary, colors.solid.info, colors.solid.success, colors.solid.danger],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['MON, 11', 'THU, 14', 'FRI, 15', 'MON, 18', 'WED, 20', 'FRI, 21', 'MON, 23']
      }
    };
  }

  ngOnInit(): void {
    this.getListStoryMaxMonth();
    let datas = [];
    let labels = [];
    this.topInteractiveChanel.forEach(element => {
      datas.push(element.amount);
      labels.push(element.storyName);
    });
    this.apexBarChart.series = [{data: datas}];
    this.apexBarChart.xaxis = { categories: labels};
  }

  getListStoryMaxMonth(){
    let params = {
      method: "GET"
    };
    Swal.showLoading();
    this.service
      .getListStoryMaxMonth(params)
      .then((data) => {
        Swal.close();
        let response = data;
        if (response.code === 0) {
          this.topInteractiveChanel = response.content;
        } else {
          this.topInteractiveChanel = []
        }
      })
      .catch((error) => {
        Swal.close();
        // Swal.fire({
        //   icon: "error",
        //   title: "Can not reach Gateway.",
        //   confirmButtonText: "OK",
        // });
      });
  }

}
