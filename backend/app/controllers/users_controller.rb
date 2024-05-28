require 'pagy/extras/array'

class UsersController < ApplicationController
  include ActiveStorage::SetCurrent
  before_action :authenticate_user!
  before_action :set_default_format

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

  def user_posts
    user = User.find(params[:id])

    posts = PostQuery.new(user.posts).call(params)

    respond_to do |format|
      format.json do
        serialized_posts = PostSerializer.new(posts, params: { current_user: current_user }).to_h

        paginated_posts = pagy_array(serialized_posts, items: 10, outset: params[:offset].to_i)

        render json: paginated_posts
      end

      format.csv do
        csv_data = PostsCsvExportService.new(posts).to_csv
        send_data csv_data, filename: "group_posts_#{Time.now.strftime('%Y%m%d%H%M%S')}.csv"
      end

      format.any { render json: paginated_posts }
    end
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
    render json: UserExtendedSerializer.new(current_user).to_h,
           status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:email, :nickname, :city, :country, :full_name, :profile_photo)
  end

  def set_default_format
    request.format = :json unless params[:format]
  end
end
