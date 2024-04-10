class UsersController < ApplicationController
  # before_action :authenticate_user!, only: [:profile]

  def index
    render json: {
      data: UserSerializer.new(User.all).to_h
    }
  end

  def profile
    render json: current_user,
           status: :ok
  end

  def update
    json_body = JSON.parse(request.body.read)

    user = User.find(params[:user_id])

    if json_body['nickname']
      user.nickname = json_body['nickname']
    end

    if json_body['email']
      user.email = json_body['email']
    end

    user.save!

    render json: UserSerializer.new(user).to_h
  end

  def refresh
    render json: UserRefreshSerializer.new(User.find(current_user.id)).to_h,
           status: :ok
  end
end
