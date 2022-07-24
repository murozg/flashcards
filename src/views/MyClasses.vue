<script>
import MyModal from "../components/MyModal.vue";
import ListItem from "../components/ListItem.vue";
import MyToolbar from "../components/MyToolbar.vue";
import MyFab from "../components/MyFab.vue";
export default {
  inject: ["dataService"],
  components: {
    MyToolbar,
    MyFab,
    ListItem,
    MyModal,
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
