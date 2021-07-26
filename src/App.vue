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
.box {
  padding:1px 7px 2px 7px;
  width:500px; height:100px;  
  border:solid 1px #000;
  border-color:transparent transparent black transparent;
  border-radius: 0% 0% 50% 50%;  
  font-family: 'myFirstFont';
  font-size: 25px;  
}
.box1 {
  @extend .box;
  // content: "\0323";
  // text-emphasis-style: dot;
  // text-emphasis-position: under left;
}
.box2 {
  font-family: 'myFirstFont';
  font-size: 25px;  
  content: "\0323";
}
.spn {
  border: 0px;
  outline: 0px;
}
.txtbx {
  font-family: 'myFirstFont';
  font-size: 25px;    
}
.editor {
  width: 1024px;
  height: 600px;
  text-align: left;
}
// .monaco-editor .view-line {
//     text-align: left;
// }
.addBtn
{
  float:right;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import InputFlex from './components/InputFlex.vue';
import { Doc, Section } from './models/';
import './assets/app.scss';
import { Taalam } from './models/Taalam';
import * as MonacoEditor from 'monaco-editor';


export default defineComponent({
  name: 'App',
  components: {
    InputFlex,
    MonacoEditor
  },
  data() {
    return {
      doc: new Doc(Taalam.Jhaptaal),
      simpleTxt:"--",
      dotBelow: "\u0323", //"\u005F",
      lineBelow: "\u0332"
    };
  },
  mounted:function():void {
    let dv:HTMLElement = document.getElementById("edit") ?? this.$refs.myedit as HTMLElement;
    MonacoEditor.editor.create(dv, { 
      value:'hello monaco', 
      selectOnLineNumbers:false, 
      fontSize:20, 
      fontFamily:'Arial' ,
      minimap:{enabled:false},
      lineNumbers:"off"
    });

    MonacoEditor.editor.getModels()[0].onDidChangeContent((e) => {
      console.log(e.changes[0].text);
    })
    // var range = MonacoEditor.editor.getModels()[0].getFullModelRange();
    // console.log(range.getStartPosition().column);
    
  },
  methods: {
    OnClick_Btn(): void {
      this.doc.Header;
    },
    work(): void {
      let uull = document.getElementById("uul");
       console.log(uull?.innerHTML);
    },
    binder(evt:KeyboardEvent): void {
      //evt.preventDefault();
      // console.log(evt.ctrlKey);
      // console.log(evt.code);
      const shortcuts:{[id:string]:string} = {};
      shortcuts["u"] = this.lineBelow;
      shortcuts["."] = this.dotBelow;
      if (evt.ctrlKey && shortcuts[evt.key.toLocaleLowerCase()]) {
        let inp = evt.target as HTMLInputElement;
        let startIdx = inp.selectionStart ?? 0;
        let endIdx = inp.selectionEnd ?? inp.value.length;
        if (startIdx != endIdx)
        {
          evt.preventDefault();
          return;
        }

        let currIdx = inp.selectionStart ?? 0 ;
        let start = inp.value.slice(0,startIdx)
        let end = inp.value.slice(endIdx);
        inp.value = start + shortcuts[evt.key.toLocaleLowerCase()] + end ;

        inp.setSelectionRange(currIdx, currIdx);
        evt.preventDefault();
        //console.log(inp.value.slice(0,inp.selectionStart ?? 0));
        //console.log(inp.value.slice(inp.selectionEnd ?? inp.value.length));
        //console.log("Underline");
      }
    //   if (evt.data === "."){
    //     //var spn = evt.target as HTMLSpanElement;
    //     //console.log(spn.innerHTML);
    //  }
      
      //spn.dataset.value = spn.innerHTML;
      
      //evt.preventDefault();
      //console.log(evt);
    },
    OnClick_AddSection():void {
      //let documentSections = this.$refs.documentSections;
      let section = new Section();
      this.doc.Body.Sections.push(section);
      console.log(this.doc.taalam);
      
      //documentSections.
    },
    OnClick_AddRow(section:Section):void {
      //let tbl = document.getElementById(container);
      //console.log(container);
      this.doc.AddRow(section)

      //this.doc.Body.Sections[0].rows[0].cols
    }
  }
});
</script>

<template>
  <div class="grid">
    <div class="logo"><input-flex v-model="doc.Header.symbol" :maxLength="1" cssClass="doubleUnderLine"/></div>

    <div><span class="labelContainer">राग</span></div>
    <div class="colon">:</div>
    <div class="leftAlign"><input-flex v-model="doc.Header.raagam" :maxLength="18" /></div>
    <div><span class="labelContainer">आराेह</span></div>
    <div class="colon">:</div>
    <div class="leftAlign"><input-flex v-model="doc.Header.arohanam" /></div>

    <div><span class="labelContainer">ताल</span></div>
    <div class="colon">:</div>
    <div class="leftAlign"><input-flex v-model="doc.Header.taalam" :maxLength="18" /></div>
    <div><span class="labelContainer">अवरोह</span></div>
    <div class="colon">:</div>
    <div class="leftAlign"><input-flex v-model="doc.Header.avarohanam" /></div>
  </div>

<button class="addBtn" @click="OnClick_AddSection()">Add Section</button>
<br />
<hr />
<div ref="documentSections" v-for="section in doc.Body.Sections" :key="section">
  <div :id="section.id">
      <div class="bodyGrid">
        <div class="logo"><input-flex v-model="section.sectionHeader" :maxLength="18" cssClass="doubleUnderLine" /></div>
      </div>
      <template v-for="row in section.rows" :key="row">
        <div :id="row.id" class="bodyGrid">
            <template v-for="col in row.cols" :key="col">
              <div><input-flex v-model="col.Note.Swaram" /></div>
            </template>
        </div>
      </template>
      <button @click="OnClick_AddRow(section)">Add Row</button>
  </div>
</div>

<!-- <span class="box">सनि॒᳝</span><span class="box">र॒᳝म॒᳝</span><span class="box">राम</span><span class="box">ॐ&#803;</span>A&#803;
<br />
<span class="box">नि᳝ सा रे॒ म॔ प नि सां</span>
<br />
<span class="box">सां नि ध॒ प म॔ ग</span> <span class="box">रे॒ ग&#803;</span><span class="box"> रे॒ रे॒ </span>सा
<br />
<span class="box1" id="uul"><u>S&#803;</u></span> <u class="box2">N&#803;</u>  <span class="box1"><u style="border-bottom:1px solid black; text-decoration:none">D&#803;</u>Ḍ P&#803;</span>
<button @click="work">Get JavaSCript</button>
<span class="spn" contenteditable="true" @beforeinput="binder($event)">{{this.simpleTxt}}</span>
<hr />
HE{{this.lineBelow}}LḶỌ <br />
<br />-->


<input class="txtbx" @keydown="binder" /> 
<br />
<div ref="myedit" id="edt" class="editor">
  <monaco-editor  />
</div>

</template>
