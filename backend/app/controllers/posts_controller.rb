class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: %i[ show update destroy post_comments ]
  before_action :authorize_post_manage!, only: %i[ update destroy ]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
    render json: @posts
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    render json: @post
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)
    @post.user = current_user
    @post.groups << Group.find(params[:group_id]) if params[:group_id]

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    if @post.update(post_params)
      render json: @post, status: :ok, location: @post
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
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:content, :group_id)
  end

  def authorize_post_manage!
    authorize! :manage, @post
  end
end
