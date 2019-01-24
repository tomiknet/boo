<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="row">
        <div class="col-lg-9 col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Bookmarks</h4>
                    <p class="category">Your saved resources</p>
                </div>
                <div class="card-content">

                    <v-layout justify-center>
                        <v-layout class="wrapme" column align-center justify-center>
                            <div :class="['search-bar', searchIsFocused ? 'elevation-6' : 'elevation-3']">
                                <input placeholder="Search"
                                       v-on:focus="searchFocus()"
                                       v-on:blur="searchUnfocus()"
                                       type="text"
                                       name="search"
                                       v-model="filter.search">
                            </div>
                            <v-layout align-center justify-space-between row style="width: 100%;">
                                <div class="upcoming-events-filter-group">

                                    <div v-for="(tag, index) in tags">
                                        <input type="radio" :id="tag.name" name="tag-select" :value="tag.name" v-model="filter.tag">
                                        <label :for="tag.name">#{{ tag.name }}</label>
                                    </div>
                                    <div><input type="radio" id="all" name="tag-select" value="" v-model="filter.tag"> <label for="all">.all</label></div>
                                    <!--
                                    <input type="radio" id="importantSelect" name="important-select" value="important" v-model="eventsUpcomingFilter" @change="upcomingFilterChange()">
                                    <label for="importantSelect">Important</label>
                                    <input type="radio" id="upcomingSelect" name="upcoming-select" value="upcoming" v-model="eventsUpcomingFilter" @change="upcomingFilterChange()">
                                    <label for="upcomingSelect">Upcoming</label>
                                    <input type="radio" id="finishedSelect" name="finished-select" value="finished" v-model="eventsUpcomingFilter" @change="upcomingFilterChange()">
                                    <label for="finishedSelect">Finished</label>
                                    -->
                                    <div class="underline"></div>
                                </div>

                                <v-menu class="filter-menu">
                                <v-btn slot="activator" flat style="align-self: flex-end; color: #9E9E9E; margin-right: 1.4em">
                                    <span style="padding-right: 0.4em;">{{ filter.sort }}</span>
                                    <v-icon>filter_list</v-icon>
                                </v-btn>
                                   <v-list style="left:0px;top:0px;">
                                    <v-list-tile @click="filter.sort = 'A-Z'">
                                        <v-list-tile-title>A-Z</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="filter.sort = 'Popular'">
                                        <v-list-tile-title>Popular</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="filter.sort = 'Newest'">
                                        <v-list-tile-title>Newest</v-list-tile-title>
                                    </v-list-tile>
                                    </v-list>
                                </v-menu>

                            </v-layout>
                            <!-- CUSTOM EVENT LIST COMPONENT -->
                            <event-list
                                    :filter-upcoming="filter.upcoming"
                                    :filter-important="filter.important"
                                    :filter-search="filter.search"
                                    :filter-tag="filter.tag" 
                                    :filter-sort="filter.sort"/>
                            <!-- THE THING ABOVE IS THE CUSTOM EVENT LIST COMPONENT -->
                        </v-layout>
                    </v-layout>

                </div>
                <div class="card-footer">
                    <hr>
                    <div class="stats">
                        <i class="fa fa-history"></i> Updated 3 minutes ago
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-12">
            <div class="card">
                <v-card
                class="mx-auto"
                max-width="370"
                style="border-radius: 6px;"
                >
                <v-card
                    light
                    flat
                >
                    <v-btn
                    class="white--text"
                    absolute
                    bottom
                    color="pink"
                    right
                    fab
                    >
                    <v-icon>fas fa-calendar-alt</v-icon>
                    </v-btn>
                    <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
                    gradient="to top, rgba(255,255,255,.80), rgba(102,97,91,.01)"
                    style="border-top-left-radius: 6px; border-top-right-radius: 6px;"
                    >
                    <v-container fill-height>
                        <v-layout align-center>
                        <strong class="display-4 font-weight-regular mr-4">17</strong>
                        <v-layout column justify-end>
                            <div class="headline font-weight-light">Thursday</div>
                            <div class="text-uppercase font-weight-light">January 2019</div>
                        </v-layout>
                        </v-layout>
                    </v-container>
                    </v-img>
                </v-card>
                <v-card-text class="py-0">
                    <v-timeline
                    align-top
                    dense
                    >
                    <v-timeline-item
                        color="pink"
                        small
                    >
                        <v-layout pt-3>
                        <v-flex xs3>
                            <strong>17:00</strong>
                        </v-flex>
                        <v-flex>
                            <strong>Daily reminder</strong>
                            <div class="caption">https://www.google.sk/</div>
                            <div class="caption">https://www.ornhub.com/</div>
                        </v-flex>
                        </v-layout>
                    </v-timeline-item>
            
                    <v-timeline-item
                        color="pink"
                        small
                    >
                        <v-layout wrap pt-3>
                        <v-flex xs3>
                            <strong>22:00</strong>
                        </v-flex>
                        <v-flex>
                            <strong>Design Stand Up</strong>
                            <div class="caption mb-2"> </div>
                        </v-flex>
                        </v-layout>
                    </v-timeline-item>
            
                    <v-timeline-item
                        color="teal lighten-3"
                        small
                    >
                        <v-layout pt-3>
                        <v-flex xs3>
                            <strong>11:00</strong>
                        </v-flex>
                        <v-flex>
                            <strong>Lunch break</strong>
                            <div class="caption mb-2">with Martin Schmol</div>
                        </v-flex>
                        </v-layout>
                    </v-timeline-item>
            
                    <v-timeline-item
                        color="teal lighten-3"
                        small
                    >
                        <v-layout pt-3>
                        <v-flex xs3>
                            <strong>17:00</strong>
                        </v-flex>
                        <v-flex>
                            <strong>Daily reminder</strong>
                            <div class="caption">https://www.google.sk/</div>
                            <div class="caption">https://www.ornhub.com/</div>
                        </v-flex>
                        </v-layout>
                    </v-timeline-item>
                    </v-timeline>
                </v-card-text>
                </v-card>    
            </div>    
        </div>
    </div>
</template>
<script>
    import EventList from './Stats/EventList'
    export default {
        components: {
            'event-list': EventList
        },
        data () {
            return {
                searchIsFocused: false,
                eventsUpcomingFilter: 'important',

                filter: {
                    upcoming: true,
                    important: true,
                    search: '',
                    tag: '',
                    sort: 'A-Z'
                },

            }
        },
        mounted () {
            this.$store.dispatch('loadTags');
            this.$store.dispatch('loadBookmarks');
        },
        computed: {
            tags() {
               return this.$store.getters.tagList;
            }
        },
        methods: {
            searchFocus() {
                this.searchIsFocused = true;
            },
            searchUnfocus() {
                this.searchIsFocused = false;
            },
            upcomingFilterChange() {
                switch(this.eventsUpcomingFilter) {
                    case 'important':
                        this.filter.upcoming = true;
                        this.filter.important = true;
                        break;
                    case 'upcoming':
                        this.filter.upcoming = true;
                        this.filter.important = false;
                        break;
                    case 'finished':
                        this.filter.upcoming = false;
                        this.filter.important = false;
                        break;
                }
            }
        }
    }
</script>
<style>
</style>
