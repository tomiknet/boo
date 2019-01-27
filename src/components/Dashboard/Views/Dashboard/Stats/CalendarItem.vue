<template>
    <transition-group
		tag="ul"
		class="event-card-list"
		name="fade-in"
		:css="false"
		appear>
    <li v-for="(item, index) in filteredList[0]" :key="item.name" :data-index="index" style="margin:0px;">
        <v-timeline-item :color="item.color" small>
            <v-layout pt-3>
            <v-flex xs3>
                <strong>{{item.hour}}:00</strong>
            </v-flex>
            <v-flex>
                <strong>{{item.name}}</strong>
                <div style="cursor:pointer;" class="caption" @click="addClick(item)">{{item.url}}</div>
            </v-flex>
            </v-layout>
        </v-timeline-item>
    </li>
    <li v-for="(item, index) in filteredList[1]" :key="item.name" :data-index="index" style="margin:0px;">
        <span v-if="index==0" style="margin-left:8%;">{{item.day}}</span>
        <v-timeline-item :color="item.color" small>
            <v-layout pt-3>
            <v-flex xs3>
                <strong>{{item.hour}}:00</strong>
            </v-flex>
            <v-flex>
                <strong>{{item.name}}</strong>
                <div style="cursor:pointer;" class="caption" @click="addClick(item)">{{item.url}}</div>
            </v-flex>
            </v-layout>
        </v-timeline-item>
    </li>
    <li v-for="(item, index) in filteredList[2]" :key="item.name" :data-index="index" style="margin:0px;">
        <span v-if="index==0" style="margin-left:8%;">{{item.day}}</span>
        <v-timeline-item :color="item.color" small>
            <v-layout pt-3>
            <v-flex xs3>
                <strong>{{item.hour}}:00</strong>
            </v-flex>
            <v-flex>
                <strong>{{item.name}}</strong>
                <div style="cursor:pointer;" class="caption" @click="addClick(item)">{{item.url}}</div>
            </v-flex>
            </v-layout>
        </v-timeline-item>
    </li>
    <li v-for="(item, index) in filteredList[3]" :key="item.name" :data-index="index" style="margin:0px;">
        <span v-if="index==0" style="margin-left:8%;">{{item.day}}</span>
        <v-timeline-item :color="item.color" small>
            <v-layout pt-3>
            <v-flex xs3>
                <strong>{{item.hour}}:00</strong>
            </v-flex>
            <v-flex>
                <strong>{{item.name}}</strong>
                <div style="cursor:pointer;" class="caption" @click="addClick(item)">{{item.url}}</div>
            </v-flex>
            </v-layout>
        </v-timeline-item>
    </li>
    <li v-for="(item, index) in filteredList[4]" :key="item.name" :data-index="index" style="margin:0px;">
        <span v-if="index==0" style="margin-left:8%;">{{item.day}}</span>
        <v-timeline-item :color="item.color" small>
            <v-layout pt-3>
            <v-flex xs3>
                <strong>{{item.hour}}:00</strong>
            </v-flex>
            <v-flex>
                <strong>{{item.name}}</strong>
                <div style="cursor:pointer;" class="caption" @click="addClick(item)">{{item.url}}</div>
            </v-flex>
            </v-layout>
        </v-timeline-item>
    </li>
    <li v-for="(item, index) in filteredList[5]" :key="item.name" :data-index="index" style="margin:0px;">
        <span v-if="index==0" style="margin-left:8%;">{{item.day}}</span>
        <v-timeline-item :color="item.color" small>
            <v-layout pt-3>
            <v-flex xs3>
                <strong>{{item.hour}}:00</strong>
            </v-flex>
            <v-flex>
                <strong>{{item.name}}</strong>
                <div style="cursor:pointer;" class="caption" @click="addClick(item)">{{item.url}}</div>
            </v-flex>
            </v-layout>
        </v-timeline-item>
    </li>
    <li v-for="(item, index) in filteredList[6]" :key="item.name" :data-index="index" style="margin:0px;">
        <span v-if="index==0" style="margin-left:8%;">{{item.day}}</span>
        <v-timeline-item :color="item.color" small>
            <v-layout pt-3>
            <v-flex xs3>
                <strong>{{item.hour}}:00</strong>
            </v-flex>
            <v-flex>
                <strong>{{item.name}}</strong>
                <div style="cursor:pointer;" class="caption" @click="addClick(item)">{{item.url}}</div>
            </v-flex>
            </v-layout>
        </v-timeline-item>
    </li>
    </transition-group>
</template>
<script>
    import moment from "moment";
    export default {
        data () {
            return {
                calendarList: [],
            }
        },
        computed: {
		    filteredList() {
                var filteredList = [];
                var i;
                this.calendarList = this.$store.getters.calendarList;
                for (i = 0; i < 7; i++) {
                    filteredList[i] = [];
                    var j = 0;
                    var thisDay = moment().add(i, 'days').format('dddd DD.MM.YYYY');
                    var thisDayOfWeek = moment().add(i, 'days').day();
                    this.calendarList.forEach(function(item) {
                        var thisItem = 0;
                        var thisItemColor = ['#ea4c89','#66615b','#7a9e9f','#68b3c8','#f3bb45','#eb5e28','#484541','white'];
                        if (item.daily == 1){
                           thisItem = 1;
                        }
                        if (item.weekly == 1 && item.dayofweek == thisDayOfWeek){
                           thisItem = 1;
                        }
                        
                        if (thisItem == 1){
                          filteredList[i][j] = [];
                          filteredList[i][j]['id'] = item.id; 
                          filteredList[i][j]['name'] = item.name; 
                          filteredList[i][j]['url'] = item.url;
                          filteredList[i][j]['hour'] = item.hour;
                          filteredList[i][j]['color'] = thisItemColor[item.dayofweek];
                          filteredList[i][j]['day'] = thisDay;
                          j++;
                        }
                    });
                } 
               //console.log('calendarList-filteredlist',filteredList);
               return filteredList;
 		    }
        },
        methods: {
            addClick(item) {
			    window.open(item.url,'_blank');
			    this.$store.dispatch('addClick', {id: item.id});
            },    
        }
    }
</script>
<style>
</style>
