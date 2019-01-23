<template>
    <transition-group
		tag="ul"
		class="event-card-list"
		name="fade-in"
		:css="false"
		v-on:before-enter="cardBeforeEnter"
		v-on:enter="cardEnter"
		v-on:leave="cardLeave"
		appear>
		<li v-for="(item, index) in filteredList" :key="item.name" :data-index="index">
			<v-card class="event-card">
				<v-layout row>
					<img :src="item.pic" @click="addClick(item)">
					<v-layout column justify-space-between class="event-card-text">
						<div>
                            <div class="event-card-title">
							<h4 class="card-title" style="margin:0;" @click="addClick(item)">{{ item.name }}</h4>
                            <p class="category" @click="addClick(item)">{{ item.url }}</p>
							<p>
								<v-chip v-for="(tag, index) in item.tags" :key="tag" :data-index="index" outline color="primary"> {{ tag }} </v-chip>
							</p>
                            </div>
                            <div class="event-card-menu">
                                <v-menu>
                                    <v-btn
                                    slot="activator"
                                    icon
                                    >
                                    <v-icon>more_vert</v-icon>
                                    </v-btn>

                                    <v-list>
                                    <v-list-tile @click="addClick(item)">
                                        <v-list-tile-title>Edit</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="addReminder(item)">
                                        <v-list-tile-title >Remind me</v-list-tile-title>
                                    </v-list-tile>                                    
                                    </v-list>
                                </v-menu>
                            </div>
                            <div style="clear:both;"></div>
						</div>
						<div>
							<p>{{ item.desc }}</p>
							<div class="created">
								<i v-if="item.visits" class="fas fa-compress" title="Number of visits"></i>
								{{ item.visits }}
							</div>
							<div class="lasvisit">
								<i v-if="item.lastvisit" class="far fa-calendar-check" title="Last visited"></i>
								{{ item.lastvisit }}
							</div>
							<div class="created">
								<i v-if="item.created" class="far fa-calendar-plus"  title="Created on"></i>
								{{ item.created | formatDate(item.created) }}
							</div>
						</div>
						<div class="date-ribbon">
							<div class="hits">{{ item.position }}</div>
						</div>
					</v-layout>
				</v-layout>
			</v-card>
		</li>
	</transition-group>
</template>
<script>
  import moment from "moment";
  export default {
    data () {
      return {
        eventList: [],
		  popularList: [],
      }
    },
    props: ['filterUpcoming', 'filterImportant', 'filterSearch', 'filterTag', 'filterSort'],

    filters: {
        formatDate(value){
            return moment(String(value)).format('DD.MM.YYYY')            
        }
    },

	computed: {
		filteredList() {
            //console.log('eventlist-filteredlist',this.$store.getters.bookmarkList);
			this.eventList = this.$store.getters.bookmarkList;
            this.popularList = this.eventList;

            this.popularList = this.popularList.sort(function(a, b){
                    if(parseInt(a.visits) > parseInt(b.visits)) { return -1; }
                    if(parseInt(a.visits) < parseInt(b.visits)) { return 1; }
                    return 0;
                });

            //console.log(this.popularList);
                let i = 1;
                this.popularList.forEach( pb => {
                    //console.log(pb.name);
                    this.eventList.forEach( elb => {
                        if(elb.name == pb.name) {
                            elb.position = i;
                        }
                    });  

                    i = i + 1;
                });

            
            if(this.filterSort == 'A-Z') {
                this.eventList = this.eventList.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                });
            }

            if(this.filterSort == 'Newest') {
                this.eventList = this.eventList.sort(function(a, b){
                    if(parseInt(a.id) > parseInt(b.id)) { return -1; }
                    if(parseInt(a.id) < parseInt(b.id)) { return 1; }
                    return 0;
                });
            }            

			return this.eventList.filter(e => {
				let conditions = [true, true, true, true];
				conditions[0] = e.upcoming == this.filterUpcoming;
				
				if(this.filterImportant)
					conditions[1] = e.important == this.filterImportant;
				if(this.filterSearch.trim() != ''){
                    let textCombined = e.name.toLowerCase() + ' ' + e.desc.toLowerCase();
                    conditions[2] = textCombined.includes(this.filterSearch.trim().toLowerCase());
                }

				if(this.filterTag.trim() != '')
					conditions[3] = e.tags.includes(this.filterTag.trim().toLowerCase());
				
				return conditions.every(e => e === true);
			});
		}
	},
	
	methods: {
		cardBeforeEnter(el) {
			el.style.opacity = 0;
			el.style.transform = 'scale(90%)';
			el.style.height = 0;
		},
		cardEnter(el, done) {
			let delay = el.dataset.index * 200;
			setTimeout(() => {
				Velocity(
					el,
					{ opacity: 1, height: '100%', scale: '100%' },
					{ complete: done }
				);
			}, delay);
		},
		cardLeave(el, done) {
			let delay = el.dataset.index * 200;
			setTimeout(() => {
				Velocity(
					el,
					{ opacity: 0, height: 0, scale: '90%' },
					{ complete: done }
				);
			}, delay);
		},
		addClick(item) {
			window.open(item.url,'_blank');
			//console.log('addclick',id);
			this.$store.dispatch('addClick', {id: item.id});
        },
        addReminder(item) {
        this.$emit('on-remind', item)
        }
        
	}

  }
</script>
<style>
</style>
