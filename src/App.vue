<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import DataService from "./services/DataService";

export default {
  name: "App",
  data() {
    return {
      transitionName: "fade",
    };
  },
  provide() {
    return {
      dataService: new DataService(),
    };
  },
};
</script>

<style>
:root {
  --base: white;
  --primary: teal;
  --secondary: #a11692;
  --dark: #212121;
  --medium: #505050;
  --light: white;
  --shadow: rgba(0, 0, 0, 0.3);
  --modaltint: rgba(0, 0, 0, 0.3);
}
.slide-left-enter-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-right-leave-active {
  transition: left 0.3s ease-out;
}
.icon {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
}
.icon svg {
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
  margin: auto;
}
.slide-left-enter-from {
  left: 100%;
}
.slide-right-enter-to,
.slide-left-enter-to,
.slide-left-leave-from,
.slide-right-leave-from {
  left: 0;
}
.slide-left-leave-to {
  left: -100%;
}
.slide-right-enter-from {
  left: -100%;
}
.slide-right-leave-to {
  left: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.center {
  margin: auto auto;
}
.wrapper {
  background-color: var(--base);
  position: absolute;
  width: 100%;
  height: 100%;
}
body {
  margin: 0px;
  width: 100%;
  height: 100%;
  color: #212121;
  overflow: hidden;
}
.list {
  overflow-y: auto;
  max-height: calc(100% - 60px);
}
</style>
