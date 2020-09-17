<template>
  <div v-if="get_user!=null">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["get_user"]),
};
</script>

<style></style>
