<!-- eslint-disable prettier/prettier -->
<script>
import MyTreeView from "./MyTreeView.vue";
export default {
    components: [
        MyTreeView
    ],
    props: ["item"],
    data() { return {
        expanded: false
    }},
    methods: {
        toggle: function() {
            this.expanded = !this.expanded
        }
    },
    created() {
        console.log(this.item)
    }
}
</script>
<!-- eslint-disable prettier/prettier -->
<template>
    <div :style="'margin-left: ' + item.level * 40 +'px;'">
        erw
        <a v-if="item.children?.length > 0" :on-click="toggle()">
            {{expanded ? ">" : "v"}}
        </a>
        {{ item.title }}
        <a>+</a>
        <my-tree-view v-if="expanded" :nodes="item.children"/>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<style>
</style>