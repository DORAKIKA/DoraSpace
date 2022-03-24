<template>
  <div id="app" :style="`--theme-color:${this.$store.state.AppInfo.config.themeColor}`">
    <el-container>
      <AppNav></AppNav>
      <el-main>
          <transition name="float">
            <router-view></router-view>
          </transition>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import AppNav from './components/Layout/AppNav.vue'

import 'animate.css'

export default {
  name: 'App',
  data() {
    return {
      NotionDataBase:{
            "object": "list",
            "results": [
                {
                    "object": "page",
                    "id": "46f6030e-f51d-4671-aa6d-f53a01cf29ce",
                    "created_time": "2021-10-23T06:26:00.000Z",
                    "last_edited_time": "2022-03-23T10:53:00.000Z",
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
                        "description": {
                            "id": "%3Ds%5BJ",
                            "type": "rich_text",
                            "rich_text": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "这里是DoraAnki使用手册",
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
                                    "plain_text": "这里是DoraAnki使用手册",
                                    "href": null
                                }
                            ]
                        },
                        "created": {
                            "id": "E%3AqR",
                            "type": "created_time",
                            "created_time": "2021-10-23T06:26:00.000Z"
                        },
                        "name": {
                            "id": "title",
                            "type": "title",
                            "title": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "Category3",
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
                                    "plain_text": "Category3",
                                    "href": null
                                }
                            ]
                        }
                    },
                    "url": "https://www.notion.so/Category3-46f6030ef51d4671aa6df53a01cf29ce"
                },
                {
                    "object": "page",
                    "id": "13f088b3-7e14-4066-b33b-4de63545e57d",
                    "created_time": "2021-10-21T15:08:00.000Z",
                    "last_edited_time": "2022-03-23T11:05:00.000Z",
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
                        "description": {
                            "id": "%3Ds%5BJ",
                            "type": "rich_text",
                            "rich_text": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "这是第二个分类",
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
                                    "plain_text": "这是第二个分类",
                                    "href": null
                                }
                            ]
                        },
                        "created": {
                            "id": "E%3AqR",
                            "type": "created_time",
                            "created_time": "2021-10-21T15:08:00.000Z"
                        },
                        "name": {
                            "id": "title",
                            "type": "title",
                            "title": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "Category2",
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
                                    "plain_text": "Category2",
                                    "href": null
                                }
                            ]
                        }
                    },
                    "url": "https://www.notion.so/Category2-13f088b37e144066b33b4de63545e57d"
                },
                {
                    "object": "page",
                    "id": "4a2466b5-44ee-40fb-baf8-a57b6a251d7f",
                    "created_time": "2021-10-17T08:02:00.000Z",
                    "last_edited_time": "2022-03-23T11:04:00.000Z",
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
                        "description": {
                            "id": "%3Ds%5BJ",
                            "type": "rich_text",
                            "rich_text": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "This is Category1",
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
                                    "plain_text": "This is Category1",
                                    "href": null
                                }
                            ]
                        },
                        "created": {
                            "id": "E%3AqR",
                            "type": "created_time",
                            "created_time": "2021-10-17T08:02:00.000Z"
                        },
                        "name": {
                            "id": "title",
                            "type": "title",
                            "title": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "Category1",
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
                                    "plain_text": "Category1",
                                    "href": null
                                }
                            ]
                        }
                    },
                    "url": "https://www.notion.so/Category1-4a2466b544ee40fbbaf8a57b6a251d7f"
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
  },
  methods: {
  },
  mounted() {
    // console.log(this)
      this.$store.dispatch('getConfig');
      console.log(this.$store.state.AppInfo)
  },
  beforeDestroy() {
  },
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
a{
    text-decoration: none;
}
:root{
  --theme-color: #5588ff;
  --theme-color2: #f70095;
  --theme-light-color: #e7eeff;
}
::-webkit-scrollbar{
    width: 8px;
    background: #fff;
}
::-webkit-scrollbar-thumb{
    width: 8px;
    border-radius: 4px;
    background: var(--theme-color);
    border: 1px solid #fff;
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
