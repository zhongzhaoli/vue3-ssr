<template>
  <div>{{ count }}</div>
  <button @click="addFun">新增</button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);

const addFun = () => {
  count.value++;
};
</script>
<style scoped></style>
