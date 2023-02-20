<!-- eslint-disable prettier/prettier -->
<script>
export default {

  components: [

  ],
  extends: null,

  emits: null,

  props: ["nodes"],

  provide: null,
  
  inject: null,

  mixins: null,

  data() { return {
    items: [],
    inserting: null,
    adder: null,
    maxId: 8,
  }},

  methods: {
    toggle: function(item) {
      if (this.inserting) {
        this.saveOrCancel()
        this.$refs.input.style.visibility = "hidden"
        this.inserting = null
      }
      item.expanded = !item.expanded
      let n = this.items.indexOf(item)
      if (item.expanded) {
        let i = 1
        item.children.forEach(c => {
          c.parent = item
          this.items.splice(n + i, 0, c)
          i++
        })
      }
      else {
        let i = n + 1
        let count = 0
        let length = this.items.length
        while (i < length && this.items[i].level > item.level) {
          i++
          count++
        }
        if (count) {
          this.items.splice(n + 1, count)
        }
      }
    },

    setLeft: function(level) {
      this.$refs.input.style.left = level * 40 + "px"
    },

    insert: function(e, item) {
      this.setLeft(item.level)
      let top = 1
      if (this.inserting && !this.$refs.input.value) {
        if(this.items.indexOf(this.inserting) < this.items.indexOf(item)) {
          top = 0
        }
      }
      if (item.expanded) {
        top += item.children.length 
      }
      this.saveOrCancel()
      this.$refs.input.style.top = e.target.offsetTop + e.target.offsetHeight * top + "px"
      this.$refs.input.style.visibility = "visible"
      this.$refs.input.focus()
      this.$refs.input.value = ""
      this.inserting = {
        id:0,
        title:null,
        level: item.level,
        parent: item.parent,
        nextTo: item,
        children: [],
      }
      let i = this.items.indexOf(item) + 1
      let length = this.items.length
      while (i < length && this.items[i].level > item.level) {
          i++
        }
      this.items.splice(i, 0, this.inserting)
      this.adder = item
    },

    saveItem: function() {
      let item = this.inserting
      if (item.id == 0) {
        item.id = this.maxId
        this.maxId++
      }
      item.title = this.$refs.input.value
      if (item.parent) {
        let siblings = item.parent.children
        if (!siblings) {
          return
        }
        siblings.splice(siblings.indexOf(this.inserting.nextTo) + 1, 0, item)
      }
    },

    addItem: function() {
      let item = this.inserting
      if (item.level != this.adder.level) {
        this.adder.expanded = true
      }
      this.saveItem()
      this.insert({target: this.$refs.input}, item)
    },

    saveOrCancel: function() {
      if (!this.inserting) {
        return
      }
      let val = this.$refs.input.value
      if(val != "" && val != null) {
        this.saveItem()
      }
      else {
        this.items.splice(this.items.indexOf(this.inserting), 1)
      }
    },

    switchLevel(e){
      let item = this.inserting
      if (item.id) {
        this.saveOrCancel(item)
        return
      }
      let i = this.items.indexOf(item) - 1
      let upper = this.items[i]
      if (this.adder.children.length != 0) {
        this.saveOrCancel(item)
        return
      }
      e.preventDefault()
      if (item.level == this.adder.level) {
        item.level++
        item.parent = upper
      } else {
        item.level--
        item.parent = upper.parent
      }
      this.setLeft(item.level)
    }
  },

  filters: {

  },

  computed: {
  },

  watch: {

  },

  expose: null,

  created() {
    this.items = this.nodes
  },

  mounted() {

  },

  unmounted() {

  },

  errorCaptured() {

  },

};
</script>
<!-- eslint-disable prettier/prettier -->
<template>
    <div class="item" v-for="item in items" :key="item.id"
        :style="'margin-left: ' + item.level * 40 +'px;text-align:left;'">
        <button v-if="item.children?.length > 0" @click="toggle(item)">
            {{ item.expanded ? "V" : ">" }}
        </button>
        <div class="title">{{ item.title }}</div>
        <button @click="insert($event, item)">+</button>
    </div>
    <input v-focus class="tree-container" ref="input" type="text"
            style="visibility: hidden;"
            @keyup.enter.prevent="addItem()"
            @keyup.esc.prevent="cancelEditing()"
            @keydown.tab="switchLevel($event)"/>
</template>
<!-- eslint-disable prettier/prettier -->
<style>
.tree-container {
  position: absolute;
  z-index: 5;
}
.item {
  display: flex;

}
.item div{
  width: 500px;
  margin-right: 1rem;

}
button:first-child {
  margin-right: 4px;
}
button:last-child {
  margin-left: 4px;
}
.item input{
  margin-right: 1rem;
  padding: 4px;

}
</style>
