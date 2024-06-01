# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength
Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, path: "", path_names: {
                                 sign_in: "sign_in",
                                 sign_out: "sign_out",
                                 registration: "sign_up"
                               },
                     controllers: {
                       sessions: "users/sessions",
                       registrations: "users/registrations",
                       passwords: "users/passwords"
                     }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  resources :users, only: %i[index show update] do
    resources :friends, only: %i[create destroy] do
      collection do
        get :mutual_friends
        get :followers
        get :following
      end
    end
  end

  resources :private_chats, only: %i[index show create] do
    resources :messages, only: %i[index create]
  end

  resources :pings, only: [:index]
  resources :posts do
    resources :comments, except: [:index] do
      get "/", to: "comments#post_comments", on: :collection
    end
  end
  resources :groups do
    member do
      post "/members", to: "groups#add_member"
      delete "/members/:user_id", to: "groups#delete_member"
      get "/members", to: "groups#members"
      get "/posts", to: "groups#group_posts"
    end
  end

  post "/like", to: "likes#like", as: "like"
  post "/dislike", to: "likes#dislike", as: "dislike"

  post "/profile/update", to: "users#update"
  delete "/profile_photo", to: "users#purge_profile_photo"
  get "/profile", to: "users#profile"
  get "/refresh", to: "users#refresh"

  delete "/group_profile_photo/:id", to: "groups#purge_profile_photo"
  delete "/post_photos/:id", to: "posts#purge_photos"

  get "/my_groups", to: "groups#my_joined_groups"

  get "/users/:id/posts", to: "users#user_posts"

  get "/chats", to: "private_chats#my_chats"
  get "/chats/:id", to: "private_chats#show"

  post "/password/reset", to: "password_recovery#reset"

  get "/search", to: "search#search"

  mount ActionCable.server => "/cable"
  # get "/users", to: "users#index"

  # Defines the root path route ("/")
  # root "posts#index"
end
# rubocop:enable Metrics/BlockLength
