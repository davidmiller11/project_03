json.array! (@place_types) do |place_type|

  json.extract! place_type, :name
  json.url place_type_url(place_type, format: :json)

end