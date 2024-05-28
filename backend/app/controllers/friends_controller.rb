# frozen_string_literal: true

class FriendsController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_friends_manage!, only: %i[create destroy]

  def create
    return render_error("Can't add yourself as a friend") if same_user?

    user = User.find(params[:user_id])
    friend = User.find(params[:friend_id])

    return render_error("Already added as a friend") if user.friends.include?(friend)

    user.friends << friend
    render json: {success: "Friend added successfully"}, status: :created
  rescue ActiveRecord::RecordNotFound
    render_error("User not found")
  end

  def destroy
    user = User.find(params[:user_id])
    friend = User.find(params[:id])

    return render_error("Friend not found") unless user.friends.include?(friend)

    user.remove_friend(friend)
    render json: {success: "Friend removed successfully"}, status: :ok
  rescue ActiveRecord::RecordNotFound
    render_error("User not found")
  end

  def mutual_friends
    user = User.find(params[:user_id])
    render json: UserSerializer.new(user.mutual_friends).to_h, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {error: "User not found"}, status: :not_found
  end

  def followers
    user = User.find(params[:user_id])
    render json: UserSerializer.new(user.followers).to_h, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {error: "User not found"}, status: :not_found
  end

  def following
    user = User.find(params[:user_id])
    render json: UserSerializer.new(user.following).to_h, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: {error: "User not found"}, status: :not_found
  end

  private

  def same_user?
    params[:user_id].to_s.eql? params[:friend_id].to_s
  end

  def render_error(message)
    render json: {error: message}, status: :unprocessable_entity
  end

  def authorize_friends_manage!
    return if params[:user_id].to_s == current_user.id.to_s

    raise CanCan::AccessDenied
  end
end
