class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :name
      t.string :artist
      t.string :spotifyID
      t.integer :bpm

      t.timestamps
    end
  end
end
