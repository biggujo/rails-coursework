# frozen_string_literal: true

class GroupsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_group, only: %i[ show update destroy add_member delete_member members group_posts ]
  before_action :authorize_group_manage!, only: %i[ update destroy ]
  before_action :set_default_format

  # GET /groups
  def index
    @groups = Group.all
    render json: GroupSerializer.new(@groups).to_h, status: :ok
  end

  # GET /groups/1
  def show
    render json: GroupSerializer.new(@group).to_h, status: :ok
  end

  # POST /groups
  def create
    @group = Group.new(group_params)
    @group.user_id = current_user.id

    if @group.save
      render json: GroupSerializer.new(@group).to_h, status: :ok
    else
      render json: {error: @group.errors.full_messages.to_sentence}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /groups/1
  def update
    if @group.update(group_params)
      render json: GroupSerializer.new(@group).to_h, status: :ok
    else
      render json: {error: @group.errors.full_messages.to_sentence}, status: :unprocessable_entity
    end
  end

  # DELETE /groups/1
  def destroy
    @group.destroy!
    render json: {success: "Group deleted successfully"}, status: :ok
  end

  # POST /groups/1/members
  def add_member
    @user = User.find(params[:user_id])
    if (@group.users + [@group.user]).include?(@user)
      render json: {error: "User is already a member of this group"}, status: :unprocessable_entity
    else
      @group.users << @user
      render json: UserSerializer.new(@group.users).to_h
    end
  end

  # DELETE /groups/1/members/1
  def delete_member
    @user = User.find(params[:user_id])
    if !@group.users.include?(@user)
      render json: {error: "User is not a member of this group"}, status: :unprocessable_entity
    else
      @group.users.delete @user
      render json: UserSerializer.new(@group.users).to_h
    end
  end

  # GET /groups/1/members
  def members
    render json: UserSerializer.new(@group.users).to_h
  end

  # GET /groups/1/posts
  def group_posts
    posts = PostQuery.new(@group.posts).call(params)

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

  private
  def set_group
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name, :description)
  end

  def authorize_group_manage!
    authorize! :manage, @group
  end

  def set_default_format
    request.format = :json unless params[:format]
  end
end