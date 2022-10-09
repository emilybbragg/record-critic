class CreateAlbums < ActiveRecord::Migration[6.1]
  def change
    create_table :albums do |t|
      t.string :name
      t.string :artist
      t.string :image
      t.integer :year

      t.timestamps
    end
  end
end
