import {config} from '@/config'


const _storage = window.localStorage
const storage = {
  get(key,val) {
    if (_storage) {
      return _storage.getItem(key) ? _storage.getItem(key) : val;
    }
  },
  set(key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    }
  },
  clear(key) {
    if (_storage) {
      _storage.removeItem(key)
    }
  }
}

/**
 * 黑夜模式
 * @type    DARKMODE_KEY
 */
const DARKMODE_KEY = '__darkmode_key__'
// 获取是否黑夜
export function getDarkMode() {
  return storage.get(DARKMODE_KEY, null)
}
// 修改暗黑
export function setDarkMode(mode) {
  storage.set(DARKMODE_KEY, mode)
  return mode
}

/**
 * 配置信息
 */
const CONFIG_KEY = 'CONFIG_KEY';
export function getLocalConfig(){
  return storage.get(CONFIG_KEY,JSON.stringify(config));
}
export function setLocalConfig(config){
  storage.set(CONFIG_KEY,config);
  return config;
}

/**
 * TaskDoing
 */
const TASK_KEY = 'TASK_KEY';
export function getTaskTimer(){
  return storage.get(TASK_KEY,JSON.stringify({startTime: '',taskId: '',}));
}
export function setTaskTimer(TaskTimer){
  storage.set(TASK_KEY,TaskTimer);
  return TaskTimer;
}