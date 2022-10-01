import { defineStore } from "pinia";
import {
  FilterOption,
  PageOptions,
  Shop,
  SortOptions,
} from "@stores/models/";
import { Api, Query } from "@stores/server.api";
import type { CreateShopDto, UpdateShopDto } from "./dto";
import { Type } from "class-transformer";
class Page{
  @Type(()=>Shop)
items:Shop[] = []
total:number = 0
page:number = 1

}
type ShopsState = {
  loading: boolean;
  shop: Shop | null;
  shops: Shop[];
  sortOptions: SortOptions;
  filterOptions: FilterOption | null;
  paginationOptions: PageOptions;
};
export const useShopsStore = defineStore("shops", {
  state: (): ShopsState => {
    return {
      loading: false,
      shop: null,
      shops: [],
      sortOptions: {sortBy:"",sortDirection:"asc"},
      filterOptions: null,
      paginationOptions: { page: 1, limit: 5, total: 0 },
    };
  },
  actions: {
    setSortOptions(option: SortOptions) {
      this.sortOptions = option;
    },
    setFilterOptions(option: FilterOption | null) {
      this.filterOptions = option;
    },
    setPage(direction: "increase" | "decrease") {
const {total,page,limit} = this.paginationOptions
 if (direction === "increase") 
      {
        if(total){
         if((page)* limit > total)return
        }
        this.paginationOptions.page += 1;
      this.fetchShops()
      }
      else {
       if (page - 1 < 1) return
        this.paginationOptions.page -= 1
        this.fetchShops()
      }

    },
    setPageLimit(limit: number) {
      this.paginationOptions.limit = limit;
    },
    setShop(shop: Shop) {
      this.shop = shop;
    },
    async fetchShops() {
      this.loading = true;
      const query: Query[] = [];
      if (this.sortOptions.sortBy) {
        for (const [key,value] of Object.entries(this.sortOptions)) {
          query.push({key,value});
        }
      }
      if (this.filterOptions) {
        for (const [key,value] of Object.entries(this.filterOptions)) {
          query.push({key,value});
        }
      }
      if (this.paginationOptions) {
        for (const [key,value] of Object.entries(this.paginationOptions)) {
          query.push({key,value:value + ''});
        }
      }
    
      const { items,total } = await Api.shared()
        .child("shops")
        .get<Page>(query, Page); 
        // this.shops = arr_Of_Values()
      this.paginationOptions.total = total
      this.shops = items//[...this.shops,...items];
      this.loading = false;
      return this.shops;
    },
    async fetchOneShop(id: string) {
      this.loading = true;
      this.shop = await Api.shared().child("shops", id).get<Shop>([], Shop);
      this.loading = true;
     
   
     
      return this.shop;
    },
    async createShops() {
      this.loading = true;
      await Api.shared()
        .child("shops")
        .post<CreateShopDto, Shop>({}, Shop);
     
      this.loading = false;
    },
    async updateShop() {
      this.loading = true;
      const updatedshop = await Api.shared()
        .child("shops", this.shop!.id!)
        .update<UpdateShopDto, Shop>(this.shop!.toUpdate(), Shop);
      this.shop = updatedshop;
      this.loading = false;
    },
    async removeShop(id: string) {
      this.loading = true;
      const deletedshop = await Api.shared().child("shops", id).delete();
      this.shops = this.shops.filter((e) => e.id! !== id);
      this.loading = false;
    },
  },
});
