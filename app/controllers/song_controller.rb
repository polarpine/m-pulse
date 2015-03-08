class SongController < ApplicationController

  def addSongs
  	song = Song.new(song_params)
  	song.save
  	render :json => true

  end

  def playlistOptions
  	songBlob = Song.returnSongs(song_params[:bpm_request].to_i)
  	render :json => songBlob
  end



  private

  def song_params
    params.require(:song).permit(:name, :artist, :bpm, :spotifyID, :bpm_request)
  end







end
