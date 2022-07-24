<script>
import MyModal from "../components/MyModal.vue";
import ListItem from "../components/ListItem.vue";
import MyToolbar from "../components/MyToolbar.vue";
import MyFab from "../components/MyFab.vue";
export default {
  inject: ["dataService"],
  components: {
    MyToolbar,
    ListItem,
    MyFab,
    MyModal,
  },
  props: ["id"],
  data() {
    return {
      pageTitle: "loading",
      myDecks: [],
      isModalVisible: false,
    };
  },
  methods: {
    gotoDeck: function (e) {
      this.$router.push("/class/" + this.id + "/deck/" + e);
    },
    newDeck: function () {
      this.$refs.modal.show({
        id: 0,
        pageTitle: "Konu Ekle",
        titlePlaceholder: "Konu adı...",
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
        let item = this.dataService.addDeck(title, detail, this.id);
        this.gotoDeck(item.id);
      } else {
        let item = this.myDecks.find((x) => x.id == id);
        item.title = title;
        item.detail = detail;
        item.number2 = number;
        this.save();
        this.cancel();
      }
    },
    save: function () {
      this.dataService.saveTable("decks", this.myDecks);
    },
    cancel: function () {
      this.isModalVisible = false;
    },
    remove: function (id) {
      this.dataService.deleteDeck(id);
      this.myDecks = this.dataService._decsk;
      this.cancel();
    },
  },
  created() {
    this.isModalVisible = false;
    this.pageTitle = this.id ? this.dataService.getClass(this.id)?.title : null;
    if (this.pageTitle == null) {
      this.$router.push("/");
    }
    this.myDecks = this.id ? this.dataService.getDecks(this.id) : [];
  },
};
</script>
<template>
  <div class="wrapper">
    <my-toolbar up="MyClasses" :title="pageTitle" />
    <div class="list">
      <div v-for="item in myDecks" :key="item.id">
        <list-item
          :title="item.title"
          :detail="item.detail"
          :number="item.number2"
          @clicked="() => gotoDeck(item.id)"
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
    <my-fab side="right" icon="#icon-plus" @clicked="newDeck()" />
  </div>
</template>
