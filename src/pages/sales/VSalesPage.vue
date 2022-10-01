<template>
  <div class="page">
<VSalesFilterbar
@on-filter="setFilterOptions"
@disable-filter="disableFilter"
/>
    <VTable :data="sortedShops" class="bg-white shadow">
      <template #header>
        <VTableHeaderCell name="createdAt"> дата </VTableHeaderCell>
        <VTableHeaderCell name="title"
         sortable
          :sort-options="sortOptions"
          @on-sort="setSortOptions"
          @no-sort="noSort"

          >
          название
        </VTableHeaderCell>
        <VTableHeaderCell
          name="salesCount"
          sortable
          :sort-options="sortOptions"
          @on-sort="setSortOptions"
          @no-sort="noSort"
        >
          количество(шт)
        </VTableHeaderCell>
        <VTableHeaderCell name="distance" sortable 
        :sort-options="sortOptions"
        @on-sort="setSortOptions"
        @no-sort="noSort"
        >
          расстояние(км)
        </VTableHeaderCell>
      </template>
      <template #default="{ index }">
        <VTableCell width="10%">
          {{ stringFromDate(shops[index].createdAt) }}
        </VTableCell>
        <VTableCell width="50%">
          {{ shops[index].title }}
        </VTableCell>
        <VTableCell width="20%">
          {{ shops[index].salesCount }}
        </VTableCell>
        <VTableCell width="20%">
          {{ shops[index].distance }}
        </VTableCell>
      </template>
      <template #footer>
        <VTableFooterPagination
        :loading="loading"
         :pagination-options="paginationOptions" 
         @on-increase="changePage"
         @on-decrease="changePage"
         @on-set-limit="setLimit"
         />
      </template>
    </VTable>
  </div>
</template>
<script setup lang="ts">
import VSalesFilterbar from "./VSalesFilterbar.vue"
import VTable from "@/components/table/VTable.vue";
import VTableCell from "@/components/table/VTableCell.vue";
import VTableHeaderCell from "@/components/table/VTableHeaderCell.vue";

import { FilterOption, SortOptions } from "@/stores/models";
import { useDateFormat } from "@/composition/useDateFormat";
import { useShopsStore } from "@stores/modules";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import VTableFooterPagination from "@/components/table/VTableFooterPagination.vue";

const store = useShopsStore();
const { stringFromDate } = useDateFormat();
const { shops,paginationOptions,sortOptions,filterOptions,loading } = storeToRefs(store);

const setSortOptions = (options:SortOptions)=>{
    sortOptions.value = options
    store.fetchShops()

}
    const sortedShops = computed(() => {
  return shops.value;
});
const noSort = ()=>{
  sortOptions.value.sortBy = ""
  store.fetchShops()

}
const setFilterOptions=(option:FilterOption)=>{
store.paginationOptions.page = 1
store.setFilterOptions(option)
store.fetchShops()
}
const disableFilter = ()=>{
  store.paginationOptions.page = 1
filterOptions.value = null
store.fetchShops()
}
const changePage = (direction:"increase"|"decrease")=>{
store.setPage(direction)
}
const setLimit = ()=>{
 paginationOptions.value.page = 1
 store.fetchShops()

}
onMounted(() => {
  store.fetchShops();
});
</script>
<style scoped lang="scss">
.page {
  display: grid;
  gap:1rem;
  box-sizing: border-box;
  padding: 1rem;
}
</style>
