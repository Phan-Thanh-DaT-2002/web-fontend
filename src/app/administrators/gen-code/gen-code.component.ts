import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { GenCodeService } from './gen-code.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-gen-code',
  templateUrl: './gen-code.component.html',
  styleUrls: ['./gen-code.component.scss'],
})
export class GenCodeComponent implements OnInit {
  // public
  public columns = [
    { columnName: 'ID', type: 'INT', columnLength: 10, isId: true, isNotNull: false, isUnique: false, isDefault: false},
    { columnName: 'CREATED_BY', type: 'VARCHAR', columnLength: 50, isId: false, isNotNull: false, isUnique: false, isDefault: true},
    { columnName: 'UPDATED_BY', type: 'VARCHAR', columnLength: 50, isId: false, isNotNull: false, isUnique: false, isDefault: true}
  ];
  public defaultColumn = [
    { columnName: 'CREATED_BY', type: 'VARCHAR', columnLength: 50, isId: false, isNotNull: false, isUnique: false, isDefault: true},
    { columnName: 'UPDATED_BY', type: 'VARCHAR', columnLength: 50, isId: false, isNotNull: false, isUnique: false, isDefault: true}
  ];
  public ColumnMode = ColumnMode;

  public editingColumnName = {};
  public editingDataType = {};
  public editingColumnLength = {};
  public tableName = "";

  inlineEditingColumnName(event, cell, rowIndex) {
    this.editingColumnName[rowIndex + '-' + cell] = false;
    this.columns[rowIndex][cell] = event.target.value;
    this.columns = [...this.columns];
  }

  inlineEditingDataType(event, cell, rowIndex) {
    this.editingDataType[rowIndex + '-' + cell] = false;
    this.columns[rowIndex][cell] = event.target.value;
    this.columns = [...this.columns];
  }

  inlineEditingColumnLength(event, cell, rowIndex) {
    this.editingColumnLength[rowIndex + '-' + cell] = false;
    this.columns[rowIndex][cell] = event.target.value;
    this.columns = [...this.columns];
  }

  public column = {
    columnName: '',
    type: '',
    isId: false
  };

  public listType = [
    {
      code: 'INT',
      name: 'INT'
    },
    {
      code: 'VARCHAR',
      name: 'VARCHAR'
    },
    {
      code: 'DATETIME',
      name: 'DATETIME'
    }
  ]

  constructor(private service: GenCodeService) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  addItem() {
    this.columns.splice(-2);
    this.columns.push({ columnName: 'Column Name', type: 'INT', columnLength: 10, isId: false, isNotNull: false, isUnique: false, isDefault: false});
    this.columns.push(this.defaultColumn[0]);
    this.columns.push(this.defaultColumn[1]);
    this.columns = [...this.columns];
  }

  /**
   * DeleteItem
   *
   * @param id
   */
  deleteItem(id) {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns.indexOf(this.columns[i]) === id) {
        this.columns.splice(i, 1);
        break;
      }
    }
    this.columns = [...this.columns];
  }

  onCkbNNChange(index){
    this.columns[index].isNotNull = !this.columns[index].isNotNull;
  }

  onCkbUQChange(index){
    this.columns[index].isUnique = !this.columns[index].isUnique;
  }

  ngOnInit(): void {}

  genCode(){
    let params = {
      method: "POST",
      content: {
        tableName: this.tableName,
        columns: this.columns
      },
    };
    Swal.showLoading();
    this.service
      .genCode(params)
      .then((data) => {
        Swal.close();
        let response = data;
        if (response.code === 0) {
          Swal.fire({
            icon: "success",
            title: "Sinh code tự động thành công",
            confirmButtonText: "Đồng ý",
          }).then((result) => {
            // this.initForm();
          });
        }
        else {
          Swal.fire({
            icon: "error",
            title: response.errorMessages,
          });
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Kết nối tới hệ thống bị lỗi",
          confirmButtonText: "Đồng ý",
        });
      });
  }
}

