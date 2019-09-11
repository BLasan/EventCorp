import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {deactivate_searchBar} from '../../../../scripts/search_bar_activate';
import {calendar} from '../../../../scripts/artist/artist_calendar.js'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-organizer-events',
  templateUrl: './organizer-events.component.html',
  styleUrls: ['./organizer-events.component.scss']
})
export class OrganizerEventsComponent implements OnInit,AfterViewInit,OnDestroy{
  @ViewChild('multiSelect') multiSelect: MatSelect;
  form: any;
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  public bankMultiCtrl: FormControl = new FormControl();
  public bankMultiFilterCtrl: FormControl = new FormControl();
  public filteredBanksMulti: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected _onDestroy = new Subject<void>();

  constructor() { }
 
  ngOnInit() {
    calendar();
    deactivate_searchBar();
    this.filteredBanksMulti.next(this.toppingList.slice());
    this.form=new FormGroup({
      event_name:new FormControl('',Validators.required),
      venue:new FormControl('',[Validators.required]),
      date:new FormControl('',[Validators.required]),
      time:new FormControl('',[Validators.required])
    });

    this.bankMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });

  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngAfterViewInit(){
    
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  protected filterBanksMulti() {
    if (!this.toppingList) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;

    if (!search) {
      this.filteredBanksMulti.next(this.toppingList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.toppingList.filter(list=>list.toLowerCase().indexOf(search) > -1)
    );
  }


}
