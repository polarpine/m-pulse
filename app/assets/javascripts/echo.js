
//Login to Spotify

var userLogin = function() {
  var url = 'https://accounts.spotify.com/authorize/?client_id=' + my_client_id + '&response_type=code&redirect_uri=' + redirect_uri + '&scope=' + scopes
  var w = window.open(url, '_parent', 'scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400');
  
  }


//Specs for Spotify API
var scopes = 'user-read-private playlist-read-private user-library-modify user-library-read playlist-modify-private playlist-modify-public'
var my_client_id = '580cbd7871db4617af3efba743122a64'; // Your client id
var my_secret = '41e55c17fba34ef68da571cb70207481'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

//Simple Find Song Method
var findSong = function (query) {
  query = query || "34gCuhDGsG4bRPIf9bb02f"; //Song for Melissa :)
  $.ajax({
    url: 'https://api.spotify.com/v1/tracks/' + query,
    success: function (response) {
      // $("#songHolder").html("You found: " + response.artists[0].name + " " + response.name)
      // $("iframe").attr('src', $('iframe').attr('src') + response.id)
      // $("#songPlayer").show()
      console.log("From Spotify: " + response.name + " by " + response.artists[0].name )
    }
  });
};



//EchoNest API Specs
//Your API Key: XVGKI8UKHAE9MSPJ5 
//Your Consumer Key: f67ca1657e0d8c3463732334ebeddd0a 
//Your Shared Secret: 1GcfsztMRf6Vq7o44+tuuQ


var findSongsByTempo = function (min, max, style, familiarity, hot) {
	min = min || '200' //(bpms 0-500)
	max = max || '330'
	style = style || 'rock'
	familiarity = familiarity || '0.5' //(0-1)
	hot = hot || '.1' //(0-1)
	$.ajax({
		url: 'http://developer.echonest.com/api/v4/song/search?api_key=XVGKI8UKHAE9MSPJ5&style='+ style +'&max_tempo=' + max + '&min_tempo='+ min +'&results=10&song_min_hotttnesss='+ hot + '&artist_min_familiarity=' + familiarity + '&bucket=id:spotify&bucket=tracks&limit=true',
		success: function (response) {
			songs = response.response.songs
			console.log(songs)
			for (i = 0; i < songs.length ; i++) {
    			findSong(songs[i].tracks[0].foreign_id.slice(14));
				}
		
		}
	});
};


var findTempoOfSong = function (spotify_id) {
	spotify_id = spotify_id || '34gCuhDGsG4bRPIf9bb02f'
	$.ajax({
		url:'http://developer.echonest.com/api/v4/song/profile?api_key=XVGKI8UKHAE9MSPJ5&track_id=spotify:track:'+ spotify_id +'&bucket=id:spotify&limit=true&bucket=audio_summary&bucket=song_hotttnesss&bucket=song_type&bucket=artist_hotttnesss',
		success: function (response) {
			console.log(response)
			song = response.response.songs[0]
			console.log(song)
			console.log(song.title + " by " + song.artist_name + " has " + song.audio_summary.tempo + " bpms")
			// addSongMpulse(song, spotify_id)
		
		}
	});
};

var addSongMpulse = function (song, spotify_id) {
  var songObj = {
    song: {name: song.title, artist: song.artist_name, bpm: song.audio_summary.tempo, spotifyID: spotify_id }
    }
    $.ajax({
      url: '/song',
      type: 'post',
      data: songObj,
      dataType: 'json'
    }).done(function(data){
      console.log("added new song to db")
    }).fail(function(data){
      console.log("fail from song controller")
    });
};

var getSongsMpulse = function (bpm) {
	var bpmObj = {song: {bpm_request: bpm}}
    $.ajax({
      url: '/song',
      type: 'get',
      data: bpmObj,
      dataType: 'json'
    }).done(function(data){
      console.log(data)
    }).fail(function(data){
      console.log("fail from playlist controller")
    });
};