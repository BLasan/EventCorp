import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchFilter'
})
export class SearchFilterPipe implements PipeTransform{
    transform(users:any[],searchText:string):any[]{
        if(!users) return [];
        if(!searchText) return []

        searchText = searchText.toLowerCase();
        document.getElementById('search_dropdown').removeAttribute('style');
        return users.filter(user=>{
            return user.user_name.toLowerCase().includes(searchText);
        })
    }
}