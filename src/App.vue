<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import InputFlex from './components/InputFlex.vue';
import { Doc } from './models/';
import './assets/app.scss';

export default defineComponent({
  name: 'App',
  components: {
    InputFlex
  },
  data() {
    return {
      doc: new Doc()
    };
  },
  methods: {
    OnClick_Btn(): void {
      this.doc.Header;
    }
  }
});
</script>

<template>
  <div class="grid">
    <div class="logo"><input-flex v-model="doc.Header.symbol" /></div>

    <div class="rightAlign">राग</div>
    <div class="colon">:</div>
    <div class="leftAlign"><input-flex v-model="doc.Header.raagam" /></div>
    <div class="rightAlign">आराेह</div>
    <div class="colon">:</div>
    <div class="leftAlign">
      <input-flex v-model="doc.Header.arohanam" />
    </div>

    <div class="rightAlign">ताल</div>
    <div class="colon">:</div>
    <div class="leftAlign">
      <input-flex v-model="doc.Header.taalam" />
    </div>
    <div class="rightAlign">अवरोह</div>
    <div class="colon">:</div>
    <div class="leftAlign">
      <input-flex v-model="doc.Header.avarohanam" />
    </div>
  </div>

  <br />
</template>
