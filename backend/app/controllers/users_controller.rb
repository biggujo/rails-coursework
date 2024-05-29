# frozen_string_literal: true

require "pagy/extras/array"

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

    render json: UserExtendedSerializer.new(user).to_h.merge({
                                                               is_following: current_user.following.exists?(user.id)
                                                             }), status: :ok
  end

  def user_posts
    user = User.find(params[:id])

    posts = PostQuery.new(user.posts).call(params)

    serialized_posts = PostSerializer.new(posts, params: {current_user:}).to_h

    paginated_posts = pagy_array(serialized_posts, items: 10, outset: params[:offset].to_i)

    render json: paginated_posts
  end

  def update
    # No need to check for an error
    user = User.find(params[:id])

    if user.update(user_params)
      render json: UserSerializer.new(user).to_h
    else
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def purge_profile_photo
    current_user.profile_photo.purge

    head 204
  end

  def refresh
    render json: UserExtendedSerializer.new(current_user).to_h,
           status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:email, :nickname, :city, :country, :full_name, :profile_photo)
  end
end
