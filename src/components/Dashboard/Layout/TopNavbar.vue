<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-minimize">
        <button class="btn btn-fill btn-icon" @click="minimizeSidebar">
          <i :class="$sidebar.isMinimized ? 'ti-menu-alt' : 'ti-more-alt'"></i>
        </button>
      </div>
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{this.$route.name}}</a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li class="open">
            <router-link to="/admin/stats" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </router-link>
          </li>
            <drop-down tag="li" title="0" icon="ti-bell">
            <li>
              <v-list two-line>
                <template v-for="(item, index) in notifications">
                  <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                  <v-divider v-else-if="item.divider" :inset="item.inset" :key="index" style="margin-top:0px;margin-bottom:0px;"></v-divider>
                  <v-list-tile v-else :key="item.title" avatar @click="">
                    <v-list-tile-avatar>
                      <v-icon v-html="item.avatar"></v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action style="flex-direction: row;">
                      <v-btn flat color="#66615b">Done</v-btn>
                      <v-btn flat color="#7ac29a">Visit Now</v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
              </li>
            </drop-down>
          <li>
            <div class="text-xs-center">
            <v-menu
                    v-model="menu"
                    class="user"
                    :close-on-content-click="false"
                    :nudge-width="200"
                    offset-y
            >
              <v-card
                      slot="activator"
                      class="photo"
                      img="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
              ></v-card>

              <v-card class="menu">
                <v-list>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://cdn.vuetifyjs.com/images/cards/girl.jpg" alt="Jane">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>Jane Leider</v-list-tile-title>
                      <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-btn
                              :class="fav ? 'red--text' : ''"
                              icon
                              @click="fav = !fav"
                      >
                        <v-icon>favorite</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-switch v-model="message" color="purple"></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-title>Lock Screen</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-switch v-model="hints" color="purple"></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-title>Display #nsfw</v-list-tile-title>
                  </v-list-tile>
                </v-list>

                <v-list>
                  <v-list-tile
                          v-for="(item, index) in items"
                          :key="index"
                          @click=""
                  >
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>

              </v-card>
            </v-menu>
            </div>
          </li>
          <!--<li>
            <router-link to="/admin/overview" class="btn-rotate">
              <i class="ti-settings"></i>
            </router-link>
          </li>-->
        </ul>
        <form class="navbar-form navbar-right navbar-search-form" role="search">
          <div class="input-group">
            <input type="text" value="" class="form-control" placeholder="Search...">
            <span class="input-group-addon"><i class="fa fa-search"></i></span>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    data () {
      return {
        activeNotifications: false,
        items: [
          { title: 'My Profile' },
          { title: 'Edit Porofile' },
          { title: 'Settings' },
          { title: 'Logout' }
        ],
        notifications: [
          { header: 'Today' },
          { avatar: 'fas fa-bookmark', title: 'PixelDrain ~ Free file sharing service', subtitle: "https://pixeldrain.com/" },
          { divider: true, inset: true },
          { avatar: 'fas fa-bookmark', title: 'Movie of the Night - Movie Recommender/Suggester', subtitle: "https://www.movieofthenight.com/" },
          { header: 'Yesterday' },
          { avatar: 'fas fa-bookmark', title: 'PixelDrain ~ Free file sharing service', subtitle: "https://pixeldrain.com/" },
          { divider: true, inset: true },
          { avatar: 'fas fa-bookmark', title: 'Movie of the Night - Movie Recommender/Suggester', subtitle: "https://www.movieofthenight.com/" },
          ]
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      minimizeSidebar () {
        this.$sidebar.toggleMinimize()
      }
    }
  }

</script>
<style>

</style>
