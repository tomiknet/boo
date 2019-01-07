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
          <!--<li class="open">
            <router-link to="/admin/stats" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </router-link>
          </li>-->
          <drop-down tag="li" title="5" icon="ti-bell">
            <li><a href="#">Notification 1</a></li>
            <li><a href="#">Notification 2</a></li>
            <li><a href="#">Notification 3</a></li>
            <li><a href="#">Notification 4</a></li>
            <li><a href="#">Another notification</a></li>
          </drop-down>
          <li>
            <v-menu
                    v-model="menu"
                    class="user"
                    :close-on-content-click="false"
                    :nudge-width="200"
            >
              <v-card
                      slot="activator"
                      class="photo"
                      img="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
              ></v-card>

              <v-card>
                <v-list>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>John Leider</v-list-tile-title>
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
                    <v-list-tile-title>Enable messages</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-switch v-model="hints" color="purple"></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-title>Enable hints</v-list-tile-title>
                  </v-list-tile>
                </v-list>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn flat @click="menu = false">Cancel</v-btn>
                  <v-btn color="primary" flat @click="menu = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
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
        activeNotifications: false
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
