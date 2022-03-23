<template>
  <div id="app">
    <el-container>
      <AppNav
        ref="nav"
        :pageShow="pageShow"
        :showSetting="showSetting"
        ></AppNav>
      <el-main>
          <AppCard v-show="pageShow=='AppCard'"></AppCard>
          <AppSetting v-show="pageShow=='AppSetting'"></AppSetting>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import AppNav from './components/Layout/AppNav.vue'
import AppCard from './components/Apps/AppCard.vue'
import AppSetting from './components/Apps/AppSetting.vue'

import 'animate.css'

export default {
  name: 'App',
  data() {
    return {
      pageShow: 'AppCard',
      isSetting: false,
      NotionDataBase:{
        "object": "list",
        "results": [
            {
                "object": "page",
                "id": "46f6030e-f51d-4671-aa6d-f53a01cf29ce",
                "created_time": "2021-10-23T06:26:00.000Z",
                "last_edited_time": "2022-03-23T03:05:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "9915cfd8-deec-4de8-b17b-881c708d0a4c"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "9915cfd8-deec-4de8-b17b-881c708d0a4c"
                },
                "cover": null,
                "icon": {
                    "type": "emoji",
                    "emoji": "🤣"
                },
                "parent": {
                    "type": "database_id",
                    "database_id": "0bb39edb-4952-4252-9e31-6b5162ee9f58"
                },
                "archived": false,
                "properties": {
                    "Tags": {
                        "id": "AAWe",
                        "type": "multi_select",
                        "multi_select": [
                            {
                                "id": "1c6fb160-91fe-4bed-8e2b-ad80993b6685",
                                "name": "小知识",
                                "color": "blue"
                            }
                        ]
                    },
                    "Created": {
                        "id": "E%3AqR",
                        "type": "created_time",
                        "created_time": "2021-10-23T06:26:00.000Z"
                    },
                    "Category": {
                        "id": "ZC%5BM",
                        "type": "select",
                        "select": {
                            "id": "f8589529-86a9-4c4b-a933-a988f5393731",
                            "name": "旅行",
                            "color": "red"
                        }
                    },
                    "ReviewTime": {
                        "id": "m_%3BM",
                        "type": "rich_text",
                        "rich_text": []
                    },
                    "Name": {
                        "id": "title",
                        "type": "title",
                        "title": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "Card3",
                                    "link": null
                                },
                                "annotations": {
                                    "bold": false,
                                    "italic": false,
                                    "strikethrough": false,
                                    "underline": false,
                                    "code": false,
                                    "color": "default"
                                },
                                "plain_text": "Card3",
                                "href": null
                            }
                        ]
                    }
                },
                "url": "https://www.notion.so/Card3-46f6030ef51d4671aa6df53a01cf29ce"
            },
            {
                "object": "page",
                "id": "13f088b3-7e14-4066-b33b-4de63545e57d",
                "created_time": "2021-10-21T15:08:00.000Z",
                "last_edited_time": "2022-03-23T03:05:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "f75b8e3e-0637-4bd6-b503-82f8b37ecaf9"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "9915cfd8-deec-4de8-b17b-881c708d0a4c"
                },
                "cover": null,
                "icon": {
                    "type": "emoji",
                    "emoji": "🙂"
                },
                "parent": {
                    "type": "database_id",
                    "database_id": "0bb39edb-4952-4252-9e31-6b5162ee9f58"
                },
                "archived": false,
                "properties": {
                    "Tags": {
                        "id": "AAWe",
                        "type": "multi_select",
                        "multi_select": [
                            {
                                "id": "5638119e-7d65-4918-9865-3ddfdf92c891",
                                "name": "Notion",
                                "color": "purple"
                            },
                            {
                                "id": "aac51754-8139-4201-a750-6a3a17a43999",
                                "name": "Anki",
                                "color": "default"
                            }
                        ]
                    },
                    "Created": {
                        "id": "E%3AqR",
                        "type": "created_time",
                        "created_time": "2021-10-21T15:08:00.000Z"
                    },
                    "Category": {
                        "id": "ZC%5BM",
                        "type": "select",
                        "select": {
                            "id": "b5e6db6a-4426-4798-87ee-061ff433778d",
                            "name": "前端",
                            "color": "blue"
                        }
                    },
                    "ReviewTime": {
                        "id": "m_%3BM",
                        "type": "rich_text",
                        "rich_text": []
                    },
                    "Name": {
                        "id": "title",
                        "type": "title",
                        "title": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "Card2",
                                    "link": null
                                },
                                "annotations": {
                                    "bold": false,
                                    "italic": false,
                                    "strikethrough": false,
                                    "underline": false,
                                    "code": false,
                                    "color": "default"
                                },
                                "plain_text": "Card2",
                                "href": null
                            }
                        ]
                    }
                },
                "url": "https://www.notion.so/Card2-13f088b37e144066b33b4de63545e57d"
            },
            {
                "object": "page",
                "id": "4a2466b5-44ee-40fb-baf8-a57b6a251d7f",
                "created_time": "2021-10-17T08:02:00.000Z",
                "last_edited_time": "2022-03-23T03:05:00.000Z",
                "created_by": {
                    "object": "user",
                    "id": "9915cfd8-deec-4de8-b17b-881c708d0a4c"
                },
                "last_edited_by": {
                    "object": "user",
                    "id": "9915cfd8-deec-4de8-b17b-881c708d0a4c"
                },
                "cover": null,
                "icon": {
                    "type": "emoji",
                    "emoji": "🥲"
                },
                "parent": {
                    "type": "database_id",
                    "database_id": "0bb39edb-4952-4252-9e31-6b5162ee9f58"
                },
                "archived": false,
                "properties": {
                    "Tags": {
                        "id": "AAWe",
                        "type": "multi_select",
                        "multi_select": [
                            {
                                "id": "6d0bbb95-cb6f-4131-9501-649cca2c4c65",
                                "name": "星座",
                                "color": "red"
                            }
                        ]
                    },
                    "Created": {
                        "id": "E%3AqR",
                        "type": "created_time",
                        "created_time": "2021-10-17T08:02:00.000Z"
                    },
                    "Category": {
                        "id": "ZC%5BM",
                        "type": "select",
                        "select": {
                            "id": "7d5378ac-8761-4662-9008-2d2daa77ffeb",
                            "name": "天文",
                            "color": "green"
                        }
                    },
                    "ReviewTime": {
                        "id": "m_%3BM",
                        "type": "rich_text",
                        "rich_text": []
                    },
                    "Name": {
                        "id": "title",
                        "type": "title",
                        "title": [
                            {
                                "type": "text",
                                "text": {
                                    "content": "Card1",
                                    "link": null
                                },
                                "annotations": {
                                    "bold": false,
                                    "italic": false,
                                    "strikethrough": false,
                                    "underline": false,
                                    "code": false,
                                    "color": "default"
                                },
                                "plain_text": "Card1",
                                "href": null
                            }
                        ]
                    }
                },
                "url": "https://www.notion.so/Card1-4a2466b544ee40fbbaf8a57b6a251d7f"
            }
        ],
        "next_cursor": null,
        "has_more": false,
        "type": "page",
        "page": {}
    }
    }
  },
  components: {
    AppNav,
    AppCard,
    AppSetting,
  },
  methods: {
    switchPage(id){
      // console.log(id)
      this.pageShow = id;
    },
    showSetting(b=true){
      if(!b)(this.$refs.nav.$refs.asideMenu._data.activeIndex = this.pageShow);
      this.isSetting = b;
      // if(!b)this.switchPage(this.pageShow);
    }
  },
  mounted() {
    this.$bus.$on("switchPage",this.switchPage);
    console.log(this)
  },
  beforeDestroy() {
    this.$bus.$off("switchPage");
  },
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
:root{
  --theme-color: #5588ff;
  --theme-light-color: #e7eeff;
}
html,body{
  font-size: 16px;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
  /* background: #e2eeff; */
  background: url('./assets/background.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
}

main.el-main{
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>
