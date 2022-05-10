export const config = {
    themeColor:"#386ade",
    isDark:false,
    customStyle: false,
    loginMode: '',
    Nav:{
        panel: {id:'AppPanel',name:'面板',icon:'iconfont icon-bodongtu',link:'/Panel',show:true},
        card: {id:'AppCard',name:'卡片',icon:'iconfont icon-cards',link:'/Card',show:true},
        task: {id:'AppTask',name:'任务',icon:'iconfont icon-jishi',link:'/Task',show:true},
        link: {id:'AppLink',name:'链接',icon:'iconfont icon-link',link:'/Link',show:true},
        diary: {id:'AppDiary',name:"日记",icon:'iconfont icon-rili',link:'/Diary',show:true},
        setting: {id:'AppSetting',name:'设置',icon:'iconfont icon-shezhi',link:'/Setting',show:true},
    },
    Panel:{
        showBilibiliHot: true,
        showWeiboHot: false,
        showZhihuHot: false,
        showHitokoto: true,
    },
    Card:{
        categoryExtended: true,
    },
    Link:{
        showLinkChart: true,
        chartLimit: 8,
        showNav: false,
    }
}

export const DefaultTodo = {
    presets: {
        'preset20220502':{
            id: 'preset20220502',
            content: 'LeetCode刷题',
            color: '#ffa116',
            onceTime: 25*60*1000,
        },
        'preset202205021':{
            id: 'preset202205021',
            content: '微信读书',
            color: '#30acfe',
            onceTime: 25*60*1000,
        },
    },
    history:{
        'preset20220502':{
            id: 'preset20220502',
            content: 'LeetCode刷题',
            color: '#ffa116',
            onceTime: 25*60*1000,
            history: {
                'taskH20220502':{
                    id: 'taskH20220502',
                    startTime: 1651459302265,
                    endTime: 1651461102265,
                    during: '30min',
                    remark: '完成了每日一题和几道训练题'
                }
            }
        },
        'preset202205021':{
            id: 'preset202205021',
            content: '微信读书',
            color: '#30acfe',
            onceTime: 25*60*1000,
        },
    }
}

export const localData = {
    "CARD_DATA": {
        "categories": {
            "b001": {
                "id": "b001",
                "name": "DoraSpace",
                "desc": "DoraSpace使用帮助",
                "cards": [
                    "c003",
                    "card1652102592390",
                    "card1649247836372",
                    "c002",
                    "c001",
                    "card1652103344399"
                ]
            }
        },
        "tags": {
            "配置": [
                "c001"
            ],
            "help": [
                "card1652102592390",
                "card1649247836372",
                "c002",
                "c001",
                "card1652103344399"
            ],
            "Markdown": [
                "c003"
            ]
        },
        "cards": {
            "c001": {
                "cid": "c001",
                "title": "设置页面",
                "category": "b001",
                "description": "使用之前的初始化操作",
                "tags": [
                    "配置",
                    "help"
                ],
                "process": 74,
                "content": "## 设置功能\n- 使用切换账号按钮可进行重新登录\n- 可切换主题色与昼夜模式\n- 可控制部分页面元素的显示隐藏\n- 可设置数据面板的各个参数"
            },
            "c002": {
                "cid": "c002",
                "title": "卡片页面",
                "description": "卡片页面使用说明",
                "category": "b001",
                "tags": [
                    "help"
                ],
                "process": 34,
                "content": "### 添加分类\n- 点击分类页面上方加号，可进行分类添加\n### 删除分类\n- 点击分类右方删除按钮，可以进行删除\n### 编辑分类\n- 点击分类右侧编辑按钮，可以进入编辑\n### 卡片添加\n- 点击分类右侧加号，可添加空白卡片，点击卡片即可进入编辑\n### 卡片删除\n- 点击卡片进入卡片页面，可点击删除按钮进行删除\n\n## 标签页\n标签页面列入当前所有卡片的标签集合，点击可显示所含卡片\n\n## 漫步页面\n- 可通过搜索框指定卡片进行漫步\n- 也可点击卡片末尾的下一篇进行随机漫步\n\n\n\n"
            },
            "c003": {
                "cid": "c003",
                "title": "Markdown语法",
                "description": "Markdown的基本语法与本应用所用编辑器的扩展语法",
                "category": "b001",
                "tags": [
                    "Markdown"
                ],
                "process": 14,
                "content": "## 教程\n\n这是一篇讲解如何正确使用 **Markdown** 的排版示例，学会这个很有必要，能让你的文章有更佳清晰的排版。\n\n> 引用文本：Markdown is a text formatting syntax inspired\n\n## 语法指导\n\n### 普通内容\n\n这段内容展示了在内容里面一些排版格式，比如：\n\n- **加粗** - `**加粗**`\n- *倾斜* - `*倾斜*`\n- ~~删除线~~ - `~~删除线~~`\n- `Code 标记` - `` `Code 标记` ``\n- [超级链接](https://ld246.com) - `[超级链接](https://ld246.com)`\n- [username@gmail.com](mailto:username@gmail.com) - `[username@gmail.com](mailto:username@gmail.com)`\n\n\n\n#### 一些表情例子\n\n😄 😆 😵 😭 😰 😅  😢 😤 😍 😌\n👍 👎 💯 👏 🔔 🎁 ❓ 💣 ❤️ ☕️ 🌀 🙇 💋 🙏 💢\n\n### 大标题 - Heading 3\n\n你可以选择使用 H1 至 H6，使用 ##(N) 打头。建议帖子或回帖中的顶级标题使用 Heading 3，不要使用 1 或 2，因为 1 是系统站点级，2 是帖子标题级。\n\n> NOTE: 别忘了 # 后面需要有空格！\n\n#### Heading 4\n\n##### Heading 5\n\n###### Heading 6\n\n### 图片\n\n```\n![alt 文本](http://image-path.png)\n![alt 文本](http://image-path.png \"图片 Title 值\")\n```\n\n支持复制粘贴直接上传。\n\n### 代码块\n\n#### 普通\n\n```\n*emphasize*    **strong**\n_emphasize_    __strong__\nvar a = 1\n```\n\n#### 语法高亮支持\n\n如果在 ``` 后面跟随语言名称，可以有语法高亮的效果哦，比如:\n\n##### 演示 Go 代码高亮\n\n```go\npackage main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello, 世界\")\n}\n```\n\n##### 演示 Java 高亮\n\n```java\npublic class HelloWorld {\n\n    public static void main(String[] args) {\n        System.out.println(\"Hello World!\");\n    }\n\n}\n```\n\n> Tip: 语言名称支持下面这些: `ruby`, `python`, `js`, `html`, `erb`, `css`, `coffee`, `bash`, `json`, `yml`, `xml` ...\n\n### 有序、无序、任务列表\n\n#### 无序列表\n\n- Java\n  - Spring\n    - IoC\n    - AOP\n- Go\n  - gofmt\n  - Wide\n- Node.js\n  - Koa\n  - Express\n\n#### 有序列表\n\n1. Node.js\n   1. Express\n   2. Koa\n   3. Sails\n2. Go\n   1. gofmt\n   2. Wide\n3. Java\n   1. Latke\n   2. IDEA\n\n#### 任务列表\n\n- [X] 发布 Sym\n- [X] 发布 Solo\n- [ ] 预约牙医\n\n### 表格\n\n如果需要展示数据什么的，可以选择使用表格。\n\n| header 1 | header 2 |\n| -------- | -------- |\n| cell 1   | cell 2   |\n| cell 3   | cell 4   |\n| cell 5   | cell 6   |\n\n### 隐藏细节\n\n<details>\n<summary>这里是摘要部分。</summary>\n这里是细节部分。\n</details>\n\n### 段落\n\n空行可以将内容进行分段，便于阅读。（这是第一段）\n\n使用空行在 Markdown 排版中相当重要。（这是第二段）\n\n### 链接引用\n\n[链接文本][链接标识]\n\n[链接标识]: https://b3log.org\n```\n[链接文本][链接标识]\n\n[链接标识]: https://b3log.org\n```\n\n### 数学公式\n\n多行公式块：\n\n$$\n\\frac{1}{\n  \\Bigl(\\sqrt{\\phi \\sqrt{5}}-\\phi\\Bigr) e^{\n  \\frac25 \\pi}} = 1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {\n    1+\\frac{e^{-6\\pi}}\n    {1+\\frac{e^{-8\\pi}}{1+\\cdots}}\n  }\n}\n$$\n\n行内公式：\n\n公式 $a^2 + b^2 = \\color{red}c^2$ 是行内。\n\n\n\n### 脚注\n\n这里是一个脚注引用[^1]，这里是另一个脚注引用[^bignote]。\n\n[^1]: 第一个脚注定义。\n    \n[^bignote]: 脚注定义可使用多段内容。\n    \n缩进对齐的段落包含在这个脚注定义内。\n\n```\n可以使用代码块。\n```\n\n还有其他行级排版语法，比如**加粗**和[链接](https://b3log.org)。\n\n```\n这里是一个脚注引用[^1]，这里是另一个脚注引用[^bignote]。\n[^1]: 第一个脚注定义。\n[^bignote]: 脚注定义可使用多段内容。\n\n    缩进对齐的段落包含在这个脚注定义内。\n\n    ```\n    可以使用代码块。\n    ```\n\n    还有其他行级排版语法，比如**加粗**和[链接](https://b3log.org)。\n```\n",
                "ascllCount": 7047
            },
            "card1649247836372": {
                "cid": "card1649247836372",
                "title": "链接页面",
                "description": "Link页面的使用说明",
                "category": "b001",
                "tags": [
                    "help"
                ],
                "process": 0,
                "content": "# 说明\n本页面旨在提供一个链接导航App，通过此页面，你可以方便快捷的穿梭至各个网站。你可以将它当做浏览器书签的页面版进行使用。\n\n# 顶部搜索栏\n通过在搜索栏中键入内容，可进行搜索或添加链接。\n- `Enter`：通过指定的搜索引擎搜索键入内容\n- `Ctrl+Enter`：添加键入内容为导航\n## 导航添加说明\n- `http://www.baidu.com`：将直接添加链接\n- `http://www.baidu.com 百度`:添加链接的同时指定名称（默认与链接相同）\n- `http://www.baidu.com 百度 搜索`:同时添加所属分类（默认为未分类）\n# 左侧分类导航\n- 点击可快速滚动至指定分类\n# 右侧内容区\n- 点击可直接跳转\n- 鼠标移入会出现编辑按钮，可进行编辑\n"
            },
            "card1652102592390": {
                "cid": "card1652102592390",
                "title": "任务计时器",
                "description": "关于任务计时器的说明",
                "category": "b001",
                "tags": [
                    "help"
                ],
                "process": 0,
                "content": "## 目的\n本页面旨在记录每天的时间消耗分布，你可以在进行工作时开始计时，工作结束后结束计时来记录这段工作时间。同理也可记录游戏时间、看剧时间等\n\n## 添加预设\n本页所有任务都是基于预设开启，你可以在预设中设置标题、颜色与任务最大时长（上限为120min）\n\n## 开启/结束任务\n添加预设后，点击预设，即可在右侧看到预设任务，点击开始按钮即可开始计时，最小记录时长为1min，点击结束按钮后，可在右下方看到时长记录。也可在数据面板页面看到可视化数据。\n\n## 删除预设\n点击预设后，右侧可以看到预设按钮，点击即可删除。删除后，之前的历史记录会被保留，但预设不再出现。\n"
            },
            "card1652103344399": {
                "cid": "card1652103344399",
                "title": "日记页面",
                "description": "description",
                "category": "b001",
                "tags": [
                    "help"
                ],
                "process": 0,
                "content": "这是一个简单的日记页面，可以记录简单的文本信息（计划之后加入图片等内容，本来想直接Markdown的，但感觉日记不需要那么复杂）\n## 添加\n右侧可选择表情（表情可在设置中指定，以逗号分隔），然后再文本框内输入内容，点击添加即可\n## 删除\n点击记录中的表情区域，即可发现删除按钮"
            }
        }
    },
    "LINK_DATA": {
        "社区": {
            "link1649157188635": {
                "id": "link1649157188635",
                "listName": "社区",
                "name": "哔哩哔哩",
                "desc": "",
                "linkTo": "https://bilibili.com",
                "click": 7
            },
            "link1649162611640": {
                "id": "link1649162611640",
                "listName": "社区",
                "name": "知乎",
                "desc": "",
                "icon": "https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/10.png",
                "linkTo": "https://www.zhihu.com/explore",
                "click": 2
            },
            "link1649215154322": {
                "id": "link1649215154322",
                "listName": "社区",
                "name": "掘金",
                "desc": "",
                "icon": "",
                "linkTo": "https://juejin.cn/",
                "click": 0
            }
        },
        "文档": {
            "link1649214476508": {
                "id": "link1649214476508",
                "listName": "文档",
                "name": "ECharts文档",
                "desc": "",
                "icon": "",
                "linkTo": "https://echarts.apache.org/",
                "click": 5
            },
            "link1649214563754": {
                "id": "link1649214563754",
                "listName": "文档",
                "name": "Vue文档",
                "desc": "",
                "icon": "",
                "linkTo": "https://cn.vuejs.org/",
                "click": 1
            },
            "link1649214891327": {
                "id": "link1649214891327",
                "listName": "文档",
                "name": "MDN文档",
                "desc": "",
                "icon": "",
                "linkTo": "https://developer.mozilla.org/zh-CN/docs/Web",
                "click": 2
            },
            "link1649298834122": {
                "id": "link1649298834122",
                "listName": "文档",
                "name": "React",
                "desc": "",
                "icon": "",
                "linkTo": "https://react.docschina.org/",
                "click": 0
            }
        },
        "设计&素材": {
            "link1649214272809": {
                "id": "link1649214272809",
                "listName": "设计&素材",
                "name": "表情emoji",
                "desc": "",
                "icon": "",
                "linkTo": "http://emojixd.com/",
                "click": 4
            },
            "link1649158167917": {
                "id": "link1649158167917",
                "listName": "设计&素材",
                "name": "阿里字体库",
                "desc": "",
                "linkTo": "https://www.iconfont.cn/",
                "click": 2,
                "icon": "https://doraspace-1303371957.cos.ap-nanjing.myqcloud.com/icon/linkIcon/9.png"
            },
            "link1649985473886": {
                "id": "link1649985473886",
                "listName": "设计&素材",
                "name": "Canva可画",
                "icon": "",
                "linkTo": "https://www.canva.cn/ Canva可画 设计",
                "click": 1
            },
            "link1649214357522": {
                "id": "link1649214357522",
                "listName": "设计&素材",
                "name": "Squoosh图片处理",
                "desc": "",
                "icon": "",
                "linkTo": "https://squoosh.app/",
                "click": 1
            }
        }
    },
    "DIARY_DATA": {
        "emojis": "😁,🥰,😑,🙄,😪,🤒,🤢,🥳,😕,😭,😞,😡,🤡",
        "diaries": [
            {
                "mood": "😁",
                "content": "欢迎来到DoraSpace",
                "date": "2022/4/28 08:52:37"
            }
        ]
    },
    "SETTING_DATA": {},
    "TASK_DATA": {
        "presets": {
            "preset20220502": {
                "id": "preset20220502",
                "content": "刷题",
                "color": "#ffa116",
                "onceTime": 7200000
            },
            "preset202205021": {
                "id": "preset202205021",
                "content": "读书",
                "color": "#30acfe",
                "onceTime": 7200000
            },
            "preset1652018546578": {
                "id": "preset1652018546578",
                "content": "其他",
                "color": "#AEC6FF",
                "onceTime": 7200000
            }
        },
        "history": {
            "preset20220502": {
                "id": "preset20220502",
                "content": "刷题",
                "color": "#ffa116",
                "onceTime": 7200000,
                "history": {
                    "taskH1652075657558": {
                        "id": "taskH1652075657558",
                        "startTime": 1652074641763,
                        "endTime": 1652075657558,
                        "during": "16:55",
                        "remark": "每日一题|942"
                    }
                }
            },
            "preset202205021": {
                "id": "preset202205021",
                "content": "读书",
                "color": "#30acfe",
                "onceTime": 7200000,
                "history": {
                    "taskH1651931568986": {
                        "id": "taskH1651931568986",
                        "startTime": 1651931379493,
                        "endTime": 1651931568986,
                        "during": "3:09",
                        "remark": "所罗门王的指环"
                    }
                }
            },
            "preset1652018546578": {
                "id": "preset1652018546578",
                "content": "其他",
                "color": "#AEC6FF",
                "onceTime": 7200000,
                "history": {}
            }
        }
    }
}