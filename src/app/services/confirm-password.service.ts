import { Validator, NG_VALIDATORS, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import {Directive, Input} from '@angular/core';
import { Subscription } from 'rxjs';

export function confirmPassword(controlNameToCompare:string):ValidatorFn{
    return (c:AbstractControl):ValidationErrors|null=>{
        if(c.value==null||c.value.length==0){
            return null;
        }

        console.log(c.value)

        const controlToCompare=c.root.get(controlNameToCompare);
        if(controlToCompare){
            const subscription:Subscription=controlToCompare.valueChanges.subscribe((x)=>{
                // console.log(x)
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value!==c.value?{'notequal':true}:null;
    }
}