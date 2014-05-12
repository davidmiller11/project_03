class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name
      t.float :lat
      t.float :lng
      t.integer :radius
      t.timestamps
    end

    create_table :neighborhoods do |t|
      t.belongs_to :city
      t.string :name
      t.float :lat
      t.float :lng
      t.integer :radius
      t.timestamps
    end

    create_table :places do |t|
      t.belongs_to :neighborhood
      t.string :name
      t.string :place_type
      t.float :lat
      t.float :lng
      t.text :photo_url
      t.text :reference_id
      t.string :vicinity
      t.timestamps
    end
  end
end
