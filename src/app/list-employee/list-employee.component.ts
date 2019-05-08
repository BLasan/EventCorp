import { Component, OnInit } from '@angular/core';
    import { EmployeeService } from '../services/employee.service';
    import { IEmployee } from '../interfaces/iemployee';
    import { NgAlertService, MessageType } from '@theo4u/ng-alert';

    @Component({
      selector: 'app-list-employee',
      templateUrl: './list-employee.component.html',
      styles: []
    })
    export class ListEmployeeComponent implements OnInit {
      employees: IEmployee[] = [];
      loading = true;

      constructor(private _employeeService: EmployeeService, private _ngAlert: NgAlertService) { }

      ngOnInit() {
        this._employeeService.getChannel().bind('new', data => {
          data.new = true;
          this.employees.push(data);
        });

        this._employeeService.getChannel().bind('deleted', data => {
          this.employees = this.employees.filter(emp => emp.id !== data.id);
        });
        
          this.loading = true;
          this._employeeService.list()
          .subscribe(employees => {
            this.loading = false;
            this.employees = employees;
          });
      }

      delete(employee: IEmployee) {
       // show delete confirmation with ngAlert
        this._ngAlert.push({
          message: `<strong>Are you sure!</strong> you want to delele this employee with name <strong>${employee.name}</strong>`,
          type: MessageType.warning,
          buttons: [
            {
              label: 'Continue',
              action: () => {
                this._actualDelete(employee);
              },
              css: 'btn btn-danger'
            }
          ]
        });
      }

      private _actualDelete (employee: IEmployee) {
        this._employeeService.delete(employee)
          .subscribe(() => {
            // remove the employee if removed successfully
            this.employees = this.employees.filter(item => item !== employee);
            this._ngAlert.push({
              message: `${employee.name} removed`,
              type: MessageType.success
            });
          });
      }

    }