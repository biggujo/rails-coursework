# frozen_string_literal: true

require "pagy/extras/array"

class GroupsController < ApiController
  before_action :authenticate_user!
  before_action :set_group, only: %i[show update destroy add_member delete_member members group_posts]
  before_action :authorize_group_manage!, only: %i[update destroy]
  before_action :set_default_format

  # GET /groups
  def index
    @groups = Group.all
    render json: GroupSerializer.new(@groups, params: {current_user:}).to_h, status: :ok
  end

  # GET /groups/1
  def show
    render json: GroupSerializer.new(@group, params: {current_user:}).to_h, status: :ok
  end

  def my_joined_groups
    joined_groups = Group.joined_groups(current_user.id)
    created_groups = User.find(current_user.id).groups

    serialized_groups = GroupSerializer.new(created_groups + joined_groups, params: {current_user:}).to_h
    render json: serialized_groups
  end

  # POST /groups
  def create
    @group = Group.new(group_params)
    @group.user_id = current_user.id

    if @group.save
      render json: GroupSerializer.new(@group, params: {current_user:}).to_h, status: :ok
    else
      render json: {error: @group.errors.full_messages.to_sentence}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /groups/1
  def update
    if @group.update(group_params)
      render json: GroupSerializer.new(@group, params: {current_user:}).to_h, status: :ok
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
    if @group.users.include?(@user)
      @group.users.delete @user
      render json: UserSerializer.new(@group.users).to_h
    else
      render json: {error: "User is not a member of this group"}, status: :unprocessable_entity
    end
  end

  # GET /groups/1/members
  def members
    members = @group.users.map(&:clone)
    members << @group.user

    render json: UserSerializer.new(members).to_h
  end

  # GET /groups/1/posts
  def group_posts # rubocop:disable Metrics/AbcSize
    posts = PostQuery.new(@group.posts).call(params)

    respond_to do |format|
      format.json do
        serialized_posts = PostSerializer.new(posts, params: {current_user:}).to_h
        paginated_posts = pagy_array(serialized_posts, items: 10, outset: params[:offset].to_i)

        render json: paginated_posts
      end

      format.csv do
        csv_data = PostsCsvExportService.new(posts).to_csv
        send_data csv_data, filename: "group_posts_#{Time.now.getlocal.strftime('%Y%m%d%H%M%S')}.csv"
      end

      format.any { render json: paginated_posts }
    end
  end

  def purge_profile_photo
    group_id = params[:id]

    group = Group.find(group_id)

    if group.user.id != current_user.id
      head 401
      return
    end

    group.profile_photo.purge

    head 204
  end

  private

  def set_group
    @group = Group.find(params[:id])
  end

  def group_params
    params.permit(:name, :description, :profile_photo)
  end

  def authorize_group_manage!
    authorize! :manage, @group
  end

  def set_default_format
    request.format = :json unless params[:format]
  end
end
