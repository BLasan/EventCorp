import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name:'searchBills'
})
export class SearchBillsPipe implements PipeTransform{
    transform(bills:any[],searchBill:string):any[]{
        if(!bills) return [];
        if(!searchBill) return bills;

        searchBill = searchBill.toUpperCase();
        return bills.filter(items=>{
            if(items.data.receiver_name.toUpperCase().includes(searchBill)) return items;
        })
    }
}