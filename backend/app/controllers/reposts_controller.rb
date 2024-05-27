# frozen_string_literal: true

class RepostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: %i[destroy update create show index]
  before_action :set_post, only: %i[create]
  before_action :set_repost, only: %i[destroy update show]
  before_action :authorize_repost_manage!, only: %i[destroy update]
  before_action :authorize_repost_create!, only: %i[create]
  before_action :check_user_possess_repost!, except: %i[create index show]

  # GET /users/1/reposts
  def index
    @reposts = @user.reposts
    render json: RepostSerializer.new(@reposts, params: { current_user: current_user }).to_h
  end

  # GET /users/1/reposts/1
  def show
    render json: RepostSerializer.new(@repost, params: { current_user: current_user }).to_h
  end

  # POST /users/1/reposts
  def create
    if @post.user == @user
      render json: { error: "User can't self repost" }, status: :unprocessable_entity
      return
    end

    @repost = Repost.new(repost_params)
    @repost.user = @user

    if @repost.save
      render json: RepostSerializer.new(@repost, params: { current_user: current_user }).to_h, status: :created
    else
      render json: { error: @repost.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1/reposts/1
  def update
    if @repost.update(repost_params)
      render json: RepostSerializer.new(@repost, params: { current_user: current_user }).to_h, status: :ok
    else
      render json: { error: @repost.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  # DELETE /users/1/reposts/1
  def destroy
    @repost.destroy!
    render json: { success: "Repost deleted successfully" }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_post
    @post = Post.find(params[:post_id])
  end

  def set_repost
    @repost = Repost.find(params[:id])
  end

  def repost_params
    if action_name == 'create'
      params.require(:repost).permit(:content, :post_id)
    elsif action_name == 'update'
      params.require(:repost).permit(:content)
    end
  end

  def authorize_repost_manage!
    authorize! :manage, @repost
  end

  def authorize_repost_create!
    temp_repost = Repost.new(user: @user)
    authorize! :manage, temp_repost
  end

  def check_user_possess_repost!
    unless @repost.user == @user
      render json: { error: "User #{@user.id} doesn't possess Repost #{@repost.id}" }, status: :unprocessable_entity
    end
  end
end
