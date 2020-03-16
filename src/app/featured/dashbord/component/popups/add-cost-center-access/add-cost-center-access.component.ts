import { LoaderService } from 'src/app/shared/services/loader.service';
import { DashbordService } from './../../../services/dashbord.service';
import { environment } from '../../../../../../environments/environment.prod';
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
import { FormGroup, Validators, FormControl, FormBuilder, FormArray, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-add-cost-center-access',
  templateUrl: './add-cost-center-access.component.html',
  styleUrls: ['./add-cost-center-access.component.scss']
})
export class AddCostCenterAccessComponent implements OnInit {

  private modalRef: NgbModalRef;
  @ViewChild('addUserModal', { static: true }) input: ElementRef;

  @Input() fields;
  @Input() companyList;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<any>();
  @Input() Edit;
  @Input() users;
  addUserForm: FormGroup;
  imageBase = environment.imageBase;
  isSubmitted: boolean;
  isEdit: boolean;
  chainsList: any;
  selectedChains: Array<object> = [];
  disableItem: boolean;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dashboardSvc: DashbordService,
    private loaderSvc: LoaderService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.loadData();

  }
  activate() {
    this.addUserForm = this.formBuilder.group({
      userid: [(this.fields?.userid || ''), Validators.required],
      username: ['', Validators.required],
      Fullaccess: [1, Validators.required],
      selectedLocations: this.createcheckForm(),
    });
    this.open(this.input);
  }
  createcheckForm() {
    const arr = this.chainsList.map(x => {
      return new FormControl(false);
    });
    return new FormArray(arr);
  }

  createasmcheckForm() {
    const arr = this.chainsList.map(x => {
      return new FormGroup({
        chain: new FormControl(false),
        location: this.formBuilder.array([this.createItem(x.locations)])
      })
    });
    return new FormArray(arr);
  }

  createItem(val) {
    if (val && val.length > 0) {
      const arr = val.map(x => {
        return new FormControl(false);
      });
      return new FormArray(arr);
    }

  }

  getSelectedHobbies() {
    let selectedHobbies = this.addUserForm.get('selectedLocations')['controls'].map((hobby, i) => {
      return hobby.value && this.chainsList[i].chainid;
    });
    selectedHobbies = selectedHobbies.filter(val => {
      if (val !== false) {
        return val;
      }
    });
    return selectedHobbies;
  }
  open(content) {
    if (this.Edit) {
      this.isEdit = true;
    }
    else {
      this.isEdit = false;
    }
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }
  onSubmit() {
    this.getSelectedHobbies();
    this.addUsername();
    // this.isSubmitted = true;
    // this.getChains();
    // if (this.addUserForm.valid && (this.addUserForm.value.Fullaccess == 1 || (this.addUserForm.value.Fullaccess == 0 &&
    //   this.selectedChains.length > 0))) {
    //   let val = this.addUserForm.getRawValue();
    //   val.selected = this.selectedChains;
    //   this.formSubmitted.emit(val);
    //   this.modalRef.close();
    //   this.isSubmitted = false;
    // }
  }

  get formControls() {
    return this.addUserForm.controls;
  }

  addUsername() {
    if (this.users && this.users.length > 0) {
      const user = this.users.filter(val => {
        return val.user_id == this.addUserForm.value.userid;
      })
      user ? this.addUserForm.patchValue({ username: user[0].user_name }) : '';
    }
  }


  popupClose() {
    this.formCancel.emit(true);
    this.modalRef.close();
  }

  loadData() {
    this.loaderSvc.showLoader();
    this.dashboardSvc.getUserChainList(null).subscribe((val: any) => {
      this.loaderSvc.hideLoader();
      this.chainsList = val;
      this.onClick();
      this.activate();
    });
  }


  onClick() {
    this.chainsList.forEach(element => {
      element.check = false;
      if (element.locations) {
        element.locations.forEach(val => {
          val.check = false;
        });
      }
    });

  }

  disableSelection(id) {
    if (id == 1) {
      this.addUserForm.get('selectedLocations')['controls'].forEach((element, i) => {
        this.addUserForm.get('selectedLocations')['controls'][i].patchValue(false)
        element.disable();
      });
    } else {
      this.addUserForm.get('selectedLocations')['controls'].forEach(element => {
        element.enable();
      });
    }
  }

  // update(item) {
  //   item.check = !item.check
  // }
  // getChains() {
  //   let item: any = {};
  //   for (let i = 0; i < this.chainsList.length; i++) {
  //     const element = this.chainsList[i];
  //     if (element.check) {
  //       item.chain = element.chainid
  //       item.locations = []
  //       for (let j = 0; j < element.locations.length; j++) {
  //         const innerItem = element.locations[j];
  //         if (innerItem.check) {
  //           item.locations.push(innerItem.id);
  //         }

  //       }
  //       this.selectedChains.push(item);
  //     }

  //   }

  // }
}



function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}