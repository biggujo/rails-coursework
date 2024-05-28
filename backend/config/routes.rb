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
  resources :pings, only: [:index]
  resources :posts do
    resources :comments, except: [:index] do
      get '/', to: 'comments#post_comments', on: :collection
    end
  end
  resources :groups do
    member do
      post '/members', to: 'groups#add_member'
      delete '/members/:user_id', to: 'groups#delete_member'
      get '/members', to: 'groups#members'
      get '/posts', to: 'groups#group_posts'
    end
  end

  post '/like', to: 'likes#like', as: 'like'
  post '/dislike', to: 'likes#dislike', as: 'dislike'

  post "/profile/update", to: "users#update"
  get "/profile", to: "users#profile"
  get "/users/refresh", to: "users#refresh"

  get "/users/:id/posts", to: "users#user_posts"
  # get "/users", to: "users#index"

  # Defines the root path route ("/")
  # root "posts#index"
end
