// store.js

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
    state: {
    bookmarks: []
  },
    actions: {
    loadBookmarks ({ commit }) {
        axios.post('http://book.noviny.live/db/index.php', {
            request: 'SELECT',
            query: 'SELECT * FROM book_bookmarks'
        }).then((response) => {
            commit('SET_BOOKMARKS', response.data)
        })
        .catch((e) => {
            console.error(e)
        })

    }
  },
    mutations: {
    SET_BOOKMARKS (state, response) {
      state.bookmarks = response
    }
  },
    getters: {
        bookmarkList: (state) => {
            var bookmarkList = state.bookmarks.map( bookmark => {
                return {
                    title:  bookmark.bookmark_name,
                    date: bookmark.bookmark_url,
                    desc: 'Earn your scuba diving merit badge. Pre-req: Requirement 1a, 2b, 4ab',
                    address: '503 Harbor Blvd, Destin, FL',
                    pic: 'https://images.unsplash.com/photo-1484507175567-a114f764f78b?ixlib=rb-0.3.5&s=abc2cb4d7e6d8aca1e8914c1b5e909a6&auto=format&fit=crop&w=500&q=60',
                    month: 'Aug',
                    day: '28',
                    important: true,
                    upcoming: true
                };
            });
            return bookmarkList;
        }
    },
})