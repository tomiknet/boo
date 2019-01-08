<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="stats in statsCards">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

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
        

    <div class="row">
        <div class="col-lg-8 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Global Sales by Top Locations</h4>
              <p class="category">All products that were shipped</p>
            </div>
            <div class="card-content">
              <div class="row">
                <div class="col-md-7">
                  <world-map></world-map>
                </div>
                <div class="col-md-5">
                  <div class="table-responsive">
                    <table class="table">
                      <tbody>
                      <tr>
                        <td>
                          <div class="flag">
                            <img src="static/img/flags/US.png">
                          </div>
                        </td>
                        <td>USA</td>
                        <td class="text-right">
                          2.920
                        </td>
                        <td class="text-right">
                          53.23%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="flag">
                            <img src="static/img/flags/DE.png">
                          </div>
                        </td>
                        <td>Germany</td>
                        <td class="text-right">
                          1.300
                        </td>
                        <td class="text-right">
                          20.43%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="flag">
                            <img src="static/img/flags/AU.png">
                          </div>
                        </td>
                        <td>Australia</td>
                        <td class="text-right">
                          760
                        </td>
                        <td class="text-right">
                          10.35%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="flag">
                            <img src="static/img/flags/GB.png">
                          </div>
                        </td>
                        <td>United Kingdom</td>
                        <td class="text-right">
                          690
                        </td>
                        <td class="text-right">
                          7.87%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="flag">
                            <img src="static/img/flags/RO.png">
                          </div>
                        </td>
                        <td>Romania</td>
                        <td class="text-right">
                          600
                        </td>
                        <td class="text-right">
                          5.94%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="flag">
                            <img src="static/img/flags/BR.png">
                          </div>
                        </td>
                        <td>Brasil</td>
                        <td class="text-right">
                          550
                        </td>
                        <td class="text-right">
                          4.34%
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <chart-card :chart-data="earningsChart.data" :chart-options="earningsChart.options">
            <span slot="title">$34,657</span>
            <span slot="title-label" class="label label-success">
              +18%
            </span>
            <h6 slot="subtitle">
              total earnings <span class="text-muted">in last</span> ten <span class="text-muted">quarters</span>
            </h6>
            <div slot="footer-title">
              Financial Statistics
            </div>
            <button slot="footer-right" class="btn btn-info btn-fill btn-icon btn-sm">
              <i class="ti-plus"></i>
            </button>
          </chart-card>
        </div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="70"
                           title="Dashboard"
                           description="Monthly sales target"
                           color="blue">
        </circle-chart-card>
      </div>

      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="34"
                           title="Orders"
                           description="Completed"
                           color="green">
        </circle-chart-card>
      </div>

      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="62"
                           title="New Visitors"
                           description="Out of total number"
                           color="orange">
        </circle-chart-card>
      </div>

      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="10"
                           title="Subscriptions"
                           description="Monthly newsletter"
                           color="brown">
        </circle-chart-card>
      </div>
    </div>

  </div>
</template>
<script>
  import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import Loading from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'
  import EventList from './Stats/EventList'

  const WorldMap = () => ({
    component: import('./../Maps/WorldMap.vue'),
    loading: Loading,
    delay: 200
  })

  export default {
    components: {
      StatsCard,
      ChartCard,
      CircleChartCard,
      WorldMap,
      'event-list': EventList
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        searchIsFocused: false,
		eventsUpcomingFilter: 'important',
		
		filter: {
			upcoming: true,
			important: true,
			search: ''
		},
        statsCards: [
          {
            type: 'warning',
            icon: 'ti-server',
            title: 'Capacity',
            value: '105GB',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'success',
            icon: 'ti-wallet',
            title: 'Revenue',
            value: '$1,345',
            footerText: 'Last day',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-pulse',
            title: 'Errors',
            value: '23',
            footerText: 'In the last hour',
            footerIcon: 'ti-timer'
          },
          {
            type: 'info',
            icon: 'ti-twitter-alt',
            title: 'Followers',
            value: '+45',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          }
        ],
        earningsChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June'],
            series: [
              [230, 340, 400, 300, 570, 500, 800]
            ]
          },
          options: {
            showPoint: false,
            lineSmooth: true,
            height: '210px',
            axisX: {
              showGrid: false,
              showLabel: true
            },
            axisY: {
              offset: 40,
              showGrid: false
            },
            low: 0,
            high: 'auto',
            classNames: {
              line: 'ct-line ct-green'
            }
          }
        }

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
