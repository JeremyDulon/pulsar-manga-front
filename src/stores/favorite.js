import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/fetch'
import { API_PREFIX } from '@/consts/api'
import { useUserStore } from '@/stores/user'

const FAVORITE_LIST_KEY = 'favorite_list'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    list: JSON.parse(localStorage.getItem(FAVORITE_LIST_KEY)) ?? []
  }),
  actions: {
    getFavorite (comic) {
      return this.list.find(favorite => favorite.comicLanguage.id === comic.id)
    },
    saveFavorites (favorites) {
      this.list = favorites
      localStorage.setItem(FAVORITE_LIST_KEY, JSON.stringify(this.list))
    },
    updateFavorites (favorite) {
      let idx = this.list.findIndex(fav => fav.id === favorite.id)
      if (idx !== -1) {
        this.list[idx] = favorite
      } else {
        this.list.push(favorite)
      }
      localStorage.setItem(FAVORITE_LIST_KEY, JSON.stringify(this.list))
    },
    doFetchFavorites (options = {}) {
      const userStore = useUserStore()
      let user = userStore.user
      if (!user) {
        throw new Error('User not retrieved')
      }

      return fetchApi({ path: API_PREFIX + 'user_comic_languages' }, { params: { user: user.id, ...options.params } })
        .then((data) => {
          this.saveFavorites(data['hydra:member'])
        })
    },
    doUpdateFavorite (options = {}) {
      const userStore = useUserStore()

      let body = {
        comicLanguage: options.body.comicLanguage,
        user: userStore.user['@id'],
        favorite: options.body.favorite,
        lastPage: options.body.lastPage,
        lastComicIssue: options.body.lastComicIssue
      }

      let method = 'POST'
      let endpoint = API_PREFIX + 'user_comic_languages'
      let favoriteComic = this.list.find(fav => fav.comicLanguage['@id'] === options.body.comicLanguage)
      if (favoriteComic !== undefined) {
        method = 'PUT'
        endpoint = favoriteComic['@id']
      }
      let headers = new Headers()
      headers.set('Content-Type', 'application/json')

      return fetchApi({ path: endpoint }, {
        method: method,
        body: JSON.stringify(body),
        headers
      }).then((data) => {
        this.updateFavorites(data)
      })
    }
  }
})
