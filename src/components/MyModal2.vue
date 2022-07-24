<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="$emit('closed')">
      <div class="modal" @click.stop="">
        <header class="modal-header">
          <h2>{{ pageTitle }}</h2>
          <div class="btn-close icon" @click="$emit('closed')">
            <svg><use xlink:href="#icon-cancel"></use></svg>
          </div>
        </header>
        <section class="modal-body">
          <input
            name="a"
            class="textinput"
            ref="modalInput"
            v-model="title"
            :placeholder="titlePlaceholder"
            maxlength="20"
          />
          <input
            class="textinput"
            v-model="detail"
            maxlength="150"
            :placeholder="detailPlaceholder"
          />
          <div v-if="number < 0" class="switcher">
            <label class="switch">
              <input
                id="tamam"
                type="checkbox"
                v-model="isChecked"
                :checked="isChecked"
              />
              <span class="slider"></span>
            </label>
            <label>Tamamdır</label>
          </div>
        </section>
        <footer class="modal-footer">
          <button
            type="button"
            class="icon btn-ok"
            @click="$emit('remove', id)"
          >
            <svg><use xlink:href="#icon-delete"></use></svg>
          </button>
          <button
            type="button"
            class="icon btn-ok"
            @click.prevent="$emit('ok', id, title, detail, isChecked ? -2 : -1)"
          >
            <svg><use xlink:href="#icon-check"></use></svg>
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  emits: ["ok", "closed", "remove"],
  methods: {
    show(fields) {
      this.id = fields.id ? fields.id : 0;
      this.title = fields.title;
      this.detail = fields.detail;
      this.number = fields.number;
      this.pageTitle = fields.pageTitle;
      this.titlePlaceholder = fields.titlePlaceholder;
      this.detailPlaceholder = fields.detailPlaceholder;
      if (this.number == -2) {
        this.isChecked = true;
      }
      this.$nextTick(function () {
        this.$refs.modalInput.focus();
      });
    },
  },
  data() {
    return {
      titlePlaceholder: "",
      detailPlaceholder: "",
      id: 0,
      title: "",
      detail: "",
      pageTitle: "",
      number: 0,
      isChecked: false,
    };
  },
};
</script>

<style>
.modal-backdrop {
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--modaltint);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  z-index: 1001;
  width: 80%;
  height: 40%;
  min-width: 400px;
  min-height: 400px;
  background: var(--base);
  box-shadow: 8px 8px 12px 4px var(--shadow);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.modal-header .modal-footer {
  padding: 16px;
}
.modal-header {
  position: relative;
  border-bottom: 1px solid var(--primary);
  color: var(--primary);
}
.modal-footer {
  display: flex;
  padding: 4px;
  justify-content: space-between;
  border-top: 1px solid var(--primary);
}
.modal-body {
  position: relative;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 4px;
  cursor: pointer;
  font-weight: bold;
  color: var(--secondary);
  background: transparent;
}
.btn-ok {
  height: 48px;
  width: 25%;
  color: var(--light);
  background: var(--secondary);
  display: inline-block;
  border: 1px solid var(--primary);
  border-radius: 2px;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.1s linear;
}
.textinput {
  font-size: large;
  display: block;
}
.switch {
  position: relative;
  margin: 0 auto;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--secondary);
  border-radius: 34px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--medium);
  border-radius: 50%;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:checked + .slider {
  background-color: var(--primary);
}
input:focus + .slider {
  box-shadow: 0 0 4px var(--shadow);
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.switcher {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
}
.switcher:last-child {
  font-size: "large";
  margin: 8px 0 0 0;
}
</style>
