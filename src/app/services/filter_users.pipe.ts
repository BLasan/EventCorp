import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchFilter'
})
export class FilterUsersPipe implements PipeTransform{
    transform(topping:any[],searchUser:string):any[]{
        if(!topping) return [];
        if(!searchUser) return []

        searchUser = searchUser.toLowerCase();
        return topping.filter(user=>{
           console.log(user)
            return user.toLowerCase().includes(searchUser);
        })
    }
}