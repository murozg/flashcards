<script>
export default {
  props: ["side", "icon"],
};
</script>

<template>
  <div class="fab-container" :class="side" @click="$emit('clicked')">
    <div class="iconbutton icon">
      <svg><use :xlink:href="icon" /></svg>
    </div>
  </div>
</template>

<style scoped>
.right {
  right: 48px;
}
.left {
  left: 48px;
}
.center {
  left: 50%;
  transform: translateX(-50%);
}
.fab-container {
  position: fixed;
  width: 48px;
  bottom: 48px;
  cursor: pointer;
}
.iconbutton {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background: var(--secondary);
  color: var(--light);
  box-shadow: 4px 4px 6px var(--shadow);
}
.iconbutton:active {
  box-shadow: 2px 2px 6px var(--shadow);
  transform: translateY(4px) translateX(4px);
}
</style>
