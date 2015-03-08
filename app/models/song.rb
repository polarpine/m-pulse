class Song < ActiveRecord::Base

	def returnSongs(bpm)
		bpm_start = bpm - 15
		bpm_stop = bpm + 15
		@songs = Song.where(bpm: bpm_start..bpm_stop)
	end

end
