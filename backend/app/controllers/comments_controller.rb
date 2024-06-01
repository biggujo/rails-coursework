class CommentsController < ApiController
  before_action :set_comment, only: %i[ show update destroy ]
  before_action :set_post, only: %i[ post_comments ]
  before_action :authorize_comment_manage!, only: %i[ update destroy ]

  # GET /comments/1
  # GET /comments/1.json
  def show
    render json: CommentSerializer.new(@comment, params: {current_user:}).to_h, status: :created
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment = Comment.new(comment_params)
    @comment.post = Post.find(params[:post_id])
    @comment.user_id = current_user.id

    if @comment.save
      render json: CommentSerializer.new(@comment, params: {current_user:}).to_h, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  # PATCH/PUT /comments/1.json
  def update
    if @comment.update(comment_params)
      render json: CommentSerializer.new(@comment, params: {current_user:}).to_h, status: :ok
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment.destroy!
  end

  def post_comments
    render json: CommentSerializer.new(@post.comments, params: {current_user:}).to_h
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_comment
    @comment = Comment.find(params[:id])
  end

  def set_post
    @post = Post.find(params[:post_id])
  end

  # Only allow a list of trusted parameters through.
  def comment_params
    params.require(:comment).permit(:text)
  end

  def authorize_comment_manage!
    authorize! :manage, @comment
  end
end
