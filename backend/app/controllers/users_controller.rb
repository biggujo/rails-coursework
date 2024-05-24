class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: {
      data: UserSerializer.new(User.all).to_h
    }
  end

  def profile
    render json: UserSerializer.new(current_user).to_h,
           status: :ok
  end

  def refresh
    render json: UserRefreshSerializer.new(current_user).to_h,
           status: :ok
  end
end
