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
      isModalVisible: false,
      pageTitle: "loading",
    };
  },
  methods: {
    letsGo: function () {
      this.$router.push(this.$route.path + "/letsgo");
    },
    newCard: function () {
      this.$refs.modal.show({
        id: 0,
        pageTitle: "Yeni Kart",
        titlePlaceholder: "Soru...",
        detailPlaceholder: "Cevap...",
      });
      this.isModalVisible = true;
    },
    add: function (id, title, detail, number) {
      if (id == 0) {
        this.dataService.addCard(title, detail, this.id);
        this.cancel();
        this.newCard();
      } else {
        let item = this.myCards.find((x) => x.id == id);
        item.title = title;
        item.detail = detail;
        item.number2 = number;
        this.cancel();
        this.dataService.saveCards();
      }
    },
    editCard(item) {
      this.$refs.modal.show({
        id: item.id,
        pageTitle: "Düzenle",
        title: item.title,
        detail: item.detail,
        number: item.number2,
      });
      this.isModalVisible = true;
    },
    cancel: function () {
      this.isModalVisible = false;
    },
    remove: function (id) {
      this.dataService.deleteCard(id);
      this.cancel();
    },
  },
  computed: {
    myCards() {
      return this.dataService.getCards(this.id);
    },
  },
  created() {
    this.isModalVisible = false;
    this.pageTitle = this.id
      ? this.dataService.getDeck(this.id)?.title
      : "error";
    if (this.pageTitle == null) {
      this.$router.push("/");
    }
  },
};
</script>
<template>
  <div class="wrapper">
    <my-toolbar up="MyDecks" :title="pageTitle" />
    <div class="list">
      <div v-for="item in myCards" :key="item.id" class="list">
        <list-item
          :title="item.title"
          :detail="item.detail"
          :number="item.number2"
          @clicked="editCard(item)"
          @edit="editCard(item)"
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
    <my-fab
      v-if="myCards.length > 0"
      side="center"
      icon="#icon-play"
      @clicked="letsGo()"
    />
    <my-fab side="right" icon="#icon-plus" @clicked="newCard()" />
  </div>
</template>
