class AddColumnsToChallenges < ActiveRecord::Migration
  def change
    add_column :challenges, :player_name, :string
    add_column :challenges, :hood_name, :string
    add_column :challenges, :place_type, :string
  end
end
