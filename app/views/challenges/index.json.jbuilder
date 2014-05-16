json.array! (@challenges) do |challenge|

  json.extract! challenge, :player_name, :hood_name, :place_type, :score_avg
  json.url challenge_url(challenge, format: :json)

end