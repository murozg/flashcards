<script>
import MyToolbar from "../components/MyToolbar.vue";
import MyFab from "../components/MyFab.vue";
export default {
  inject: ["dataService"],
  components: {
    MyToolbar,
    MyFab,
  },
  props: ["id"],
  data() {
    return {
      count: 0,
      status: "",
      reverse: "",
      current: 0,
      cards: [],
      isCompleted: false,
      pageTitle: this.dataService.getDeck(this.id).title,
      sliding: "",
    };
  },
  methods: {
    iterate(i) {
      let n = this.current;
      this.sliding = "slide-out" + (i == 1 ? "-right" : "-left");
      do {
        n = n + i;
        if (n == -1) n = this.cards.length - 1;
        if (n == this.cards.length) n = 0;
      } while (n != this.current && this.cards[n].number2 == -2);
      if (n == this.current) {
        setTimeout(() => {
          this.sliding = "slide-in-right";
          this.isCompleted = true;
          if (this.status != "") this.flip();
        }, 200);
      } else {
        this.status = "";
        setTimeout(() => {
          this.current = n;
          this.sliding = "slide-in" + (i == 1 ? "-right" : "-left");
        }, 200);
      }
    },
    back() {
      this.sliding = "";
      this.iterate(-1);
    },
    forward() {
      this.sliding = "";
      this.iterate(+1);
    },
    check() {
      this.sliding = "";
      this.card.number2 = -2;
      this.dataService.saveCards();
      this.forward();
    },
    flip() {
      if (this.status == "") this.status = "rotate";
      else this.status = "";
    },
  },
  computed: {
    card: function () {
      return this.cards[this.current];
    },
  },
  created() {
    this.cards = this.dataService.getCards(this.id);
    if (this.cards?.length == 0) this.$router.push("/");
  },
  mounted() {
    if (this.cards?.length == 0) return;
    if (this.cards[0].number2 == -2) this.iterate(1);
  },
};
</script>

<template>
  <div class="wrapper">
    <my-toolbar up="MyDecks" :title="pageTitle" />
    <div class="playground" :class="sliding">
      <div class="flip-card">
        <div ref="flipper" class="flip-card-inner" :class="status">
          <div
            v-if="isCompleted"
            class="flip-card-front iconbutton icon"
            @click="this.$router.go(-1)"
          >
            <svg>
              <use xlink:href="#icon-check"></use>
            </svg>
          </div>
          <div v-else class="flip-card-front" @click="flip">
            <h3>{{ card.title }}</h3>
          </div>
          <div class="flip-card-back" @click="flip">
            <h3>{{ card.detail }}</h3>
          </div>
        </div>
      </div>
    </div>
    <my-fab
      v-if="!isCompleted"
      side="left"
      icon="#icon-back"
      @clicked="back()"
    />
    <my-fab
      v-if="status != '' && !isCompleted"
      side="center"
      @clicked="check()"
      icon="#icon-check"
    />
    <my-fab
      v-if="!isCompleted"
      side="right"
      @clicked="forward()"
      icon="#icon-forward"
    />
  </div>
</template>

<style scoped>
.flip-card {
  height: calc(50%);
  width: 50%;
  margin: auto;
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}
.playground {
  position: absolute;
  width: 100%;
  height: calc(100% - 164px);
  display: flex;
  justify-content: center;
}
/* This container is needed to position the front and back side */
.flip-card-inner {
  width: 100%;
  height: 100%;
  background-color: transparent;
  text-align: center;
  transition: transform 0.4s;
  transform-style: preserve-3d;
  box-shadow: 8px 8px 12px 2px var(--shadow);
}
.slide-out-right {
  animation: left-out 0.2s linear both;
}
.slide-out-left {
  animation: right-in 0.2s linear both reverse;
}
.slide-in-right {
  animation: right-in 0.2s linear both;
}
.slide-in-left {
  animation: left-out 0.2s linear both reverse;
}
@keyframes left-out {
  from {
    left: 0;
  }
  to {
    left: -100%;
  }
}
@keyframes right-in {
  from {
    left: 100%;
  }
  to {
    left: 0;
  }
}
h3 {
  margin: auto;
}
.rotate {
  transform: rotateY(180deg);
  box-shadow: -8px 8px 12px var(--shadow);
}
.flip-card-back,
.flip-card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--base);
  color: var(--primary);
  border-width: 1px;
  border-style: solid;
  border-color: var(--shadow);
  display: flex;
  justify-content: center;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
/* Do an horizontal flip when you move the mouse over the flip box container */
/* Position the front and back side */
.flip-card-back {
  color: var(--secondary);
  transform: rotateY(180deg);
}
</style>
