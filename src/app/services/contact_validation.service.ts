import { Validator, NG_VALIDATORS, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import {Directive, Input} from '@angular/core';
import { Subscription } from 'rxjs';

export function validContact():ValidatorFn{
    return (c:AbstractControl):ValidationErrors|null=>{
        if(c.value==null||c.value.length==0){
            return null;
        }

        var isNumber = /^\d+$/.test(c.value);

        if(c){
            const subscription:Subscription=c.valueChanges.subscribe((x)=>{
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return c && isNumber?{'valid_contact':true}:null;
    }
}