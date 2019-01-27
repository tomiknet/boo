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
                                    :filter-sort="filter.sort"
                                    @on-remind="addReminder" />
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
        <v-dialog v-model="dialog" persistent max-width="390">
        <v-card>
            <v-card-title class="headline">Set reminder...</v-card-title>
            <v-card-text>
                <p style="margin-left:30px;margin-bottom:0px;">Once: 
                    <el-date-picker v-model="remind.datePicker" type="date" placeholder="Pick a day" value-format="dd.MM.yyyy" format="dd.MM.yyyy"
                                :picker-options="remind.pickerOptions1">
                    </el-date-picker>
                </p> 
                <p-radio v-model="remind.repeat" label="1" value="1">Daily</p-radio> 
                <p-radio v-model="remind.repeat" label="2" value="2">Weekly</p-radio> 
                <p-radio v-model="remind.repeat" label="3" value="3">Monthly</p-radio> 
                <p-radio v-model="remind.repeat" label="4" value="4">Yearly</p-radio> 
                <p style="margin-left:52px;margin-bottom:15px;">at: 
                <el-time-select
                v-model="remind.timePicker"
                :picker-options="{
                  start: '00:00',
                  step: '01:00',
                  end: '23:59'
                }"
                placeholder="Select time">
              </el-time-select>
              </p>
            You will be notified about {{ remind.itemName }} everytime reminder reaches certain date and time.  
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#66615b" class="white--text" round depressed @click="dialog = false">Cancel</v-btn>
            <v-btn @click.prevent="saveReminder" color="#7ac29a" class="white--text" round depressed :loading="loading4" :disabled="loading4">Schedule</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>    

        <div class="col-lg-3 col-md-12">
            <div class="card">
                <v-card class="mx-auto" max-width="370" style="border-radius: 6px;" >
                    <v-card light flat>
                        <v-btn class="white--text" absolute bottom color="#ea4c89" right fab>
                        <v-icon>fas fa-calendar-alt</v-icon>
                        </v-btn>
                        <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
                        gradient="to top, rgba(255,255,255,.80), rgba(102,97,91,.01)"
                        style="border-top-left-radius: 6px; border-top-right-radius: 6px;"
                        >
                        <v-container fill-height>
                            <v-layout align-center>
                            <strong class="display-4 font-weight-regular mr-4">{{ today.day }}</strong>
                            <v-layout column justify-end>
                                <div class="headline font-weight-light">{{ today.dayofweek }}</div>
                                <div class="text-uppercase font-weight-light">{{ today.monthandyear }}</div>
                            </v-layout>
                            </v-layout>
                        </v-container>
                        </v-img>
                    </v-card>
                    <v-card-text class="py-0">
                        <v-timeline align-top dense>
                            <calendar-item />
                        </v-timeline>
                    </v-card-text>
                </v-card>    
            </div>    
        </div>

    </div>
</template>
<script>
    import EventList from './Stats/EventList'
    import CalendarItem from './Stats/CalendarItem'
    import moment from "moment"
    import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
    export default {
        components: {
            'event-list': EventList,
            'calendar-item': CalendarItem,
            [DatePicker.name]: DatePicker,
            [TimeSelect.name]: TimeSelect,
            [Slider.name]: Slider,
            [Tag.name]: Tag,
            [Input.name]: Input,
            [Button.name]: Button,
            [Option.name]: Option,
            [Select.name]: Select,
        },
        data () {
            return {
                dialog: false,
                searchIsFocused: false,
                eventsUpcomingFilter: 'important',
                loader: null,
                loading4: false,

                filter: {
                    upcoming: true,
                    important: true,
                    search: '',
                    tag: '',
                    sort: 'A-Z'
                },
                remind: {
                    itemId: '',
                    itemName: '',
                    repeat: null,
                    timePicker: '',
                    day: moment().format('DD'),
                    month: moment().format('MM'),
                    year: moment().format('YYYY'),
                    pickerOptions1: {
                        shortcuts: [{
                            text: 'Today',
                            onClick (picker) {
                            picker.$emit('pick', new Date())
                            }
                        },
                        {
                            text: 'Tomorrow',
                            onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() + 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                            }
                        },
                        {
                            text: 'Next week',
                            onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                            }
                        }]
                        },
                    datePicker: '',
                },
                today: {
                    day: moment().format('DD'),
                    dayofweek: moment().format('dddd'),
                    monthandyear: moment().format('MMMM YYYY'),
                }

            }
        },
        mounted () {
            this.$store.dispatch('loadTags');
            this.$store.dispatch('loadBookmarks');
            this.$store.dispatch('loadCalendarItems');            
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
            },
            addReminder(item) {
                this.remind.itemId = item.id;
                this.remind.itemName = item.name;
                this.dialog = true;
            },
            saveReminder() {
                this.loader = 'loading4';
                this.loading4 = true;
                if(this.remind.timePicker.length > 0){
                    this.$store.dispatch('createReminder', {
                        remind: this.remind
                    }).then(response => {
                        this.loader = null;
                        this.loading4 = false;
                        this.dialog = false;
                    }, error => {
                        console.error(error)
                    });
                } else {
                    this.$notify({
                        component: {
                        template: `<span>You need to select a notification time.</span>`
                        },
                        icon: 'ti-alert',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'danger'
                    })
                    this.loader = null;
                    this.loading4 = false;
                }

            },             
        }
    }
</script>
<style>
</style>
