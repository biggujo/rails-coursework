# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: %i[show update destroy]
  before_action :authorize_post_manage!, only: %i[update destroy]
  before_action :set_default_format

  # GET /posts
  # GET /posts.json
  def index # rubocop:disable Metrics/AbcSize
    posts = PostQuery.new(Post.all).call(params)

    respond_to do |format|
      format.json do
        serialized_posts = PostSerializer.new(posts, params: {current_user:}).to_h

        paginated_posts = pagy_array(serialized_posts, items: 10, outset: params[:offset].to_i, page: params[:page])

        render json: paginated_posts
      end

      format.csv do
        csv_data = PostsCsvExportService.new(posts).to_csv
        send_data csv_data, filename: "group_posts_#{Time.now.getlocal.strftime('%Y%m%d%H%M%S')}.csv"
      end

      format.any { render json: paginated_posts }
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    render json: PostSerializer.new(@post, params: {current_user:}).to_h
  end

  # POST /posts
  # POST /posts.json
  def create
    build_post(post_params)

    if @post.save
      render json: PostSerializer.new(@post, params: {current_user:}).to_h, status: :created,
             location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    if @post.update(post_params)
      render json: PostSerializer.new(@post, params: {current_user:}).to_h, status: :ok, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    post = @post

    @post.destroy!

    render json: PostSerializer.new(post, params: {current_user:}).to_h
  end

  def purge_photos
    post_id = params[:id]

    post = Post.find(post_id)

    if post.user.id != current_user.id
      head 401
      return
    end

    post.photos.purge

    head 204
  end

  private

  def build_post(post_params)
    @post = Post.new(post_params)
    @post.user = current_user
    @post.group = Group.find(params[:group_id]) if params[:group_id]
    @post.repost = Post.find(params[:reposted_post_id]) if params[:reposted_post_id]
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.permit(:title, :content, :group_id, :reposted_post_id, photos: [])
  end

  def authorize_post_manage!
    authorize! :manage, @post
  end

  def set_default_format
    request.format = :json unless params[:format]
  end
end
