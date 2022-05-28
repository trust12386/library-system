import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import adminRegister from '@/views/register/adminRegister/index.vue'
import raderRegister from '@/views/register/readerRegister/index.vue'
import Layout from '@/views/layout/index.vue'
import LayoutAdmin from '@/views/layout-admin/index.vue'

import Home from '@/views/layout/aside-components/home/index.vue'
import Book from '@/views/layout/aside-components/browse/book/index.vue'
import Magazine from '@/views/layout/aside-components/browse/magazine/index.vue'
import History from '@/views/layout/aside-components/history/index.vue'
import Borrow from '@/views/layout/aside-components/borrow/index.vue'
import Bookshelf from '@/views/layout/aside-components/bookshelf/index.vue'
import Setting from '@/views/layout/aside-components/self-setting/index.vue'

import HomeAdmin from '@/views/layout-admin/aside-components/home/index.vue'
import ManageBook from '@/views/layout-admin/aside-components/manage/book/index.vue'
import ManageMagazine from '@/views/layout-admin/aside-components/manage/magazine/index.vue'
import PublishBook from '@/views/layout-admin/aside-components/publish/book/index'
import PublishMagazine from '@/views/layout-admin/aside-components/publish/magazine/index'
import ReaderManage from '@/views/layout-admin/aside-components/reader-manage/index.vue'
import SettingAdmin from '@/views/layout-admin/aside-components/self-setting/index.vue'
import BookApproval from '@/views/layout-admin/aside-components/approval/book/index.vue'
import MagazineApproval from '@/views/layout-admin/aside-components/approval/magazine/index.vue'

import BookDetail from '@/views/detail/book-detail.vue'
import MagazineDetail from '@/views/detail/magazine-detail.vue'
import BookHistory from '@/views/detail/book-history.vue'
import MagazineHistory from '@/views/detail/magazine-history.vue'
import BookBorrow from '@/views/detail/book-borrow.vue'
import MagazineBorrow from '@/views/detail/magazine-borrow.vue'
import ReaderMessage from '@/views/detail/reader-message.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/adminRegister',
    name: 'adminRegister',
    component: adminRegister
  },
  {
    path: '/readerRegister',
    name: 'raderRegister',
    component: raderRegister
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/layout/book',
        name: 'book',
        component: Book,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/layout/magazine',
        name: 'magazine',
        component: Magazine,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/layout/history',
        name: 'history',
        component: History
      },
      {
        path: '/layout/borrow',
        name: 'borrow',
        component: Borrow
      },
      {
        path: '/layout/bookshelf',
        name: 'bookshelf',
        component: Bookshelf
      },
      {
        path: '/layout/self-setting',
        name: 'self-setting',
        component: Setting
      },
      {
        path: '/layout/book-detail',
        name: 'book-detail',
        component: BookDetail
      },
      {
        path: '/layout/magazine-detail',
        name: 'magazine-detail',
        component: MagazineDetail
      },
      {
        path: '/layout/book-history',
        name: 'book-history',
        component: BookHistory
      },
      {
        path: '/layout/magazine-history',
        name: 'magazine-history',
        component: MagazineHistory
      },
      {
        path: '/layout/reader-message',
        name: 'reader-message',
        component: ReaderMessage
      }
    ]
  },
  {
    path: '/layout-admin',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'homeAdmin',
        component: HomeAdmin
      },
      {
        path: '/layout-admin/book-manage',
        name: 'bookManage',
        component: ManageBook
      },
      {
        path: '/layout-admin/magazine-manage',
        name: 'magazineManage',
        component: ManageMagazine
      },
      {
        path: '/layout-admin/book-publish',
        name: 'bookPublish',
        component: PublishBook
      },
      {
        path: '/layout-admin/magazine-publish',
        name: 'magazinePublish',
        component: PublishMagazine
      },
      {
        path: '/layout-admin/reader-manage',
        name: 'readeManage',
        component: ReaderManage
      },
      {
        path: '/layout-admin/self-setting',
        name: 'self-settingAdmin',
        component: SettingAdmin
      },
      {
        path: '/layout-admin/book-approval',
        name: 'bookApproval',
        component: BookApproval
      },
      {
        path: '/layout-admin/magazine-approval',
        name: 'magazineApproval',
        component: MagazineApproval
      },
      {
        path: '/layout-admin/book-borrow',
        name: 'bookBorrow',
        component: BookBorrow
      },
      {
        path: '/layout-admin/magazine-borrow',
        name: 'magazineBorrow',
        component: MagazineBorrow
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/layout')
  } else {
    next()
  }
})

export default router
