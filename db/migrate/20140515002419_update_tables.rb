class UpdateTables < ActiveRecord::Migration
  def change
    create_table :place_types do |t|
      t.string :name
      t.timestamps
    end

    create_table :neighborhood_place_types do |t|
      t.belongs_to :neighborhood
      t.belongs_to :place_type
      t.timestamps
    end

    change_table :places do |t|
      t.belongs_to :neighborhood_place_type
      t.remove :neighborhood_id, :place_type
    end
  end
end
