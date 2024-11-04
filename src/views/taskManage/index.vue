<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { message } from '@/utils/message';
import { ElMessageBox } from 'element-plus';
import AddFill from '@iconify-icons/ri/add-circle-line';
import { getCardList } from '@/api/list';
import ListDialogForm from '../list/card/components/ListDialogForm.vue';
import ListTask from './components/ListTask.vue';

defineOptions({
  name: 'TaskManage'
});

const INITIAL_DATA = {
  name: '',
  status: '',
  description: '',
  type: '',
  mark: ''
};

const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const productList = ref([]);
const dataLoading = ref(true);

const getCardListData = async () => {
  try {
    const { data } = await getCardList();
    productList.value = data.list;
    pagination.value = {
      ...pagination.value,
      total: data.list.length
    };
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
  }
};

onMounted(() => {
  getCardListData();
});

const formDialogVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });
const searchValue = ref('');

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};

const handleManageProduct = product => {
  formDialogVisible.value = true;
  nextTick(() => {
    formData.value = { ...product, status: product?.isSetup ? '1' : '0' };
  });
};
</script>

<template>
  <div class="w-full h-full flex tab-body">
    <div class="m-6 w-full">
      <span class="task-title">任务列表</span>
      <div class="float-right">
        <el-button
          type="primary"
          class="mr-4"
          :icon="useRenderIcon(AddFill)"
          @click="formDialogVisible = true"
        >
          新建
        </el-button>
        <el-input
          v-model="searchValue"
          style="width: 300px"
          placeholder="请输入任务名称"
          clearable
        >
          <template #suffix>
            <el-icon class="el-input__icon">
              <IconifyIconOffline
                v-show="searchValue.length === 0"
                icon="ri:search-line"
              />
            </el-icon>
          </template>
        </el-input>
      </div>
      <div
        v-loading="dataLoading"
        class="!mt-6"
        element-loading-svg-view-box="-10, -10, 50, 50"
      >
        <el-empty
          v-show="
            productList
              .slice(
                pagination.pageSize * (pagination.current - 1),
                pagination.pageSize * pagination.current
              )
              .filter(v =>
                v.name.toLowerCase().includes(searchValue.toLowerCase())
              ).length === 0
          "
          :description="`${searchValue} 任务不存在`"
        />
        <template v-if="pagination.total > 0">
          <div>
            <ListTask
              v-for="(product, index) in productList
                .slice(
                  pagination.pageSize * (pagination.current - 1),
                  pagination.pageSize * pagination.current
                )
                .filter(v =>
                  v.name.toLowerCase().includes(searchValue.toLowerCase())
                )"
              :key="index"
              :gutter="20"
              :task="product"
            />
            <el-divider />
          </div>
          <el-pagination
            v-model:currentPage="pagination.current"
            class="float-right"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            :page-sizes="[10, 15, 20]"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="onPageSizeChange"
            @current-change="onCurrentChange"
          />
        </template>
      </div>
      <ListDialogForm v-model:visible="formDialogVisible" :data="formData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-body {
  width: auto;
  background-color: #fff;
  border-radius: 8px;
  margin: 12px !important;
}
.task-title {
  opacity: 0.85;
  font-size: 18px;
  font-family:
    PingFang SC,
    PingFang SC-Medium;
  font-weight: 600;
  text-align: left;
  color: #000000;
  line-height: 24px;
}

.el-divider--horizontal {
  margin: 0 0 16px 0px;
}
</style>
