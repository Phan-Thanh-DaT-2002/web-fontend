import { Component, OnInit, ViewChild} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  public ColumnMode = ColumnMode;
  public rows = []

  constructor(private service:DashboardService) { 
    
  }

  ngOnInit(): void {
    
  }

  

}
