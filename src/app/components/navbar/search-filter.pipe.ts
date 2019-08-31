import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchFilter'
})
export class SearchFilterPipe implements PipeTransform{
    transform(employees:any[],searchText:string):any[]{
        if(!employees) return [];
        if(!searchText) return []

        searchText = searchText.toLowerCase();
        document.getElementById('search_dropdown').removeAttribute('style')
        return employees.filter(employee=>{
            return employee.name.toLowerCase().includes(searchText)
        })
    }
}