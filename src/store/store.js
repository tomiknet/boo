// store.js

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from "moment";

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
  state: {
    bookmarks: [],
    tags: []
  },
  actions: {
        loadBookmarks ({ commit }) {
        axios.post('http://book.noviny.live/db/index.php', {
            request: 'SELECT',
            query: `SELECT b.*, 
                    (SELECT COUNT(ID) FROM book_r_visits WHERE bookmark_id = b.ID ) AS bookmark_visits, 
                    (SELECT concat(day, '.', month, '.', year) AS bookmark_lastvisit FROM book_r_visits WHERE bookmark_id = b.ID ORDER BY year,month,day DESC LIMIT 1 ) AS bookmark_lastvisit,
                    (SELECT GROUP_CONCAT(tag_name ORDER BY tag_name ASC SEPARATOR ',') as tags FROM book_tags AS c LEFT JOIN book_r_tags AS d ON c.ID=d.tag_id WHERE d.bookmark_id = b.ID) AS bookmark_tags
                    FROM book_r_bookmarks AS a
                    LEFT JOIN book_bookmarks AS b ON a.bookmark_id=b.ID
                    WHERE a.user_id=1
                    ORDER BY b.bookmark_name ASC
                    `
        }).then((response) => {
            commit('SET_BOOKMARKS', response.data)
        })
        .catch((e) => {
            console.error(e)
        })
        },

        loadTags ({ commit }) {
        axios.post('http://book.noviny.live/db/index.php', {
            request: 'SELECT',
            query: `SELECT c.* 
                    FROM book_r_bookmarks AS a
                    LEFT JOIN book_r_tags AS b ON a.bookmark_id=b.bookmark_id
                    LEFT JOIN book_tags AS c ON b.tag_id=c.ID
                    WHERE a.user_id=1
                    ORDER BY c.tag_name ASC
                    `
        }).then((response) => {
            commit('SET_TAGS', response.data)
        })
        .catch((e) => {
            console.error(e)
        })
        },

      addClick ({ commit, state }, props) {
        //console.log('addclick',props);
        axios.post('http://book.noviny.live/db/index.php', {
          request: 'INSERT',
          query: `INSERT INTO book_r_visits (user_id, bookmark_id, day, month, year)
                  VALUES ('1', ${props.id}, ${moment().format('DD')}, ${moment().format('MM')}, ${moment().format('YYYY')})
                    `
        }).then((response) => {
          commit('UPDATE_BOOKMARK_CLICKS', props)
        })
        .catch((e) => {
            console.error(e)
        })

      }
  },
  mutations: {
    SET_BOOKMARKS (state, response) {
      //console.log('response',response);
      state.bookmarks = response
    },
    SET_TAGS (state, response) {
      //console.log('tags-response',response);
      state.tags = response
    },
    UPDATE_BOOKMARK_CLICKS (state, props) {
      //console.log('tags-response',response);
      state.bookmarks.forEach( bookmark => {
        if (bookmark.ID == props.id) {
            bookmark.bookmark_visits = parseInt(bookmark.bookmark_visits) + 1;
          }
      });
    }
  },
  getters: {
        bookmarkList: (state) => {
          //console.log('statebookmarks',state.bookmarks);
          var bookmarkList = state.bookmarks.map( bookmark => {
              return {
                  id: bookmark.ID,
                  position: 0,
                  created: bookmark.bookmark_created,
                  deleted: bookmark.bookmark_deleted,
                  desc: bookmark.bookmark_description,
                  pic: bookmark.bookmark_image,
                  lastvisit: bookmark.bookmark_lastvisit,
                  name: bookmark.bookmark_name,
                  url: bookmark.bookmark_url,
                  visits: bookmark.bookmark_visits,
                  tags: bookmark.bookmark_tags.split(','),
                  important: true,
                  upcoming: true
              };
          });
          //console.log('bookmarkList',bookmarkList);
          return bookmarkList;
        },
        tagList: (state) => {
          //console.log('statetags',state.tags);
          var tagList = state.tags.map( tag => {
              return {
                  name: tag.tag_name
              };
          });
          //console.log('tagList',tagList);
          return tagList;
        }        
    },
})