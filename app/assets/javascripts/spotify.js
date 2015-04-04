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
            getUserPlaylistsSpotify(response.id, accessToken)
        }

    });
}



var getUserPlaylistsSpotify = function(user_id, accessToken) {
    $.ajax({
        url: 'https://api.spotify.com/v1/users/' +user_id+ '/playlists',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response){
            console.log(response.items[0].name)
            document.getElementById("user_playlists").innerHTML = "Your first five playlists are<br>" +
            response.items[0].name + '<br>' +
            response.items[1].name + '<br>' +
            response.items[2].name + '<br>' +
            response.items[3].name + '<br>' +
            response.items[4].name
        }

    });
}




$(document).ready(function(){
	$("#loginSpotify").on('click', authorizeUserSpotify)
    $("#showMyPlaylists").on('click', getUserDataSpotify)

})


