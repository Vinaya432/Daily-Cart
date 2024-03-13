import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  


  transform(allproducts:any[],searchKey:string):any {

    const result:any=[]
    if(!allproducts || searchKey==''){
      return allproducts
    }
    allproducts.forEach((item:any)=>{
      if(item["title"].trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
    })

    return result;
  }

}
