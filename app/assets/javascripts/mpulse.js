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
      $("#songHolder").html("You found: " + response.artists[0].name + " " + response.name)
      $("iframe").attr('src', $('iframe').attr('src') + response.id)
      $("#songPlayer").show()
      console.log(response)
    }
  });
};




//Login to Spotify

var userLogin = function() {
  var url = 'https://accounts.spotify.com/authorize/?client_id=' + my_client_id + '&response_type=code&redirect_uri=' + redirect_uri + '&scope=' + scopes
  var w = window.open(url, '_parent', 'scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400');
}


