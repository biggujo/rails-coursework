# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: %i[show update destroy]
  before_action :authorize_post_manage!, only: %i[update destroy]

  # GET /posts
  # GET /posts.json
  def index
    posts = PostQuery.new(Post.all).call(params)

    serialized_posts = PostSerializer.new(posts, params: {current_user:}).to_h

    paginated_posts = pagy_array(serialized_posts, items: 10, outset: params[:offset].to_i)

    render json: paginated_posts
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
    @post.destroy!
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
    params.require(:post).permit(:content, :group_id, :reposted_post_id)
  end

  def authorize_post_manage!
    authorize! :manage, @post
  end
end
