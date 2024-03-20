class UsersController < ApplicationController
  before_action :authenticate_user!, only: :profile

  def index
    render json: {
      data: UserSerializer.new(User.all)
    }
  end

  def profile
    render json: current_user,
           status: :ok
  end
end
