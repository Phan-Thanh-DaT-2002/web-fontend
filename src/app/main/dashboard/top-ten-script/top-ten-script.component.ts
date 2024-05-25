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
  selector: 'app-top-ten-script',
  templateUrl: './top-ten-script.component.html',
  styleUrls: ['./top-ten-script.component.scss']
})
export class TopTenScriptComponent implements OnInit {

  public apexBarChart: Partial<ChartOptions>;
  public toptenScript = [
    {storyName: "Story 1", amount: 20},
    {storyName: "Story 2", amount: 57},
    {storyName: "Story 3", amount: 11},
    {storyName: "Story 4", amount: 86},
    {storyName: "Story 5", amount: 120},
    {storyName: "Story 6", amount: 20},
    {storyName: "Story 7", amount: 55},
    {storyName: "Story 8", amount: 98},
    {storyName: "Story 9", amount: 70},
    {storyName: "Story 10", amount: 102},
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
          horizontal: true,
          barHeight: '15%',
          endingShape: 'rounded',
          columnWidth: '70%'
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      colors: [colors.solid.info],
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
    let toptenScriptData = [];
    let toptenScriptLabel = [];
    this.toptenScript.forEach(element => {
      toptenScriptData.push(element.amount);
      toptenScriptLabel.push(element.storyName);
    });
    this.apexBarChart.series = [{data: toptenScriptData}];
    this.apexBarChart.xaxis = { categories: toptenScriptLabel};
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
          this.toptenScript = response.content;
        } else {
          this.toptenScript = []
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
