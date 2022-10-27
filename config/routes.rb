Rails.application.routes.draw do
  
  resources :albums, only: [:index, :show, :create] do
    resources :reviews, only: [:index, :show]
  end

  resources :reviews, only: [:update, :destroy, :create, :index]

  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end