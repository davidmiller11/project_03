class AddZoomToNeighborhoods < ActiveRecord::Migration
  def change
    add_column :neighborhoods, :zoom, :integer
  end
end
