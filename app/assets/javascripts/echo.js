//EchoNest API Specs
//Your API Key: XVGKI8UKHAE9MSPJ5 
//Your Consumer Key: f67ca1657e0d8c3463732334ebeddd0a 
//Your Shared Secret: 1GcfsztMRf6Vq7o44+tuuQ

"http://developer.echonest.com/api/v4/song/search?api_key=XVGKI8UKHAE9MSPJ5&style=rock&max_tempo=150&min_tempo=140&results=10"

var findTempo = function (min, max) {
	min = min || '50'
	max = max || '300'
	$.ajax({
		url: 'http://developer.echonest.com/api/v4/song/search?api_key=XVGKI8UKHAE9MSPJ5&max_tempo=' + max + '&min_tempo='+ min +'&results=6&bucket=id:spotify&bucket=tracks&limit=true',
		success: function (response) {
			console.log(response)
			var song_id = response.response.songs[0].tracks[0].foreign_id.slice(14)
			// console.log(song_id)
			findSong(song_id)
		}
	});
};

