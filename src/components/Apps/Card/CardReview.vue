<template>
  <div id="CardReview">
    <div class="filterOption">
      <div class="option-item filterCategory">
        <el-select v-model="filterOptions.category" placeholder="分类">
          <el-option
            v-for="category in CardData.categories"
            :key="category.id"
            :value="category.id"
            :label="category.name"
            >
          </el-option>
        </el-select>
      </div>
      <div class="option-item filterTags">
        <el-select placeholder="标签" v-model="filterOptions.tags" multiple collapse-tags="">
          <el-option
            v-for="(tag,name) in CardData.tags"
            :key="name"
            :label="name"
            :value="name"
          ></el-option>
        </el-select>
      </div>
      <div class="option-item filterSearch">
        <el-input v-model="filterOptions.search" placeholder="搜索"></el-input>
      </div>
      <div class="option-item filterCommit"><el-button @click="doFilter">筛选》</el-button></div>
      <div class="option-item result">
        <el-select placeholder="结果" v-model="cardId" @change="selectChange">
          <el-option
            v-for="card in filterCards"
            :key="card.cid"
            :label="card.title"
            :value="card.cid"
          >

          </el-option>
        </el-select>
      </div>
    </div>

    <div class="cardRead">
      <div class="meta">
        <h1 class="title">{{card.title}}</h1>
        <div class="category">{{category.name}}</div>
        <div class="tags">
          <span class="tag" v-for="tag in card.tags" :key="tag">#{{tag}}</span>
        </div>
      </div>
      
      <mavon-editor
          v-model="card.content"
          toolbarsBackground="var(--bg)"
          :subfield="false"
          defaultOpen="preview"
          previewBackground="var(--card-white)"
          :boxShadow="false"
          :editable="false"
          codeStyle="monokai"
          :toolbars="{fullscreen:true,readmodel:true,navigation:true,subfield:true,preview:true}"
          :navigation="false"
      ></mavon-editor>
    </div>


    <div class="next">
      <el-button>下一篇</el-button>
    </div>
    <div class="related">

    </div>
  </div>
</template>

<script>
import VditorPreview from 'vditor/dist/method.min'
import { mapGetters } from 'vuex';
export default {
  data(){
    return {
      card:{content:""},
      cardHtml: "",
      filterOptions:{
        category: "",
        tags:[],
        search:"",
      },
      filterCards:[],
      cardId:""
    }
  },
  computed:{
    ...mapGetters(['CardData']),
    category(){
      return this.CardData.categories[this.card.category] ? this.CardData.categories[this.card.category]:"";
    },
  },
  methods:{
    updateToMd:async(_this)=>{
      _this.cardHtml = await VditorPreview.md2html(_this.card.content);
    },
    doFilter(){
      let cards = this.CardData.cards;
      this.filterCards.length = 0;
      for(let id in cards){
        if(this.filterOptions.category && cards[id].category !== this.filterOptions.category){
          continue;
        }
        if(this.filterOptions.tags.length){
          let tagCheck = false;
          for(let tag in this.filterOptions.tags){
            if(cards[id].tags.indexOf(this.filterOptions.tags[tag]) !== -1){
              tagCheck = true;
            }
          }
          if(!tagCheck){
            continue;
          }
        }
        //筛选搜索词
        this.filterCards.push(cards[id]);
      }
    },
    selectChange(){
      this.card = this.CardData.cards[this.cardId];
    },
    changeRandomCard(){
      let randomId = "c003"
      this.card = this.CardData.cards[randomId]?this.CardData.cards[randomId]:{content:""};
      this.updateToMd(this)
    }
  },
  mounted(){
    this.changeRandomCard();
  }
}
</script>

<style>
#CardReview{
  width: 100%;
}

.filterOption{
  padding: 1rem;
  border-radius: 8px;
  background: var(--card-white);
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.filterOption .option-item{
  width: calc((100% - 4rem) / 5);
}
.filterOption .option-item .el-select,
.filterOption .option-item button{
  width: 100%;
}
.filterOption .option-item input{
  background: var(--bg);
}


#CardReview .cardRead{
  padding: 1rem;
  background: var(--card-white);
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
#CardReview .next{
  padding: 1rem;
  background: var(--card-white);
  border-radius: 8px;
  margin-top: 1rem;
  text-align: right;
}

#CardReview .meta{
  display: flex;
  justify-content: center;
  align-items: center;
}

#CardReview .category{
  padding: 0.2rem;
  margin: 0.2rem 0.5rem;
  border-radius: 0.2rem;
  background: var(--theme-color);
  color: #fff;
  font-size: 0.8rem;
}
#CardReview .tag{
  padding: 0.2rem;
  margin: 0.2rem;
  font-size: 0.6rem;
  border-radius: 0.2rem;
  background: var(--theme-color);
  color: var(--theme-color);
  box-shadow: 0 0 0 2rem rgba(255, 255, 255, 0.7) inset;
  border: 1px solid var(--theme-color);
}

/* editor style */
#AppCard .markdown-body{
  --md-font-color: var(--font-color);
  --md-blockquote: #333;
  --opacity-color: rgba(255,255,255,0.1);

  color: var(--md-font-color);
  border: none;
  width: 100%;
}
#AppCard .cardRead .markdown-body{
  margin-top: 1rem;
}
[data-theme="dark"] #AppCard .markdown-body{
  --md-blockquote: #999;
  --opacity-color: rgba(22,22,22,0.5);
}
#AppCard .v-note-wrapper{
  background: var(--card-white);
}
#AppReview .v-note-wrapper .v-note-op{
  border: 1px solid var(--md-font-color);
  width: fit-content;
}
#CardReview .v-note-wrapper .v-note-op .v-right-item{
  min-width: 100%;
}
#AppCard .v-note-wrapper .v-note-panel{
  padding: 1rem 0;
}
#AppCard .v-note-wrapper .v-note-panel .v-note-navigation-wrapper{
  background: var(--card-white);
}
#AppCard .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper{
  background: var(--card-white)!important;
}
#AppCard .auto-textarea-wrapper .auto-textarea-input{
  background: var(--card-white);
  color: var(--font-color);
}

#AppCard .markdown-body a{
  color: var(--theme-color);
}
#AppCard .markdown-body blockquote{
  color: var(--md-blockquote);
  background: rgba(180, 210, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
}
#AppCard .markdown-body code:not([class^="lang"]){
  background: var(--theme-color);
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0.8) inset;
  color: var(--theme-color);
}
#AppCard .markdown-body pre{
  background: #212121;
  position: relative;
  padding: 2.5rem 1rem 1rem;
  box-shadow: 0 2rem 0 #1c1c1c inset;
  color: #eee;
}
#AppCard .markdown-body pre:before{
	content: "";
	position: absolute;
	width: 1rem;
	height: 1rem;
	left: 1rem;
	top: 0.5rem;
	border-radius: 50%;
	background-color: #fc625d;
	box-shadow: 1.4rem 0 0 #fdbc40,
				2.8rem 0 0 #35cd4b;
  z-index: 1;
}
#AppCard .markdown-body .hljs{
  background: #212121;
}
#AppCard .markdown-body table tr{
  color: #333;
}
#AppCard .markdown-body hr{
  border-bottom: 2px dashed var(--font-color);
  height: 0;
  background: transparent;
}
@media screen and (max-width:900px) {
  #CardReview .cardRead{
    padding: 1rem 0;
  }
  .filterOption .option-item{
    width: 100%;
    margin: 0.2rem 0;
  }
  .filterOption .option-item input,
  .filterOption .option-item button{
    width: 100%;
  }
}
</style>