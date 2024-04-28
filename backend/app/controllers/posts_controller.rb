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
    @post.user_id = current_user.id

    # Build co-authors for the post
    @post.co_authors = retrieve_co_authors

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    @post.co_authors = retrieve_co_authors

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

  def post_comments
    render json: @post.comments
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:content, co_author_ids: [])
  end

  def authorize_post_manage!
    authorize! :manage, @post
  end

  def retrieve_co_authors
    post_co_authors = []
    co_author_ids = params[:co_author_ids] # This should be an array of user IDs
    co_author_ids.each do |id|
      co_author = User.find(id)
      post_co_authors << co_author
    end

    post_co_authors
  end
end
