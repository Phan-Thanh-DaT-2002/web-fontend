import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { resultsManagementService } from '../results-managerment.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list-results',
  templateUrl: './list-results.component.html',
  styleUrls: ['./list-results.component.scss']
})
export class ListResultsComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor( private service: resultsManagementService) { }
  public currentPage = 0;
  public perPage = 10;
  public rows = [];
  public totalRows = 0;
  public totalPage = 0;
  public ColumnMode = ColumnMode;

  ngOnInit(): void {
    this.getDetailResults();
  }
  getDetailResults(){
 
    let params = {
      method: "GET", 
      currentPage: this.currentPage,
      perPage: this.perPage
    };
    Swal.showLoading();
    this.service
      .getListResults(params)
      .then((data) => {
        Swal.close();
        let response = data;
        if (response.code == '0') {
          for (var i = 0; i < response.content["items"].length; i++) {
            response.content["items"][i].dayTest = this.formatDate(response.content["items"][i].dayTest);
          }
          console.log("response,response",response);
          
          this.rows = response.content["items"];
          this.totalRows = response.content["total"];
          this.totalPage = Math.ceil(this.totalRows / this.perPage);
        } else {
          // Swal.fire({
          //   // icon: "error",
          //   // title: response.errorMessages,
          // });
          if (response.code === '2') {
            this.rows = [];
            this.totalRows = 0;
          }
        }
      })
      .catch((error) => {
       
      });
  }
  setPage(pageInfo) {
    this.currentPage = pageInfo.offset;
    this.getDetailResults();
  }

  changePerpage() {
    this.currentPage = 0  
    this.getDetailResults();
  }
   formatDate(dateString) {
    // Tạo đối tượng Date từ chuỗi ngày tháng
    const date = new Date(dateString);

    // Lấy ngày, tháng, năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng được đánh số từ 0-11
    const year = date.getFullYear();

    // Định dạng lại thành ngày/tháng/năm
    return `${day}/${month}/${year}`;
}
}
