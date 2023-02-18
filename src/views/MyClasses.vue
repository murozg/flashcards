<script>
import MyModal from "../components/MyModal.vue";
import ListItem from "../components/ListItem.vue";
import MyToolbar from "../components/MyToolbar.vue";
import MyFab from "../components/MyFab.vue";
import MyTreeView from "../components/MyTreeView.vue";
export default {
  inject: ["dataService"],
  components: {
    MyToolbar,
    MyFab,
    ListItem,
    MyModal,
    MyTreeView,
  },
  data() {
    return {
      myClasses: [],
      isModalVisible: false,
    };
  },
  methods: {
    gotoClass: function (e) {
      this.$router.push("/class/" + e);
    },
    newClass: function () {
      this.$refs.modal.show({
        id: 0,
        pageTitle: "Ders Ekle",
        titlePlaceholder: "Ders adı...",
        detailPlaceholder: "Detay...",
      });
      this.isModalVisible = true;
    },
    editItem(item) {
      this.$refs.modal.show({
        id: item.id,
        pageTitle: "Düzenle",
        title: item.title,
        detail: item.detail,
        number: item.number2,
      });
      this.isModalVisible = true;
    },
    add: function (id, title, detail, number) {
      if (id == 0) {
        let item = this.dataService.addClass(title, detail);
        this.gotoClass(item.id);
      } else {
        let item = this.myClasses.find((x) => x.id == id);
        item.title = title;
        item.detail = detail;
        item.number2 = number;
        this.save();
        this.cancel();
      }
    },
    save: function () {
      this.dataService.saveTable("classes", this.myClasses);
    },
    cancel: function () {
      this.isModalVisible = false;
    },
    remove: function (id) {
      this.dataService.deleteClass(id);
      this.myClasses = this.dataService.getClasses();
      this.cancel();
    },
  },
  created() {
    this.myClasses = this.dataService.getClasses();
    this.isModalVisible = false;
  },
};
</script>
<template>
  <div class="wrapper">
    <my-toolbar up="" title="Derslerim" />
    <my-tree-view
      :nodes="[
        {
          id: 0,
          level: 0,
          title: 'test1',
          children: [
            { id: 0, level: 1, title: 'test1', children: [] },
            { id: 1, level: 1, title: 'test2', children: [] },
          ],
        },
        {
          id: 1,
          level: 0,
          title: 'test2',
          children: [
            { id: 0, level: 1, title: 'test1', children: [] },
            { id: 1, level: 1, title: 'test2', children: [] },
          ],
        },
      ]"
    ></my-tree-view>
    <div class="list">
      <div v-for="item in myClasses" :key="item.id" class="list">
        <list-item
          :title="item.title"
          :detail="item.detail"
          :number="item.number2"
          @clicked="() => gotoClass(item.id)"
          @edit="() => editItem(item)"
        />
      </div>
    </div>
    <my-modal
      ref="modal"
      v-show="isModalVisible"
      @closed="cancel"
      @remove="(id) => remove(id)"
      @ok="
        (id, title, detail, number) => {
          this.add(id, title, detail, number);
        }
      "
    />
    <my-fab side="right" icon="#icon-plus" @clicked="newClass()" />
  </div>
</template>
