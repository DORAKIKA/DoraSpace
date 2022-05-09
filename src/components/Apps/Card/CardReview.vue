<template>
  <div id="CardReview">
    <div class="filterOption">
      <el-autocomplete
        class="search"
        v-model="searchValue"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
    </div>


    <div class="cardRead" ref="card">
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
      <kk-button @click="handleNext">下一篇</kk-button>
    </div>
    <div class="related">

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import kkButton from '../../../kk/kk-button';
export default {
  components:{kkButton},
  data(){
    return {
      searchValue: "",
      card:{content:""},
    }
  },
  computed:{
    ...mapGetters(['CardData']),
    category(){
      return this.CardData.categories&&this.CardData.categories[this.card.category] ? this.CardData.categories[this.card.category]:"";
    },
  },
  watch:{
    CardData(){
      this.switchCard()
    }
  },
  methods:{
    querySearch(queryString, cb) {
      var cards = this.CardData.cards;
      var results = [];

      for(let key in cards){
        if(cards[key].title.indexOf(queryString) !== -1){
          results.push({...cards[key],value:cards[key].title});
        }
      }

      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
      this.switchCard(item.cid)
    },
    switchCard(id){
      if(!this.CardData.cards)return;
      if(id){
        this.card = this.CardData.cards[id];
      }else{
        let cids = Object.keys(this.CardData.cards);
        let random = Math.floor(Math.random()*cids.length);
        this.card = this.CardData.cards[cids[random]];
      }
    },
    handleNext(){
      this.switchCard();
      this.$refs.card.scrollIntoView()
    }
  },
  mounted(){
    this.switchCard()
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
.filterOption .search{
  width: 100%;
}
.filterOption input{
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
  box-shadow: 0 0 0 1rem rgba(255, 255, 255, 0.9) inset;
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
}
</style>