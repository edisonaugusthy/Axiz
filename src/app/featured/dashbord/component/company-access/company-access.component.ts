import { DeleteMessageService } from './../../../../shared/services/delete-message.service';
import { FormGeneratorService } from './../../../../shared/services/form-generator.service';
import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { LoaderService } from '../../../../shared/services/loader.service';
import { AlertService } from '../../../../shared/services/alert.service';
@Component({
  selector: 'company-access',
  templateUrl: 'company-access.component.html',
  styleUrls: ['company-access.component.scss']
})
export class CompanyAccessComponent implements OnInit {
  editFormData: any;
  showEdit: boolean;
  showDelete: boolean;
  deleteData: any;
  showAdd: boolean;
  addFormData: any;
  companyAccess: any;
  allCompanies: any;
  isDesc: boolean = true;
  column: string = 'user_id';
  direction: number;
  searchText: any;
  showDetails: boolean;
  detailsData: any;
  public pagination: any;
  constructor(
    private dashboardSvc: DashbordService,
    private loaderSvc: LoaderService,
    private alert: AlertService,
    private formGeneratorService: FormGeneratorService,
    private deleteMessageSvc: DeleteMessageService
  ) { }

  ngOnInit() {
    this.pagination = {
      currentPage: 1,
      totalPages: null,
    }
    this.getAllCompany();
  }
  pageChanged(event) {
    this.pagination.currentPage = event;
    this.getAllCompany();
  }
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  openEdit(item?) {
    if (this.allCompanies) {
      this.editFormData = this.formGeneratorService.editCompanyAccess(item, this.allCompanies);
      this.showEdit = true;
    }
    else {
      this.loadAllCompaniesForEdit(item, true);
    }

  }
  openView(item) {
    this.loaderSvc.showLoader();
    if (this.allCompanies) {
      this.showDetails = true;
      this.loaderSvc.hideLoader();
      this.detailsData = this.formGeneratorService.CompanyAccessDetails(item, this.allCompanies);
    }
    else {
      this.loadAllCompaniesForEdit(item);
    }
  }
  cancelView(item) {
    this.showDetails = false;
    this.detailsData = null;
  }
  openDelete(item?) {
    this.showDelete = true;
    this.deleteData = this.deleteMessageSvc.deleteCompanyAcess(item);
  }

  submitDelete(val) {
    this.showDelete = false;
    this.loaderSvc.showLoader();
    this.dashboardSvc.deleteCompanyAccess({ userid: val.UserID }).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllCompany();
    });
  }
  cancelDelete(val) {
    this.showDelete = false;
  }

  openAdd() {
    this.showAdd = true;
    this.addFormData = this.formGeneratorService.addCompanyAccess();
  }

  cancelAdd(val) {
    this.showAdd = false;
  }
  submitAdd(val) {
    this.showAdd = false
    this.loaderSvc.showLoader();
    this.dashboardSvc.createCompanyAccess(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllCompany();
    });
  }


  submitEdit(val) {
    this.showEdit = false;
    console.log(val);
    this.loaderSvc.showLoader();
    this.dashboardSvc.updateCompanyAccess(val).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      if (val && val.status) {
        this.alert.showAlert({ message: val.message, type: 'success' });
      } else {
        this.alert.showAlert({ message: val.message, type: 'danger' });
      }
      this.getAllCompany();
    });
  }
  cancelEdit(val) {
    this.showEdit = false;
  }

  // for listing details
  getAllCompany() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.getCompanyAccess(this.pagination.currentPage).subscribe((val: any) => {
      this.companyAccess = val.data.data;
      this.loaderSvc.hideLoader();
      this.pagination.currentPage = val.data.current_page;
      this.pagination.totalPages = val.data.total;
    });
  }

  // for edit
  loadAllCompaniesForEdit(item, id?) {
    this.loaderSvc.showLoader();
    this.dashboardSvc.getAllCompanies(null).subscribe((val: any) => {
      this.allCompanies = val.data;
      this.loaderSvc.hideLoader();
      if (this.allCompanies && this.allCompanies.length > 0) {
        if (id) {
          this.openEdit(item);
        } else {
          this.openView(item)
        }
      }
    });

  }
}

