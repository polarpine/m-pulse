var accessToken = null;



var authorizeUserSpotify = function() {
	var scopes = 'user-read-private playlist-read-private user-library-modify user-library-read playlist-modify-private playlist-modify-public'
	var my_client_id = '580cbd7871db4617af3efba743122a64';
	// var my_secret = '41e55c17fba34ef68da571cb70207481';
	var redirect_uri = 'http://localhost:3000/callback'; 
  	var url = 'https://accounts.spotify.com/authorize/?client_id=' + my_client_id + '&response_type=token&redirect_uri=' + encodeURIComponent(redirect_uri) + '&scope=' + scopes + '&state=biteme!'
    var w = window.open(url, '_parent', 'scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400');
    console.log("authorizeUserSpotify function")
    console.log(document.location)
    Token = parseURL(document.location)
    sessionStorage.setItem('user_token', Token.searchObject.access_token)

}

function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    parser.href = url;
    queries = parser.hash.replace(/^\#/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }

    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}


var getUserDataSpotify = function() {
    var accessToken = sessionStorage.getItem('user_token')
    $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response){
            sessionStorage.setItem('user_id', response.id)
            console.log(response)
            getUserPlaylistsSpotify(response.id, accessToken)
        }

    });
}



var getUserPlaylistsSpotify = function(user_id, accessToken) {
    user_id = user_id || sessionStorage.getItem('user_id')
    accessToken = accessToken || sessionStorage.getItem('user_token')
    $.ajax({
        url: 'https://api.spotify.com/v1/users/' +user_id+ '/playlists',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response){
            console.log(response)
            listUserPlaylists(response.items)
        }

    });
}

var listUserPlaylists = function(playlists) {
    var user_id = sessionStorage.getItem('user_id')
    console.log(user_id)
    var playlistHolder = []

  $.each(playlists, function(obj, value){
    $li = $("<li />", {
      "class" : "list-group-item"
    })

    $div1 = $("<div></div>", {
      "class" : "playlist-name-container"
    })

    $div2 = $("<div></div>", {
      "class" : "playlist-player-container"
    })

    // $("<iframe />", { src: 'https://embed.spotify.com/?uri=spotify:user:'+user_id+':playlist:'+value.id+'width="250" height="80" frameborder="0" allowtransparency="true"', "class": "player_box" }).appendTo($div2)
    $("<iframe />", { src: 'https://embed.spotify.com/?uri=spotify:user:'+user_id+':playlist:'+value.id, "class": "player_box" }).appendTo($div2)


    $("<h3 />", { text: value.name }).appendTo($div1)

    $li.append($div1)
    $li.append($div2)

    playlistHolder.push($li)
  });

  $("#user_playlists").html(playlistHolder)
}

var getPlaylistTracks = function(playlist_id, user_id, accessToken){
    user_id = user_id || sessionStorage.getItem('user_id')
    accessToken = accessToken || sessionStorage.getItem('user_token')
    $.ajax({
    url: 'https://api.spotify.com/v1/users/'+user_id+'/playlists/'+playlist_id,
    headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    success: function(response){
        console.log(response)

    }

});
}


var makeNewPlaylist = function(playlist_name){
    user_id = sessionStorage.getItem('user_id')
    accessToken = sessionStorage.getItem('user_token')
    playlist_name = playlist_name || 'MyPlaylist'
    playlist_name = 'mpulsity-'+playlist_name
    $.ajax({
    url: 'https://api.spotify.com/v1/users/'+user_id+'/playlists',
    type: 'post',
    dataType: 'json',
    data: JSON.stringify({"name": playlist_name, "public": false }),
    headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json' 
    },
    success: function(response){
        console.log(response.id)
        addTracksPlaylist(response.id)

    },
    fail: function(response){
        console.log(response)
    }

});
}

var addTracksPlaylist = function(playlist_id, tracks){
    tracks = tracks || ["0eGsygTp906u18L0Oimnem", "1301WleyT98MSxVHPZCA6M"]
    for (i=0; i < tracks.length; i++){
        tracks[i] = "spotify:track:".concat(tracks[i])
    }

    user_id = sessionStorage.getItem('user_id')
    accessToken = sessionStorage.getItem('user_token')
    $.ajax({
    url: 'https://api.spotify.com/v1/users/'+user_id+'/playlists/'+playlist_id+'/tracks',
    type: 'post',
    dataType: 'json',
    data: JSON.stringify({"uris": tracks }),
    headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json' 
    },
    success: function(response){
        console.log(response.id)

    },
    fail: function(response){
        console.log(response)
    }

});

}





$(document).ready(function(){
	$("#loginSpotify").on('click', authorizeUserSpotify)
    $("#showMyPlaylists").on('click', getUserDataSpotify)

})


