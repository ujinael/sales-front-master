
import { Type } from 'class-transformer'
import type { CreateShopDto, UpdateShopDto } from '../dto'
export class Shop
{
id?:string
@Type(()=>Date)
createdAt:Date = new Date()
  constructor(
    public title:string,
    public salesCount:number,
    public distance:number,
     
){}


toCreate():CreateShopDto{
return {...this}

}
toUpdate():UpdateShopDto{
return {...this,id:this.id!}

}



}
