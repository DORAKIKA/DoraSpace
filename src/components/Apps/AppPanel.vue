<template>
  <div id="AppPanel">
      <LinkClickPanel class="panelItem"></LinkClickPanel>
      <div class="panelItem"></div>
  </div>
</template>

<script>
import LinkClickPanel from './Panel/LinkClickPanel.vue';
export default {
  components:{
    LinkClickPanel,
  },
  mounted(){
    this.$store.dispatch('getLinkData');
  }
}
</script>

<style>
#AppPanel{
  flex: 1;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#AppPanel .panelItem{
  width: calc((100% - 1rem) / 2);
  height: 300px;
  background: var(--card-white);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}
@media screen and (max-width:600px){
#AppPanel .panelItem{
  width: 100%;
}
}
</style>