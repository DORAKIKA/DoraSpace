<template>
  <div id="CardPanel">
    <div class="showInfo">
        <div class="item"><span class="key">分类</span><span class="value">{{this.$store.state.CardInfo.cardsInfo.categoryNum}}</span></div>
        <div class="item"><span class="key">标签</span><span class="value">{{this.$store.state.CardInfo.cardsInfo.tagNum}}</span></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#CardPanel>.showInfo{
  width: 30%;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}
#CardPanel>.showInfo>.item{
  height: 2rem;
  line-height: 2rem;
  width: 100%;
  margin: 4px;
  display: flex;
  font-size: 0.8rem;
  align-items: center;
}
#CardPanel>.showInfo>.item>.key{
  flex: 1;
}
#CardPanel>.showInfo>.item>.value{
  padding: 4px 8px;
  border-radius: 4px;
  background: #d7e0e3;
  color: #fff;
  line-height: 1rem;
}
@media screen and (max-width:900px){
  #CardPanel>.showInfo{
    width: 100%;
  }
}
</style>