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

  def update
    json_body = JSON.parse(request.body.read)

    user = find_user

    new_email = json_body["email"]
    new_nickname = json_body["nickname"]

    user.email = new_email if new_email

    user.nickname = new_nickname if new_nickname

    user.save!

    render json: UserSerializer.new(user).to_h
  rescue StandardError
    render json: {
      error: "No data is provided"
    }, status: :bad_request
  end

  def refresh
    render json: UserRefreshSerializer.new(User.find(current_user.id)).to_h,
           status: :ok
  end

  private

  def find_user
    User.find(current_user.id)
  end
end
