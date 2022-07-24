<script>
export default {
  props: ["title", "detail", "number"],
};
</script>

<template>
  <div class="listitem" @click="$emit('clicked')">
    <div style="flex-grow: 1; margin: auto 0.25em">
      <div class="title">{{ title }}</div>
      <div class="detail">{{ detail }}</div>
    </div>
    <div v-if="number > -1" class="number">{{ number }}</div>
    <div v-if="number < -1" class="check icon">
      <svg><use xlink:href="#icon-check"></use></svg>
    </div>
    <div class="edit icon" @click.stop="$emit('edit')">
      <svg><use xlink:href="#icon-edit"></use></svg>
    </div>
  </div>
</template>

<style>
.listitem {
  width: 90%;
  margin: 8px auto;
  min-height: 60px;
  padding: 4px 0px 4px 8px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--shadow);
  display: flex;
  box-shadow: 4px 4px 6px var(--shadow);
}
.check {
  color: var(--secondary);
  margin: 4px;
}
.edit {
  color: var(--primary);
  margin: 4px;
}
.title {
  text-align: left;
  color: var(--dark);
  font-weight: bold;
  font-size: normal;
}
.detail {
  text-align: left;
  color: var(medium);
  font-size: small;
}
.number {
  margin: auto 0.25em;
  color: --var(medium);
  font-size: larger;
}
</style>
