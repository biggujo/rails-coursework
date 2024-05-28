require 'pagy/extras/array'

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
    posts = PostSerializer.new(user.posts, params: { current_user: current_user }).to_h

    sorted_all_posts = posts.sort_by { |post| post[:created_at] }.reverse

    metadata, paginated_posts = pagy_array(sorted_all_posts, items: 10, outset: params[:offset].to_i)

    response.headers['Total'] = metadata.count.to_s
    response.headers['Per-Page'] = metadata.items.to_s
    response.headers['Page'] = metadata.page.to_s

    render json: paginated_posts
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
