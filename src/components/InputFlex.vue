<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.flexContainer {
  position: relative;
  font-family: "myFirstFont";
  font-size: 25px;

  &:hover {
    border-bottom: solid 1px black;
  }
  &::after {
    content: attr(data-value);
    color: red;
    white-space: break-spaces;
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputFlex",
  props: {
    modelValue: String,
    maxLength: Number,
    cssClass: String,
    maxWidth: Number
  },
  emits: ["update:modelValue"],
  data() {
    return {
      defaultPlaceHolder: "·",
      defaultLength: !this.maxLength || this.maxLength < 1 ? 20 : this.maxLength,
      defaultWidth: !this.maxWidth || this.maxWidth < 1 ? 405 : this.maxWidth,
      underLine: this.cssClass,
      dotBelow: "\u0323", //
      lineBelow: "\u0332"// "\u005F" --underline
    };
  },
  mounted: function (): void {
    let spanContainerElement = this.$refs.spanContainer as HTMLSpanElement;
    spanContainerElement.dataset.value =
      this.modelValue != "undefined" && this.modelValue
        ? this.modelValue
        : this.defaultPlaceHolder;

  },
  methods: {
    getTextWidth(inp:HTMLInputElement, moreData:string) :number {
    // re-use canvas object for better performance
    // var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    let text = inp.value + moreData;
    //let font = inp
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d") ?? new CanvasRenderingContext2D();
    context.font = "25px myFirstFont";
    var metrics = context.measureText(text);
    return metrics.width;
    },
    Event_OnInput(inputElement: HTMLInputElement, parentElement: HTMLSpanElement): void {
      parentElement.dataset.value = inputElement.value === "" ? this.defaultPlaceHolder : inputElement.value.replace(/ /g, "_");
      this.$emit("update:modelValue", inputElement.value);
    },
    async Event_OnPaste(evt:ClipboardEvent)
    {
      let inp = evt.target as HTMLInputElement;
      let clipBoardData = evt.clipboardData?.getData('text') ?? "";
      let textWidth = this.getTextWidth(inp,clipBoardData);
      if (textWidth >= this.defaultWidth ) {
        evt.preventDefault();
      }
    },
    async Event_KeyDown(evt:KeyboardEvent) {
      let inp = evt.target as HTMLInputElement;
      let textWidth = this.getTextWidth(inp,"");
      
      if (textWidth >= this.defaultWidth ) {
        const shortcuts:Array<string> = ['Control','Shift', 'Alt','ArrowLeft',"ArrowRight", "Backspace","Delete","Home","End", "a"];
        if (! shortcuts.includes(evt.key))
        {
          evt.preventDefault();
        }
        if (!evt.ctrlKey && evt.key.toLocaleLowerCase() === "a") { // Ctrl+a
           evt.preventDefault();
        }
        if (evt.ctrlKey && evt.key.toLocaleLowerCase() == "v") {
          console.log("clipboard paste");
          evt.preventDefault();
        }
      }

      const shortcuts:{[id:string]:string} = {};
      shortcuts["u"] = this.lineBelow;
      shortcuts["."] = this.dotBelow;
      let specialCharacter = shortcuts[evt.key.toLocaleLowerCase()];
      if (evt.ctrlKey && specialCharacter) {
        let inp = evt.target as HTMLInputElement;
        let startIdx = inp.selectionStart ?? 0;
        let endIdx = inp.selectionEnd ?? inp.value.length-1;
        if (startIdx != endIdx || startIdx == 0)
        {
          evt.preventDefault();
          return;
        }

        let currIdx = inp.selectionStart ?? 0 ;
        console.log(`${currIdx} => ${inp.value[currIdx]}`);
        
        if (inp.value[currIdx-1] ==  specialCharacter || ( (currIdx -2 >= 0) && inp.value[currIdx-2] == specialCharacter ) )
        {
          evt.preventDefault();
          return;
        }

        let start = inp.value.slice(0,startIdx)
        let end = inp.value.slice(endIdx);

        inp.value = start + shortcuts[evt.key.toLocaleLowerCase()] + end ;

        inp.setSelectionRange(currIdx+1, currIdx+1);
        evt.preventDefault();
      }      
    }
  },
});
</script>

<template>
  <span ref="spanContainer" class="flexContainer">
    <input
      class="flexInput"
      :class="cssClass"
      :value="modelValue"
      @keydown="Event_KeyDown"
      @input="Event_OnInput($event.target, $event.target.parentNode, $event)"
      :placeholder="defaultPlaceHolder"
      size="1"
      @paste="Event_OnPaste"
    />
  </span>
  <!-- :maxlength="defaultLength" -->
</template>
      