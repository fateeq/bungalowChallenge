Vue.component('card', {
	props: {
		results: '',
		index: '',
	},
	template: `
		<div class="card">
        <div class="image-container">
        	<img :src="listing.images[0].sm_url"/>
        	<div class="room-price" v-if="listing.available_room_count === 1">$ {{ listing.room_prices[0] }}</div>
        	<div class="room-price" v-else>$ {{ Math.min(...listing.room_prices) }} +</div>
        </div>
        <div class="listing-details">
            <h3 class="headline"> {{ listing.headline }} </h3>
            <h6 class="room-availability">{{ listing.available_room_count }} of {{ listing.total_room_count }} rooms available</h6>
            <h6 class="date-available">Earliest availabe: {{ listing.earliest_available_date }}</h6>
        </div>
    </div>
	`,
	computed: {
		listing() {
			return this.results[this.index]
		}
	}
})

var app = new Vue({
	el: '#app',
	data() {
		return {
			results: [],
			search: ''
		}
	},
	computed: {
		filteredResults: function() {
			return this.results.filter((listing) => {
				return listing.headline.toLowerCase().includes(this.search.toLowerCase())
			})
		}
	},
	mounted: function() {
		var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
		var targetUrl = 'https://stage-fieldstone.bungalow.com/api/v1/listings/properties/?market__slug=seattle'
		fetch(proxyUrl+targetUrl)
		.then( (response) => {
			return response.json()
		})
		.then((jsonData) => {
			this.results = jsonData.results
		})
		.catch(function(error) {  
		  console.log('Request failed', error)  
		});
	}
})