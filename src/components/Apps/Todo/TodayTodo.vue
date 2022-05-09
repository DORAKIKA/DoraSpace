<template>
  <div class="today-todo">
    <div class="today-doing">
      <div class="time" :class="TaskTimer.taskId?'active':''">{{time}}</div>
    </div>
    <div class="today-presets">
      <div @click="handlePreset(preset.id)" class="preset" :style="`background:${preset.color}`" v-for="preset in TaskData.presets" :key="preset.id">
        {{preset.content}}
      </div>
      <div class="addPreset" @click="handleAdd">
        +
      </div>
      <el-dialog
        title="提示"
        :visible.sync="addPresetVisible"
        width="300px"
        :before-close="handleAddClose">
        <div class="addPresetForm">
          <div class="title">标题</div>
          <el-input v-model="input.title"></el-input>
        </div>
        <div class="addPresetForm">
          <div class="title">颜色</div>
          <el-color-picker v-model="input.color"></el-color-picker>
        </div>
        <div class="addPresetForm">
          <div class="title">时长(min)</div>
          <el-input-number v-model="input.onceTime" :step="5" :min="5" :max="120"></el-input-number>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPresetVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="preset-details">
      <div class="detail" :style="`background:${currentTask.color ? currentTask.color : ''}`">
        <div class="bg" :style="`width:${TaskTimer.progress}%;display:${currentDoing.id&&currentDoing.id===currentTask.id?'block':'none'}`"></div>
        <div class="content">{{currentTask.content ? currentTask.content : ''}}</div>
        <kk-button class="preset-details-button" @click="handleDeletePresest"><i class="iconfont icon-shanchu"></i></kk-button>
        <kk-button class="preset-details-button start" @click="handleStart(currentTask.id)"><i class="iconfont" :class="currentDoing.id&&currentDoing.id===currentTask.id?'icon-zanting':'icon-bofang'"></i></kk-button>
      </div>
      <div class="timelist">
          <div class="timeLineItem" v-for="timeNode in currentTask.history" :key="timeNode.id">
              <div class="style" :style="`color:${currentTask.color};`">
                  <div class="dot"></div>
                  <div class="line"></div>
              </div>
              <div class="container">
                  <div class="time" :style="`color:${currentTask.color};`">
                    <div class="date">{{formatTime(timeNode.startTime,timeNode.endTime)}}</div>
                  </div>
                  <div class="during" @click="handleDelete(timeNode.id)" :style="`backgroundColor:${currentTask.color};`">{{timeNode.during}}</div>
                  
                  <div class="content">{{currentTask.content+' | '+timeNode.remark}}</div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import kkButton from '@/kk/kk-button.vue'
import {getTaskTimer,setTaskTimer} from '@/utils/storage';
import { mapActions, mapGetters } from 'vuex';
export default {
  components:{kkButton},
  data(){
    return{
      doing: false,
      time: '25:00',
      timer: undefined,
      TaskTimer: {
        startTime: '',
        taskId: '',
        progress: '0',
      },
      currentTask: {},
      currentDoing: {},
      addPresetVisible: false,
      input:{
        title: 'test',
        color: '#386ade',
        onceTime: 0,
      },
    }
  },
  computed:{
    ...mapGetters(['TaskData']),
  },
  methods:{
    ...mapActions(['addTaskHistory','deleteTaskHistory','addTaskPreset','deleteTaskPreset']),
    handleAdd(){
      this.addPresetVisible = !this.addPresetVisible;
    },
    handleDeletePresest(){
      if(this.currentTask.id){
        this.$confirm("是否删除此预设？","提示").then(()=>{
          this.TaskTimer = {
            startTime: '',
            taskId: '',
            progress: '0'
          }
          if(this.timer){
            clearInterval(this.timer);
            this.timer = undefined;
          }
          this.currentDoing = {};
          setTaskTimer(JSON.stringify(this.TaskTimer));
          if(this.currentTask.id)this.deleteTaskPreset(this.currentTask.id);
          this.currentTask = {};
        })
      }
    },
    handleAddConfirm(){
      let preset = {
        id: 'preset'+new Date().getTime(),
        content: this.input.title,
        color: this.input.color,
        onceTime: this.input.onceTime*60*1000
      }
      this.addTaskPreset(preset);
      this.handleAddClose();
    },
    handleAddClose(){
      this.addPresetVisible = false;
    },
    taskTimerFunc(){
      this.time = this.getTimeText();
      let now = new Date().getTime();
      this.TaskTimer.progress = 100*(now - this.TaskTimer.startTime)/this.TaskData.history[this.TaskTimer.taskId].onceTime;
      if(this.TaskTimer.progress >= 100){
        this.pauseTimer();
        clearInterval(this.timer)
      }
    },
    handleDelete(hid){
      this.$confirm("是否确认删除","提示").then(()=>{
        this.deleteTaskHistory({id:this.currentTask.id,hid:hid});
        this.$message("删除成功")
      },()=>{
        this.$message("取消");
      })
    },
    handlePreset(id){
      this.currentTask = this.TaskData.history[id];
    },
    async handleStart(id){
      if(!id) return;
      if(this.currentDoing.id&&this.currentDoing.id === id){
        this.pauseTimer();
      }else if(this.currentDoing.id&& this.currentDoing.id!==id){
        if(await this.pauseTimer()){
          this.startTimer(id);
        }
      }else{
        this.startTimer(id);
      }
    },
    async pauseTimer(){
      if(!this.currentDoing.id) return;
      let pause = false;
      let now = new Date().getTime();
      now = now > this.TaskTimer.startTime + this.currentDoing.onceTime 
            ? this.TaskTimer.startTime + this.currentDoing.onceTime
            : now;
      let nowTime = this.getTimeText(true);
      if(now - this.TaskTimer.startTime < 60000){
        await this.$confirm(`当前时长为${nowTime}，不足1min，将不计入历史记录，是否停止？`,"提示",{
          confirmButtonText: '停止',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(
          ()=>{
            this.$message("已停止计时器")
            if(this.timer){
              clearInterval(this.timer);
              this.timer = undefined;
            }
            this.currentDoing = {};
            this.TaskTimer = {
              startTime: '',
              taskId: '',
            }
            setTaskTimer(JSON.stringify(this.TaskTimer))
            pause = true;
          },
          ()=>{
            this.$message("取消操作");
            pause = false;
          }
        )
      }else{
        await this.$confirm(`当前时长为${nowTime}，是否停止？`,"提示",{
          confirmButtonText: '停止',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(
          async()=>{
            this.$message(`完成${this.currentDoing.content}，用时${nowTime}`);
            
            let remark = ''
            await this.$prompt('请输入备注', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              remark = value;
            }).catch(() => {    
            });
            
            await this.addTaskHistory({id:this.currentDoing.id,history:{
              id: 'taskH' + now,
              startTime: this.TaskTimer.startTime,
              endTime: now,
              during: nowTime,
              remark: remark,
            }})
            if(this.timer){
              clearInterval(this.timer);
              this.timer = undefined;
            }
            this.currentDoing = {};
            this.TaskTimer = {
              startTime: '',
              taskId: '',
            }
            setTaskTimer(JSON.stringify(this.TaskTimer))
            pause = true;
          },
          ()=>{
            this.$message("取消操作");
            pause = false;
          }
        )
      }
      return pause;
    },
    startTimer(id){
      this.TaskTimer = {
        startTime: new Date().getTime(),
        taskId: id,
      }
      if(!this.timer){
        this.timer = setInterval(this.taskTimerFunc,500)
      }
      this.currentDoing = this.TaskData.history[id];
      setTaskTimer(JSON.stringify(this.TaskTimer));
    },
    getTimeText(pure=false){
      let now = new Date().getTime();
      let progress = now - this.TaskTimer.startTime;
      if(!pure)progress = this.TaskData.history[this.TaskTimer.taskId].onceTime - progress;
      let min = (((progress / 1000)<<0) / 60)<<0;
      min  = min >= 0 ? min : 0;
      let second = ((progress / 1000)<<0) % 60;
      second = second >= 0 ? second : 0;
      second = second >= 10 ? second : '0'+second;
      return min + ':' + second;
    },
    formatTime(s,e){
      let start = new Date(s);
      let end = new Date(e);
      return start.toLocaleDateString()
      + ' '
      + start.toLocaleTimeString()
      + ' - '
      +end.toLocaleTimeString();
    }
  },
  mounted(){
    this.TaskTimer = JSON.parse(getTaskTimer());
    if(this.TaskTimer.taskId){
      this.currentDoing = this.TaskData.history[this.TaskTimer.taskId];
      this.currentTask = this.currentDoing;
      
      if(!this.timer){
        this.timer = setInterval(this.taskTimerFunc,500)
      }
    }
  },
  beforeDestroy(){
    if(this.timer){
      clearInterval(this.timer)
    }
  }
}
</script>

<style>
.today-todo{
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.today-todo .today-doing{
  border-radius: 8px;
  background: var(--card-white);
  width: 300px;
  height: 9rem;
  padding: 2rem;
}
.today-doing .time{
  font-size: 24px;
  line-height: 5rem;
  width: 100%;
  text-align: center;
  background: #2395ad55;
  border: 1px solid #2395ad;
  border-radius: 8px;
}
.today-doing .time.active{
  animation: timer 1s ease-in-out infinite;
}
@keyframes timer {
  0%,100%{
    opacity: 1;
  }
  50%{
    opacity: 0.5;
  }
}
.today-todo .today-presets{
  border-radius: 8px;
  background: var(--card-white);
  width: 300px;
  height: calc(100% - 10rem);
  margin-top: 1rem;
  padding: 2rem;
  overflow-y: scroll;
}
.today-todo .today-presets .preset,
.today-todo .today-presets .addPreset{
  line-height: 5rem;
  width: 100%;
  text-align: center;
  border-radius: 8px;
  background: var(--card-inner);
  margin-bottom: 1rem;
  cursor: pointer;
}
.today-todo .today-presets .preset:hover,
.today-todo .today-presets .addPreset:hover{
  box-shadow: 0 0 0 4px var(--opacity-over);
}
 .today-todo .today-presets .addPresetForm{
   margin-bottom: 4px;
   display: flex;
   height: 3rem;
   align-items: center;
 }
 .today-todo .today-presets .addPresetForm .title{
   width: 5rem;
   line-height: 3rem;
 }
.today-todo .preset-details{
  border-radius: 8px;
  background: var(--card-white);
  width: calc(100% - 300px - 1rem);
  height: 100%;
  padding: 2rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}
.today-todo .preset-details .detail{
  display: flex;
  height: 5rem;
  padding: 1rem;
  line-height: 3rem;
  text-align: center;
  background: var(--theme-color);
  border-radius: 8px;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}
.today-todo .preset-details .detail .bg{
  background: var(--over50);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: doing 5s linear infinite;
  background-image: linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);
  background-size: 4rem 4rem;
}
@keyframes doing{
  0% {
    background-position-x: 4rem;
  }
}
.today-todo .preset-details .detail .content{
  flex: 1;
}
.today-todo .preset-details .detail .preset-details-button{
  width: 3rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  margin-left: 4px;
  cursor: pointer;
  color: var(--card-white);
}
.today-todo .preset-details .detail .preset-details-button:hover{
  background: rgba(255, 255, 255, 0.9);
}
.today-todo .preset-details .timelist{
  flex: 1;
  border-radius: 8px;
  /* background: var(--card-inner);  */
  padding: 1rem;
  overflow-y: scroll;
}


.today-todo .preset-details .timeLineItem{
    display: flex;
}
.today-todo .preset-details .timeLineItem .style{
    width: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.today-todo .preset-details .timeLineItem:nth-last-child(1) .style{
  border-bottom: 2px solid currentColor;
}
.today-todo .preset-details .timeLineItem .style .dot{
    width: 16px;
    height: 16px;
    background: currentColor;
    border-radius: 50%;
    box-shadow: 0 0 0 4px var(--card-white) inset;
    transition: 0.3s;
}
.today-todo .preset-details .timeLineItem:hover .style .dot{
    box-shadow: 0 0 0 4px var(--over60) inset;
}
.today-todo .preset-details .timeLineItem .style .line{
    flex: 1;
    width: 2px;
    height: 100%;
    background: currentColor;
}
.today-todo .preset-details .timeLineItem .container{
    padding-left: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.today-todo .preset-details .timeLineItem .container .time{
    font-size: 0.8rem;
    opacity: 0.8;
    width: 100%;
    height: 24px;
    line-height: 16px;
    margin-bottom: 0.5rem;
    display: flex;
}
.today-todo .preset-details .timeLineItem .container .time .date,
.today-todo .preset-details .timeLineItem .container .time .during{
  border-radius: 4px;
  background: var(--card-inner);
  padding: 4px;
  margin-right: 4px;
}
.today-todo .preset-details .timeLineItem .container .date{
  color: var(--font-color);
}
.today-todo .preset-details .timeLineItem .container .during{
  color: #fff;
  padding: 0.5rem;
  border-radius: 8px;
  height: 2rem;
  font-size: 12px;
  background: var(--card-inner);
  margin-right: 0.4rem;
  position: relative;
  
}
.today-todo .preset-details .timeLineItem .container .during::before{
    content:'❌';
    display: block;
    position: absolute;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    top: 0;
    left: 0;
    border-radius: 8px;
    opacity: 0;
    transition: 0.3s;
}
.today-todo .preset-details .timeLineItem .container .during:hover::before{
    opacity: 1;
    background: #f20;
    cursor: pointer;
}
.today-todo .preset-details .timeLineItem .container .content{
    padding: 1rem;
    max-width: calc(100% - 4rem);
    border-radius: 8px;
    background: var(--card-inner);
}
.today-todo .preset-details .timeLineItem .container .content:hover{
    box-shadow: 0 0 0 2px var(--theme-color);
    color: currentColor;
}

@media screen and (max-width: 900px) {
  .today-todo{
    height: max-content;
  }
  .today-todo .today-doing,
  .today-todo .today-presets,
  .today-todo .preset-details{
    width: 100%;
  }
  .today-todo .preset-details{
    margin: 1rem 0 0 0;
  }
}
</style>