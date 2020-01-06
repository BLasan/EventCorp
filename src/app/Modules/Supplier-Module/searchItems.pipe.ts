import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchItems'
})
export class SearchItemsPipe implements PipeTransform{
    transform(items:any[],searchText:string):any[]{
        if(!items) return [];
        if(!searchText) return items;

        searchText = searchText.toUpperCase();
        return items.filter(items=>{
            if(items.item_name.toUpperCase().includes(searchText)) return items;
        })
    }
}