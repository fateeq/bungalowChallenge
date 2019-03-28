Vue.component('card', {
	props: {
		results: []
	},
	template: `
		<div id="card">
        <img :src="results[0].images[0].sm_url"/>
        <div class="listing-details">
            <div class="room-price">$ {{ results[0].room_prices[0] }}</div>
            <h3 class="headline"> {{ results[0].headline }} </h3>
            <h6 class="room-availability">{{ results[0].available_room_count }} of {{ results[0].total_room_count }} rooms available</h6>
            <h6 class="date-available">Earliest availabe: {{ results[0].earliest_available_date }}</h6>
        </div>
    </div>
	`
})

var app = new Vue({
	el: '#app',
	data() {
		return {
			results: [],
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