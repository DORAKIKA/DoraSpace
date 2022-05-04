<template>
    <div class="todo-item" :class="todo.done?'todo-done':''">
        <div class="done"><i @click="handleDone" class="iconfont" :class="todo.done?'icon-done':'icon-dui'"></i></div>
        <div class="info">
            <div class="content">{{todo.content}}</div>
            <div class="time">
                <i class="iconfont icon-date"></i>
                {{formatTime}}</div>
            <div class="category">{{todo.category}}</div>
        </div>
        <div class="star"><i @click="handleStar" class="iconfont" :class="todo.star?'icon-star-fill':'icon-star'"></i></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: ['todo'],
    computed:{
        ...mapGetters(['TodoData']),
        formatTime(){
            console.log(this.todo)
            let time = this.todo.deadline.split(' ')[0]
            return time;
        }
    },
    methods:{
        handleInfo(){
            
        },
        handleStar(){
            this.TodoData.todos[this.todo.id].star = !this.todo.star;
        },
        handleDone(){
            if(this.todo.done){
                //恢复-移除最后一个doneTime
                this.TodoData.todos[this.todo.id].lastDone.pop();
                //- 重置deadline
                this.TodoData.todos[this.todo.id].deadline = this.todo.lastDone[this.todo.lastDone.length-1];
            }else{
                if(this.todo.interval !== -1){
                    let nowDate = new Date();
                    let nextDate = new Date(nowDate.getTime() + this.todo.interval).toLocaleString();
                    this.TodoData.todos[this.todo.id].times -= 1;
                    this.TodoData.todos[this.todo.id].deadline = nextDate;
                    this.TodoData.todos[this.todo.id].lastDone.push(nowDate.toLocaleString())
                }else{
                    if(this.todo.deadline){
                        let nowDate = new Date();
                        this.TodoData.todos[this.todo.id].times -= 1;
                        this.TodoData.todos[this.todo.id].lastDone.push(nowDate.toLocaleString())
                    }
                }
            }
            if(this.todo.times === 0){
                this.TodoData.todos[this.todo.id].done = !this.todo.done;
            }
            
        },
    }
}
</script>

<style>
.todo-item{
    width: 100%;
    height: 6rem;
    margin: 8px 0;
    padding: 0.5rem 0;
    background: var(--card-white);
    border-radius: 8px;
    display: flex;
    cursor: pointer;
}
.todo-item:hover{
    background: var(--theme-color);
    color: #fff;
}
.todo-item.todo-done{
    opacity: 0.5;
}
.todo-item.todo-done .content{
    text-decoration: line-through;
}
.todo-item .star,
.todo-item .done{
    width: 5rem;
    line-height: 5rem;
    text-align: center;
}
.todo-item .star i,
.todo-item .done i{
    font-size: 1.5rem;
    transition: 0.3s;
}
.todo-item .star i:hover,
.todo-item .done i:hover{
    color: var(--font-color2);
}
.todo-item .star i.icon-star-fill{
    color: gold;
}
.todo-item .info{
    width: calc(100% - 2rem);
    height: 5rem;
    display: flex;
    flex-wrap: wrap;
}
.todo-item .info .content{
    width: 100%;
    height: 3rem;
    line-height: 3rem;
}
.todo-item .info .time,
.todo-item .info .category{
    line-height: 1.5rem;
    height: 1.5rem;
    margin: 0.25rem;
    font-size: 14px;
}
.todo-item .info .category{
    padding: 0 0.25rem;
    background: var(--theme-color);
    border-radius: 4px;
    color: #fff;
}
</style>