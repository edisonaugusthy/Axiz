import { LoaderService } from './../../../../shared/services/loader.service';
import { AlertService } from './../../../../shared/services/alert.service';
import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { FormGeneratorService } from 'src/app/shared/services/form-generator.service';
@Component({
  selector: 'app-cost-center-access',
  templateUrl: './cost-center-access.component.html',
  styleUrls: ['./cost-center-access.component.css']
})
export class CostCenterAccessComponent implements OnInit {
  public showEdit = false;
  editFormData: any;
  showDelete: boolean;
  deleteData: any;
  showAdd: boolean;
  addFormData: any;
  isDesc = true;
  column = 'id';
  direction: number;
  allCostAccess: any;
  searchText: any;
  allusers: any;
  showDetails: boolean;
  detailsData: any;
  public pagination: any;
  constructor(
    private dashboardSvc: DashbordService,
    private formGeneratorService: FormGeneratorService,
    private deleteMessageSvc: DeleteMessageService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      totalPages: null,
    }
    this.getAllCenters();
    this.getAllUsers();
  }
  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllCenters();
  }
  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  openEdit(item?) {
    this.editFormData = item;//this.formGeneratorService.editCostCenterAccess(item);
    this.showEdit = true;
  }
  submitEdit(val) {
    this.showEdit = false;
    console.log(val);
    this.loaderSvc.showLoader();
    this.dashboardSvc.updateCostAccess(val).subscribe((res: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllCenters();
    });
  }
  cancelEdit(val) {
    this.showEdit = false;
  }

  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteCostCenterAcess(item);
  }

  openView(item) {
    this.showDetails = true;
    this.detailsData = item;
  }
  cancelView(item) {
    this.showDetails = false;
    this.detailsData = null;
  }

  submitDelete(val) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteCostAccess(val).subscribe((res: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllCenters();
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }

  openAdd() {
    this.showAdd = true;
    this.addFormData = this.formGeneratorService.addCostCenterAccess();
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(val) {
    this.showAdd = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.addCostAccess(val).subscribe((res: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllCenters();
    });
  }

  getAllCenters() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.gerAllCostAccess(this.pagination.currentPage).subscribe((res: any) => {
      this.allCostAccess = res.data;
      this.loaderSvc.hideLoader();
      this.pagination.currentPage = res.current_page;
      this.pagination.totalPages = res.total;
    });
  }


  getAllUsers() {
    this.dashboardSvc.getUserChainList(null).subscribe((res: any) => {
      this.allusers = res.users;
    });
  }

}
