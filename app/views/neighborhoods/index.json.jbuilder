json.array! (@neighborhoods) do |neighborhood|

  json.extract! neighborhood, :name, :lat, :lng, :radius, :zoom
  json.url neighborhood_url(neighborhood, format: :json)

end