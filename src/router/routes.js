import ListComicLanguage from 'pages/ListComicLanguage'
import ShowComicLanguage from 'pages/ShowComicLanguage.vue'
import SearchManga from 'pages/SearchManga.vue'
import ShowComicIssue from 'pages/ShowComicIssue.vue'
import NoLayout from 'layouts/NoLayout'
import TabsLayout from 'layouts/TabsLayout'
import FavoritesManga from 'pages/FavoritesManga' // Todo
import UserConfig from 'pages/UserConfig'
import Login from 'pages/Login'
import Error404 from 'pages/Error404'

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
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: Error404
  })
}

export default routes
