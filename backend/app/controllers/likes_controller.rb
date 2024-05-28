# frozen_string_literal: true

class LikesController < ApplicationController
  before_action :find_likeable
  before_action :authenticate_user!

  def like
    if current_user.voted_up_on? @likeable
      @likeable.unvote_by current_user
      render_json_with_likes_count
      return
    end
    @likeable.liked_by current_user
    render_json_with_likes_count
  end

  def dislike
    if current_user.voted_down_on? @likeable
      @likeable.unvote_by current_user
      render_json_with_likes_count
      return
    end
    @likeable.disliked_by current_user
    render_json_with_likes_count
  end

  private
  def find_likeable
    @likeable_type = params[:likeable_type].classify
    @likeable = @likeable_type.constantize.find(params[:likeable_id])
  end

  def render_json_with_likes_count
    render json: { "#{@likeable_type}": @likeable,
                   likes_count: @likeable.likes_count,
                   dislikes_count: @likeable.dislikes_count }
  end
end
