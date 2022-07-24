<script>
export default {
  props: ["title", "up", "menu"],
  methods: {
    goup: function () {
      this.$router.go(-1);
    },
  },
};
</script>

<template>
  <div class="toolbar">
    <div class="icon" v-if="up != ''" @click="goup()">
      <svg><use xlink:href="#icon-back" /></svg>
    </div>
    <h2 class="grow1">{{ title }}</h2>
    <div v-if="menu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-menu m-2"
        width="24"
        height="24"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </div>
  </div>
</template>

<style>
.toolbar {
  width: 100%;
  height: 60px;
  margin: 0px;
  padding: 4px 4px 4px 0px;
  background-color: var(--primary);
  color: var(--light);
  display: flex;
}
.toolbar div {
  margin: auto 16px;
}
.grow1 {
  margin: auto;
  flex-grow: 1;
}
</style>
