import Index from 'pages/Index'
import Manga from 'pages/Manga'
import SearchManga from 'pages/SearchManga'
import Chapter from 'pages/Chapter'
import NoLayout from 'layouts/NoLayout'
import TabsLayout from 'layouts/TabsLayout'

export const ROUTE_NAME_MANGA = 'manga'

const routes = [
  {
    path: '/',
    component: TabsLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Index
      },
      {
        path: 'manga/:id',
        name: 'manga',
        component: Manga
      },
      {
        path: 'search',
        name: 'search',
        component: SearchManga
      }
    ]
  },
  {
    path: '/chapter/',
    component: NoLayout,
    children: [
      {
        path: ':id',
        name: 'chapter',
        component: Chapter
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
