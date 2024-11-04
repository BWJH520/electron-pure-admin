<script setup lang="ts">
import { ref, watch } from 'vue';
import { message } from '@/utils/message';
import { FormInstance } from 'element-plus';

const SELECT_OPTIONS = [
  { label: '油膜压力', value: 1 },
  { label: '油膜厚度', value: 2 },
  { label: '油膜温度', value: 3 },
  { label: '瓦体温度', value: 4 }
];

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const ruleFormRef = ref<FormInstance>();

const formVisible = ref(false);
const formData = ref(props.data);
const textareaValue = ref('');

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      message('提交成功', { type: 'success' });
      formVisible.value = false;
      resetForm(formEl);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  formVisible.value = false;
  resetForm(ruleFormRef.value);
};

const emit = defineEmits(['update:visible']);
watch(
  () => formVisible.value,
  val => {
    emit('update:visible', val);
  }
);

watch(
  () => props.visible,
  val => {
    formVisible.value = val;
  }
);

watch(
  () => props.data,
  val => {
    formData.value = val;
  }
);

const rules = {
  name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    title="新建任务"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <el-divider class="!-mt-2 !mb-8" />
    <!-- 表单内容 -->
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="任务名称" prop="name">
        <el-input
          v-model="formData.name"
          :style="{ width: '480px' }"
          placeholder="请输入任务名称"
        />
      </el-form-item>
      <el-form-item label="任务类型" prop="type">
        <el-select
          v-model="formData.type"
          clearable
          :style="{ width: '480px' }"
        >
          <el-option
            v-for="(item, index) in SELECT_OPTIONS"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="轴瓦外径D" prop="description">
        <el-input
          v-model="formData.description"
          :style="{ width: '480px' }"
          placeholder="请输入轴瓦外径"
        />
        <span class="ml-2">mm</span>
      </el-form-item>
      <el-form-item label="轴瓦内径d" prop="description">
        <el-input
          v-model="formData.description"
          :style="{ width: '480px' }"
          placeholder="请输入轴瓦内径"
        />
        <span class="ml-2">mm</span>
      </el-form-item>
      <el-form-item label="轴瓦外圈间隙" prop="description">
        <el-input
          v-model="formData.description"
          :style="{ width: '480px' }"
          placeholder="请输入轴瓦外圈间隙"
        />
        <span class="ml-2">mm</span>
      </el-form-item>
      <el-form-item label="任务描述" prop="mark">
        <el-input
          v-model="textareaValue"
          type="textarea"
          :style="{ width: '480px' }"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
