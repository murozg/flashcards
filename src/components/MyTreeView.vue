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
    isInserting: false,
    inserting: null,
    editText: null,
    adder: null,
    maxId: 0,
  }},

  methods: {
    toggle: function(item) {
      if (this.isInserting) {
        this.saveOrCancel(this.inserting)
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
    insert: function(item) {
      if (this.isInserting) {
        this.saveOrCancel(this.inserting)
      }
      this.isInserting = true
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
      this.inserting.editing = true
    },

    saveItem: function(item) {
      if (item.id == 0) {
        item.id = this.maxId
      }
      item.title = this.editText
      this.editText = null
      item.editing = null
      this.isInserting = false
      if (item.parent) {
        let siblings = item.parent.children
        if (!siblings) {
          return
        }
        siblings.splice(siblings.indexOf(this.inserting.nextTo), 0, item)
      }
      this.inserting = null
    },

    addItem: function(item) {
      if (item.level != this.adder.level) {
        this.adder.expanded = true
      }
      this.saveItem(item)
      this.insert(item)
    },

    cancelEditing: function(item) {
      this.items.splice(this.items.indexOf(item), 1)
      this.isInserting = false
    },

    saveOrCancel: function(item) {
      this.isInserting = false
      this.inserting = null
      if(this.editText != "" && this.editText != null) {
        this.saveItem(item)
      }
      else {
          this.cancelEditing(item)
      }
    },

    textChanged(e) {
      this.editText = e.target.value
    },

    switchLevel(e, item){
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
    //this.flatten(this.nodes, 0)
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
    <div v-for="item in items" :key="item.id"
        :style="'margin-left: ' + item.level * 40 +'px;text-align:left;'">
        <button v-if="item.children?.length > 0" @click="toggle(item)">
            {{ item.expanded ? "V" : ">" }}
        </button>
        <input v-focus v-if="item.editing" type="text" :value="item.title"
            @input="textChanged" @keyup.enter.prevent="addItem(item)"
            @keyup.esc.prevent="cancelEditing(item)"
            @keydown.tab="switchLevel($event, item)"/>
        <span v-else>{{ item.title }}
            <a @click="insert(item)">+</a>
        </span>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<style>

</style>
