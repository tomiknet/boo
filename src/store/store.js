// store.js

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from "moment"
import swal from 'sweetalert2'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
  state: {
      bookmarks: [],
      tags: [],
      calendarItems: [],
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
                    GROUP BY c.tag_name
                    ORDER BY c.tag_name ASC
                    `
        }).then((response) => {
            commit('SET_TAGS', response.data)
        })
        .catch((e) => {
            console.error(e)
        })
        },

        loadCalendarItems ({ commit }) {
            axios.post('http://book.noviny.live/db/index.php', {
                request: 'SELECT',
                query: `SELECT a.*, b.bookmark_name, b.bookmark_url 
                        FROM book_reminders AS a
                        LEFT JOIN book_bookmarks AS b ON a.bookmark_id=b.ID
                        WHERE a.user_id = 1
                        ORDER BY a.year, a.month, a.hour ASC
                        `
            }).then((response) => {
                commit('SET_CALENDARITEMS', response.data)
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
            }).catch((e) => { console.error(e) })

        },


      createImage ({ commit, state }, props) {
        //console.log('addclick',props);
         return new Promise((resolve, reject) => {
            axios.get('http://service.noviny.live/convertio/post.php?l='+props.bookmarkUrl).then((response) => {
            resolve(response.data)
            }).catch((e) => { reject(e) })
        })              

      },

      createReminder ({ commit, state }, props) {

         return new Promise((resolve, reject) => {
            let repeatDaily = 0;
            let repeatMonthly = 0;
            let repeatWeekly = 0;
            let repeatYearly = 0;

            var hour = props.remind.timePicker.split(':');

            if(props.remind.repeat == 1) { repeatDaily = 1; }
            if(props.remind.repeat == 2) { repeatWeekly = 1; }
            if(props.remind.repeat == 3) { repeatMonthly = 1; }
            if(props.remind.repeat == 4) { repeatYearly = 1; }

            if(props.remind.datePicker.length > 0){
                var newDate = props.remind.datePicker.split('.');
                props.remind.day = newDate[0];
                props.remind.month = newDate[1];
                props.remind.year = newDate[2];
            }

            var dateForDow = moment(props.remind.year + '-' + props.remind.month + '-' + props.remind.day);
            var dow = dateForDow.day();

            //console.log(props.remind.year);
            //resolve(props)

            axios.post('http://book.noviny.live/db/index.php', {
            request: 'INSERT',
            query: `INSERT INTO book_reminders (user_id, bookmark_id, daily, weekly, monthly, yearly, hour, day, dayofweek, month, year)
                    VALUES ('1',
                     ${props.remind.itemId},
                     ${repeatDaily},
                     ${repeatWeekly},
                     ${repeatMonthly},
                     ${repeatYearly},
                     '${hour[0]}',
                     '${props.remind.day}',
                     '${dow}',
                     '${props.remind.month}',
                     '${props.remind.year}'
                    )`
            }).then((response) => {
            resolve(response);
            }).catch((e) => { console.error(e) })

        })              
      },      
      

      addBookmark ({ commit, state }, props) {
          //console.log('store/addBookmark',props);

            if (props.bookmarkPublic == false) {
                props.bookmarkPublic = 0;
            } else {
                props.bookmarkPublic = 1;
            }
            
            // add bookmark to db
            axios.post('http://book.noviny.live/db/index.php', {
            request: 'INSERT',
            query: `INSERT INTO book_bookmarks (bookmark_name, bookmark_url, bookmark_image, bookmark_description, bookmark_created)
                    VALUES ('${props.bookmarkTitle}', '${props.bookmarkUrl}', '${props.bookmarkImage}', '${props.bookmarkDesc}', '${moment().format('YYYY-MM-DD HH:mm:ss')}')
                        `
            }).then((response) => {

                // add relationship to user (and publicity info)
                axios.post('http://book.noviny.live/db/index.php', {
                request: 'INSERT',
                query: `INSERT INTO book_r_bookmarks (user_id, bookmark_id, public)
                        VALUES ('1', '${response.data.ID}', '${props.bookmarkPublic}')
                            `
                }).then((responseR) => {

                    // after relation insert, for each TAG - check db if exist 
                    let requestedTags='';
                    let processedTags=0;
                      props.bookmarkTags.dynamicTags.forEach(function(tag) {
                          axios.post('http://book.noviny.live/db/index.php', {
                              request: 'SELECT',
                              query: `SELECT ID from book_tags WHERE tag_name = '${tag}'`
                          }).then((responseT) => {
                             
                              // if TAG is in db - use his id
                              if (responseT.data.length > 0) {
                                requestedTags = requestedTags + '(' + response.data.ID + ',' + responseT.data[0].ID + '),';
                                processedTags = parseInt(processedTags) + 1;
                              } else {
                              // if TAG is NOT in db - insert new tag + use inserted row id    
                                axios.post('http://book.noviny.live/db/index.php', {
                                  request: 'INSERT',
                                  query: `INSERT INTO book_tags (tag_name) VALUES ('${tag}')
                                                `
                                }).then((responseTT) => {
                                  requestedTags = requestedTags + '(' + response.data.ID + ',' + responseTT.data.ID + '),';
                                  processedTags = parseInt(processedTags) + 1;                                  
                                }).catch((e) => { console.error(e) })
                             }
                          }).catch((e) => { console.error(e) })
                      });

                    // WE NEED TO WAIT UNTIL ALL TAGS ARE CHECKED  
                    var interval = setInterval(function() {
                        if (props.bookmarkTags.dynamicTags.length == processedTags) {
                            clearInterval(interval);
                            requestedTags = requestedTags.replace(/.$/,";");
                    
                            // add relationship between bookmark and tags
                            axios.post('http://book.noviny.live/db/index.php', {
                                  request: 'INSERT',
                                  query: `INSERT INTO book_r_tags (bookmark_id, tag_id) VALUES ${requestedTags}`
                                  }).then((responseRT) => {
                                  }).catch((e) => { console.error(e) })
                            commit('CONFIRM_ADDED_BOOKMARK', props)
                            }
                    }, 1000);  


                }).catch((e) => {console.error(e)})
            }).catch((e) => {console.error(e)})
        
      }, //END addBookmarks     
    
  }, //END actions    
  mutations: {
    SET_BOOKMARKS (state, response) {
      //console.log('response',response);
      state.bookmarks = response
    },
    SET_TAGS (state, response) {
      //console.log('tags-response',response);
      state.tags = response
    },
    SET_CALENDARITEMS (state, response) {
      state.calendarItems = response
    },    
    UPDATE_BOOKMARK_CLICKS (state, props) {
      //console.log('tags-response',response);
      state.bookmarks.forEach( bookmark => {
        if (bookmark.ID == props.id) {
            bookmark.bookmark_visits = parseInt(bookmark.bookmark_visits) + 1;
            bookmark.bookmark_lastvisit = moment().format('DD.MM.YYYY');
          }
      });
    },
    CONFIRM_ADDED_BOOKMARK (state, props) {
        swal({
            title: `Good job!`,
            text: 'Bookmark ' + props.bookmarkTitle + ' was successfully added to the database.',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            type: 'success'
          })
      //state.tags = response
    },    
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
        },
        calendarList: (state) => {
          var calendarList = state.calendarItems.map( calendarItem => {
              return {
                  id: calendarItem.bookmark_id,
                  name: calendarItem.bookmark_name,
                  url: calendarItem.bookmark_url,                  
                  daily: calendarItem.daily,
                  weekly: calendarItem.weekly,
                  monthly: calendarItem.monthly,
                  yearly: calendarItem.yearly,
                  hour: calendarItem.hour,
                  day: calendarItem.day,
                  dayofweek: calendarItem.dayofweek,
                  month: calendarItem.month,
                  year: calendarItem.year
              };
          });
          return calendarList;
        },        
    },
})