class AddTables < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.text :password_digest
      t.timestamps
    end

    create_table :challenges do |t|
      t.belongs_to :user
      t.belongs_to :neighborhood_place_type
      t.integer :score_total
      t.float :score_avg
      t.timestamps
    end
  end
end
