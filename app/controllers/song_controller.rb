class SongController < ApplicationController

  def addSongs
  	song = Song.new(song_params)
  	song.save
  	p "in addSongs controller"
  	render :json => true
  	return 

  end

  private

  def song_params
    params.require(:song).permit(:name, :artist, :bpm, :spotifyID)
  end






end
