# frozen_string_literal: true

class LikesController < ApplicationController
  before_action :find_likeable
  before_action :authenticate_user!

  def like
    @likeable.liked_by current_user
    render_json_with_likes_count
  end

  def dislike
    @likeable.disliked_by current_user
    render_json_with_likes_count
  end

  def unlike
    @likeable.unvote_by current_user
    render_json_with_likes_count
  end

  def like_status
    render json: { liked: current_user.voted_up_on?(@likeable),
                   disliked: current_user.voted_down_on?(@likeable) }
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
