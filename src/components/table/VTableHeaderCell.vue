<template>
  <th class="table_header-cell">
    <div class="header_cell-content" :class="{ sortable }">
      <div class="header_cell-title">
        <slot></slot>
      </div>
      <div class="sort_actions" v-if="sortable">
        <span
          :class="{ active: isSortActionActive('asc') }"
          @click="asc"
          class="sort_action"
          >&triangle;</span
        >
        <span
          :class="{ active: isSortActionActive('desc') }"
          @click="desc"
          class="sort_action"
          >&triangledown;</span
        >
      </div>
    </div>
  </th>
</template>
<script setup lang="ts">
import type { SortOptions } from "@/stores/models";
import { computed, ref } from "@vue/reactivity";

const props = defineProps<{
  sortable?: boolean;
  name:string;
  sortOptions?: SortOptions;
}>();
const sortDirection = ref<"asc" | "desc" | undefined>(undefined);
const emit = defineEmits<{
    (event:"noSort"):void
    (event:"onSort",options:SortOptions):void
}>();
const isSortActionActive = (direction:"asc"|"desc")=>{
return props.sortOptions?.sortDirection === direction &&
props.sortOptions.sortBy === props.name
}
const asc = () => {
  if (sortDirection.value !== "asc" ) {
    sortDirection.value = "asc";
    emit("onSort",{sortBy:props.name,sortDirection:"asc"});
  } else {
    sortDirection.value = undefined;
    emit("noSort");
  }
};
const desc = () => {
  if (sortDirection.value !== "desc") {
    sortDirection.value = "desc";
    emit("onSort",{sortBy:props.name,sortDirection:"desc"});
  } else {
    sortDirection.value = undefined;
    emit("noSort");
  }
};
</script>
<style scoped lang="scss">
.header-cell.size-medium {
  height: 2rem;
}
.header_cell-content {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.header_cell-content:not(.sortable) {
  justify-content: center;
}
.sort_action {
  font-size: medium;
  color: green;
  line-height: 1rem;
  opacity: 0.5;
  transition: var(--common_transition);
}

.sort_action:hover, .active {
  cursor: pointer;
  opacity: 1;
  transition: var(--common_transition);
}
</style>
