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
							<h4 class="card-title" style="margin-bottom:0px;" @click="addClick(item)">{{ item.name }}</h4>
							<p class="category" @click="addClick(item)">{{ item.url }}</p>
							<p>
								<v-chip v-for="(tag, index) in item.tags" :key="tag" :data-index="index" outline color="primary"> {{ tag }} </v-chip>
							</p>
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
							<div class="hits">{{ item.visits }}</div>
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
    props: ['filterUpcoming', 'filterImportant', 'filterSearch', 'filterTag'],

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
            
            this.eventList.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            });

			this.popularList.sort(function(a, b){
				if(a.visits > b.visits) { return -1; }
				if(a.visits < b.visits) { return 1; }
				return 0;
			});

			this.popularList.forEach( bookmark => {

		});

			console.log('eventlist-popularList',this.popularList);

			return this.eventList.filter(e => {
				let conditions = [true, true, true, true];
				conditions[0] = e.upcoming == this.filterUpcoming;
				
				if(this.filterImportant)
					conditions[1] = e.important == this.filterImportant;
				if(this.filterSearch.trim() != '')
					conditions[2] = e.name.toLowerCase().includes(this.filterSearch.trim().toLowerCase());

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
		}
	}

  }
</script>
<style>
</style>
