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
                                    <input type="radio" id="importantSelect" name="important-select" value="important" v-model="eventsUpcomingFilter" @change="upcomingFilterChange()">
                                    <label for="importantSelect">Important</label>
                                    <input type="radio" id="upcomingSelect" name="upcoming-select" value="upcoming" v-model="eventsUpcomingFilter" @change="upcomingFilterChange()">
                                    <label for="upcomingSelect">Upcoming</label>
                                    <input type="radio" id="finishedSelect" name="finished-select" value="finished" v-model="eventsUpcomingFilter" @change="upcomingFilterChange()">
                                    <label for="finishedSelect">Finished</label>
                                    <div class="underline"></div>
                                </div>
                                <v-btn flat style="align-self: flex-end; color: #9E9E9E; margin-right: 1.4em">
                                    <span style="padding-right: 0.4em;">A-Z</span>
                                    <v-icon>filter_list</v-icon>
                                </v-btn>
                            </v-layout>
                            <!-- CUSTOM EVENT LIST COMPONENT -->
                            <event-list
                                    :filter-upcoming="filter.upcoming"
                                    :filter-important="filter.important"
                                    :filter-search="filter.search" />
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
                    search: ''
                },

            }
        },
        mounted () {
            this.$store.dispatch('loadBookmarks')
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
