class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: {
      data: UserSerializer.new(User.all).to_h
    }
  end

  def show
    # No need to check for an error
    user = User.find(params[:id])

    render json: UserExtendedSerializer.new(user).to_h,
           status: :ok
  end

  def update
    # No need to check for an error
    user = User.find(params[:id])

    if user.update(user_params)
      render json: UserSerializer.new(user).to_h
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def refresh
    render json: UserRefreshSerializer.new(current_user).to_h,
           status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:email, :nickname)
  end
end
