import ListComicLanguage from 'pages/ListComicLanguage'
import ShowComicLanguage from 'pages/ShowComicLanguage.vue'
import SearchManga from 'pages/SearchManga.vue'
import ShowComicIssue from 'pages/ShowComicIssue.vue'
import NoLayout from 'layouts/NoLayout'
import TabsLayout from 'layouts/TabsLayout'
import FavoritesManga from 'pages/FavoritesManga' // Todo
import UserConfig from 'pages/UserConfig'
import AddSource from 'pages/AddSource'
import Login from 'pages/Login'

import store from '@/store'

const isAdmin = (to, from, next) => {
  if (store.getters['user/isAdmin']) {
    next()
    return
  }
  next('/')
}

const routes = [
  {
    path: '/',
    component: TabsLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: ListComicLanguage
      },
      {
        path: 'comic/:id',
        name: 'comic',
        component: ShowComicLanguage
      },
      {
        path: 'search',
        name: 'search',
        component: SearchManga
      },
      {
        path: 'favorites',
        name: 'favorites',
        component: FavoritesManga
      },
      {
        path: 'user-config',
        name: 'userConfig',
        component: UserConfig
      },
      {
        path: 'add-source',
        name: 'addSource',
        beforeEnter: isAdmin,
        component: AddSource
      }
    ]
  },
  {
    path: '/comic-issue/',
    component: NoLayout,
    children: [
      {
        path: ':id',
        name: 'comicIssue',
        component: ShowComicIssue
      }
    ]
  },
  {
    path: '/login',
    component: NoLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: Login
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
