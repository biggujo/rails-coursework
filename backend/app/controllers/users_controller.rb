# frozen_string_literal: true

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

  def refresh
    render json: UserRefreshSerializer.new(User.find(current_user.id)).to_h,
           status: :ok
  end
end
