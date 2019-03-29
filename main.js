Vue.component('card', {
	props: {
		results: [],
		index: ''
	},
	template: `
		<div class="card">
        <div class="image-container">
        	<img :src="results[index].images[0].sm_url"/>
        	<div class="room-price">$ {{ results[index].room_prices[0] }}</div>
        </div>
        <div class="listing-details">
            <h3 class="headline"> {{ results[index].headline }} </h3>
            <h6 class="room-availability">{{ results[index].available_room_count }} of {{ results[index].total_room_count }} rooms available</h6>
            <h6 class="date-available">Earliest availabe: {{ results[index].earliest_available_date }}</h6>
        </div>
    </div>
	`
})

var app = new Vue({
	el: '#app',
	data() {
		return {
			results: []
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