var app = new Vue({
	el: '#app',
	data: {
		results: [],
		id: 16,
		image: 'test.jpg',
		roomPrice: 916,
		headline: 'Historic Home in Queen Anne',
		roomAvailability: 1,
		totalRoomCount: 5,
		earliestAvailable: '2019-03-28',
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