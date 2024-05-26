Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'sign_in',
    sign_out: 'sign_out',
    registration: 'sign_up'
  },
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  resources :users, only: [:index, :profile]
  resources :private_chats, only: [:index, :show, :create] do
    resources :messages, only: [:index, :create]
  end
  resources :pings, only: [:index]

  post "/profile/update", to: "users#update"
  get "/profile", to: "users#profile"
  get "/users/refresh", to: "users#refresh"

  get "/chats", to: "private_chats#my_chats"
  get "/chats/:id", to: "private_chats#show"

  mount ActionCable.server => '/cable'
  # get "/users", to: "users#index"

  # Defines the root path route ("/")
  # root "posts#index"
end
