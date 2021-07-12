<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.flexContainer {
  position: relative;
  font-family: 'myFirstFont';
  font-size: 25px;

  &:hover {
    border-bottom: solid 1px black;
  }
  &::after {
    content: attr(data-value);
    color: red;
    white-space: pre-wrap;
    visibility: hidden;
  }
}

.flexInput {
  position: absolute;
  width: 100%;
  font: inherit;
  min-width: 1ch;
  border: none;
  outline: none;
  margin: 0px;
  padding: 0px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputFlex',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      defaultPlaceHolder: '·'
    };
  },
  mounted: function (): void {
    let spanContainerElement = this.$refs.spanContainer as HTMLSpanElement;
    spanContainerElement.dataset.value =
      this.modelValue != 'undefined' && this.modelValue
        ? this.modelValue
        : this.defaultPlaceHolder;
  },
  methods: {
    Event_OnInput(
      inputElement: HTMLInputElement,
      parentElement: HTMLSpanElement
    ): void {
      parentElement.dataset.value =
        inputElement.value === ''
          ? this.defaultPlaceHolder
          : inputElement.value;
      this.$emit('update:modelValue', inputElement.value);
    }
  }
});
</script>

<template>
  <span ref="spanContainer" class="flexContainer">
    <input
      class="flexInput"
      :value="modelValue"
      @input="Event_OnInput($event.target, $event.target.parentNode)"
      :placeholder="defaultPlaceHolder"
      size="1"
    />
  </span>
</template>
