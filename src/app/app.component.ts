/*import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMessage, MessageType, CloseType, NgAlertService } from '@theo4u/ng-alert';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  message: IMessage;
  closeTypes = CloseType;
  private _alertSub: Subscription;

  constructor(private _ngAlert: NgAlertService) {
  }

  ngOnInit () {
     this._alertSub = this._ngAlert.getSource().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy () {
    this._alertSub.unsubscribe();
  }

}
*/

import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  constructor() {
  }

  ngOnInit () {
     
  }

}


