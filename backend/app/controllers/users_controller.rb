class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: {
      data: UserSerializer.new(User.all).to_h
    }
  end

  def profile
    render json: current_user,
           status: :ok
  end

  def user_posts
    user = User.find(params[:id])
    all_posts = user.posts
    render json: all_posts
  end

  def update
    begin
      json_body = JSON.parse(request.body.read)

      user = User.find(current_user.id)

      new_email = json_body['email']
      new_nickname = json_body['nickname']

      if new_email
        user.email = new_email
      end

      if new_nickname
        user.nickname = new_nickname
      end

      user.save!

      render json: UserSerializer.new(user).to_h

    rescue Exception => message
      render json: {
        error: "No data is provided"
      }, status: :bad_request
    end
  end

  def refresh
    render json: UserRefreshSerializer.new(User.find(current_user.id)).to_h,
           status: :ok
  end
end
