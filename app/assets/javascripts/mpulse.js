var scopes = 'user-read-private playlist-read-private user-library-modify user-library-read playlist-modify-private playlist-modify-public'
var my_client_id = '580cbd7871db4617af3efba743122a64'; // Your client id
var my_secret = '41e55c17fba34ef68da571cb70207481'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri


var findSong = function (query) {
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

angular.module('song', [])
.controller('SongController', function() {
  this.id = '3L7BcXHCG8uT92viO6Tikl';
  this.login = function logUserIn() {
    userLogin()
    console.log('you are logging in to Spotify');
  };
  this.find = function getSong() {
    console.log(this);
    findSong(this.id)
  };
});





var userLogin = function() {
  var url = 'https://accounts.spotify.com/authorize/?client_id=' + my_client_id + '&response_type=code&redirect_uri=' + redirect_uri + '&scope=' + scopes
  var w = window.open(url, '_parent', 'scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400');
}


