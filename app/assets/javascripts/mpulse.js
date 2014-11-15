
var findSong = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/tracks/' + query,
        success: function (response) {
        $("#songHolder").html(response.artists[0].name)
        console.log(response)
        }
    });
};

angular.module('song', [])
  .controller('songController', function() {
    this.id = 1;
    this.find = function getSong() {
      console.log(this);
      findSong(this.id)
    };
  });