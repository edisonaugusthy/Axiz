import { AlertService } from 'src/app/shared/services/alert.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;

  @Input() fields;
  @Input() companyList;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();

  addUserForm: FormGroup;
  isSubmitted: boolean;
  isEdit: boolean;
  selectedCompany: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private alert: AlertService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      id: [(this.fields?.id || '')],
      chainid: [(this.fields?.ChainId || ''), Validators.required],
      locationid: [(this.fields?.LocationId || ''), Validators.required],
      Locationname: [(this.fields?.LocationName || '')],
      Contact: [(this.fields?.Contact || '')],
      address1: [(this.fields?.Address1 || '')],
      address2: [(this.fields?.Address2 || '')],
      city: [(this.fields?.City || '')],
      country: [(this.fields?.Country || '')],
      phone: [(this.fields?.Phone || '')],
      fax: [(this.fields?.Fax || '')],
      email: [(this.fields?.Email || '')],
      notes: [('')],
      costcenter: [(this.fields?.CostCenter || '')],
      locationtype: [('')],
      inventory: [(this.fields?.UploadInv), Validators.required],
      startdate: [(this.fields?.StartDate || '')],
      service: [(this.fields?.Service || '')],
      costcentertype: [(this.fields?.CostCenterType || '')],
      seats: [(this.fields?.Seats || ''), Validators.required],
      area: [(this.fields?.userid || '')],
      active: [(this.fields?.Active), Validators.required],
      planned: [(this.fields?.Planned), Validators.required],
      enablecutoff: [(this.fields?.EnableOrderCutoff), Validators.required],
      ordercutof: [(this.fields?.OrderCutoff || '')],
    });
    this.open(this.input);
  }

  open(content) {
    if (this.fields) {
      this.isEdit = true;
    }
    else {
      this.isEdit = false;
    }
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.addUserForm.valid) {
      this.formSubmitted.emit(this.addUserForm.value);
      this.modalRef.close();
      this.isSubmitted = false;
    } else {
      this.alert.showAlert({ message: 'Please Fill Remaining fields', type: 'error' });
    }
  }

  get formControls() {
    return this.addUserForm.controls;
  }


  popupClose() {
    this.formCancel.emit(true);
    this.modalRef.close();
  }

  selectCompany(val) {
    val.checked != val.checked;
    if (this.selectedCompany === val.CompanyID) {
      this.selectedCompany = null;
    } else {
      this.selectedCompany = val.CompanyID
    }
  }

  enabletime() {
    if (this.addUserForm.value.enablecutoff == 1) {
      this.addUserForm.get('ordercutof').setValidators([Validators.required]);
      this.addUserForm.get('ordercutof').updateValueAndValidity();
    }
  }

}
