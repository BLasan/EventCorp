import { Component, OnInit } from '@angular/core';
    import { FormGroup, FormBuilder, Validators } from '@angular/forms';
    import { EmployeeService } from '../services/employee.service';
    import { IEmployee } from '../interfaces/iemployee';

    @Component({
      selector: 'app-create-employee',
      templateUrl: './create-employee.component.html',
      styles: []
    })
    export class CreateEmployeeComponent implements OnInit {
       employeeForm: FormGroup;
       loader: boolean;

      constructor(private _fb: FormBuilder, private _employeeService: EmployeeService) { }

      ngOnInit() {
        this._createForm();
      }

      /**
       * create our reactive form here
       */
      private _createForm() {
        this.employeeForm = this._fb.group({
          name: ['', Validators.required],
          position: ['Manager', Validators.required],
          salary: ['', Validators.required]
        });
      }

      /**
       * submit new employee to server
       */
      onSubmit() {
        const param = this.employeeForm.value;
        this._employeeService.create(param)
          .subscribe((employee: IEmployee) => {
             this.loader = false;
             this.employeeForm.reset({position: 'Manager'});
          },
            (error) => {
              console.error(error);
              this.loader = false;
            });
      }

    }
