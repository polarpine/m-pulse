class CreateMpulses < ActiveRecord::Migration
  def change
    create_table :mpulses do |t|

      t.timestamps
    end
  end
end
