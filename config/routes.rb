Rails.application.routes.draw do
  root 'welcome#index'

  get 'welcome/index' => 'welcome#index'
  
  resources :neighborhoods
  resources :place_types
  resources :challenges
end
