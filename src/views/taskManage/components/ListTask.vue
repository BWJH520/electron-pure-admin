<script setup lang="ts">
import { computed, PropType } from 'vue';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue';

defineOptions({
  name: 'ListTask'
});

interface TaskType {
  type: number;
  isSetup: boolean;
  description: string;
  name: string;
}

const props = defineProps({
  task: {
    type: Object as PropType<TaskType>
  }
});

const configureTask = task => {};
</script>

<template>
  <el-row class="m-4" :gutter="20">
    <el-divider />
    <el-col :xs="3" :sm="2" :xl="1"><div class="task-icon">Task</div></el-col>
    <el-col :xs="12" :sm="6">
      <div class="h-12">
        <span class="block task-title">推力轴承单瓦油膜压力1111111</span>
        <span class="mt-1 text-gray-400 block text-sm task-description">
          这是一段很长的简介这是一段很长的简介这是一段很长的简介一段很长的简介很长的简介很长的简介</span
        >
      </div>
    </el-col>
    <el-col :xs="3" :sm="2">
      <div class="h-12">
        <span class="block text-sm">编号</span>
        <span class="mt-2 text-gray-400 block text-sm">xxxxx</span>
      </div>
    </el-col>
    <el-col :xs="3" :sm="2">
      <div class="h-12">
        <span class="block text-sm">类型</span>
        <span class="mt-2 text-gray-400 block text-sm">xxxxx</span>
      </div>
    </el-col>
    <el-col :xs="3" :sm="4">
      <div class="h-12">
        <span class="block text-sm">开始时间</span>
        <span class="mt-2 text-gray-400 block text-sm">2016-06-16 14:03</span>
      </div>
    </el-col>
    <el-col :xs="3" :sm="5">
      <div class="h-12">
        <span class="block text-sm">结束时间</span>
        <span class="mt-2 text-gray-400 block text-sm">2016-06-16 18:03</span>
      </div>
    </el-col>
    <el-col :xs="6" :sm="4" class="!flex">
      <el-button link type="primary" :icon="Edit" @click="configureTask">
        配置
      </el-button>
      <el-button link type="primary">可视化</el-button>
      <el-button link type="primary">复制</el-button>
      <el-button link type="primary">删除</el-button>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.task-icon {
  background-color: #597ef7;
  border-radius: 2px;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.97);
}
.el-divider--horizontal {
  margin: 0 10px 16px 10px;
}
.task-title {
  max-width: 300px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.task-description {
  max-width: 300px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
