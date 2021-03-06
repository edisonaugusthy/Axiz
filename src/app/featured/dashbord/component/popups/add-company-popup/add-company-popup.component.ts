import { AlertService } from 'src/app/shared/services/alert.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-company-popup',
  templateUrl: './add-company-popup.component.html',
  styleUrls: ['./add-company-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCompanyPopupComponent implements OnInit {

  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;

  @Input() fields;
  @Input() companyList;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();
  @Input() Edit;
  @Input() currency;
  addUserForm: FormGroup;
  isSubmitted: boolean;
  isEdit: boolean;
  selectedCompany: any;
  imageName: any;
  active = 1;
  imgUrl: any;
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
      companyid: [(this.fields?.CompanyID || ''), Validators.required],
      id: [(this.fields?.id || '')],
      companyname: [(this.fields?.CompanyName || ''), Validators.required],
      contact: [(this.fields?.Contact || ''), Validators.required],
      address1: [(this.fields?.Address1 || '')],
      address2: [(this.fields?.Address2 || '')],
      city: [(this.fields?.City || '')],
      country: [(this.fields?.Country || '')],
      phone: [(this.fields?.Phone1 || '')],
      fax: [(this.fields?.FaxNo || '')],
      email: [(this.fields?.Email || ''), [Validators.required, Validators.email]],
      website: [(this.fields?.Website || '')],
      currency: [(this.fields?.CurrencyId || ''), Validators.required],
      retainedaccount: [(this.fields?.RetainedAccountId || ''), Validators.required],
      accuretainedaccount: [(this.fields?.AccuRetainedAccountId || ''), Validators.required],
      erroraccount: [(this.fields?.SysErrorAccount || ''), Validators.required],
      errortolerance: [(this.fields?.SysErrorTolerance || ''), Validators.required],
      manual: [(this.fields?.ManualPath || ''), Validators.required],
      comm: [(this.fields?.CommPath || ''), Validators.required],
      postingtype: [(this.fields?.SopPostingType || ''), Validators.required],
      qtyminor: [(this.fields?.SopQtyMinor || ''), Validators.required],
      conhostname: [(this.fields?.conhostname || ''), Validators.required],
      condbname: [(this.fields?.condbname || ''), Validators.required],
      conusername: [(this.fields?.conusername || ''), Validators.required],
      conpassword: [(this.fields?.conpassword || ''), Validators.required],
      Image: [(this.fields?.Image) || ''],
    });
    this.open(this.input);
    this.imgUrl = this.fields?.CompanyLogo || `../assets/img/upload.png`;
  }

  open(content) {
    this.isEdit = this.Edit;
    if (this.isEdit) {
      this.addUserForm.patchValue(
        {
          qtyminor: (this.fields?.SopQtyMinor || 0),
          currency: this.fields.CurrencyId,
          postingtype: this.fields.SopPostingType
        }
      );
    }
    this.modalRef = this.modalService.open(content);
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.addUserForm.valid) {
      this.formSubmitted.emit(this.addUserForm.value);
      this.modalRef.close();
      this.isSubmitted = false;
    } else {
      this.alert.showAlert({ message: 'Please check all tabs and Fill Remaining fields.. ', type: 'error' });
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
  fileProgress(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.imageName = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.addUserForm.patchValue({
          Image: reader.result,
        });
        this.addUserForm.get('Image').updateValueAndValidity();

      };
    }
  }

}
