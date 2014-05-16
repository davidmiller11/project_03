# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140516014042) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "challenges", force: true do |t|
    t.integer  "user_id"
    t.integer  "neighborhood_place_type_id"
    t.integer  "score_total"
    t.float    "score_avg"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "player_name"
    t.string   "hood_name"
    t.string   "place_type"
  end

  create_table "cities", force: true do |t|
    t.string   "name"
    t.float    "lat"
    t.float    "lng"
    t.integer  "radius"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "neighborhood_place_types", force: true do |t|
    t.integer  "neighborhood_id"
    t.integer  "place_type_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "neighborhoods", force: true do |t|
    t.integer  "city_id"
    t.string   "name"
    t.float    "lat"
    t.float    "lng"
    t.integer  "radius"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "zoom"
  end

  create_table "place_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "places", force: true do |t|
    t.string   "name"
    t.float    "lat"
    t.float    "lng"
    t.text     "photo_url"
    t.text     "reference_id"
    t.string   "vicinity"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "neighborhood_place_type_id"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.text     "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
