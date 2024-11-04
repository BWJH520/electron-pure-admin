const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import('@/layout/index.vue');

export default {
  path: '/',
  name: 'Home',
  component: Layout,
  redirect: '/taskManage',
  meta: {
    icon: 'ep:home-filled',
    title: '任务管理',
    rank: 0
  },
  children: [
    {
      path: '/taskManage',
      name: 'TaskManage',
      component: () => import('@/views/taskManage/index.vue'),
      meta: {
        title: '任务管理',
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    },
    {
      path: '/list/card',
      name: 'CardList',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        icon: 'ri:bank-card-line',
        title: '卡片列表',
        showParent: true
      }
    },
    {
      path: '/visualData',
      name: 'VisualData',
      component: () => import('@/views/visualData/index.vue'),
      meta: {
        title: '可视化数据',
        showLink: VITE_HIDE_HOME === 'true' ? false : true
      }
    }
  ]
} satisfies RouteConfigsTable;
