# frozen_string_literal: true
require_relative 'helpers/hash_unwrapper_helper'

class CommentSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :text, :created_at, :updated_at, :post_id

  attribute :likes_count do |post|
    post.get_upvotes.size
  end

  attribute :dislikes_count do |post|
    post.get_downvotes.size
  end

  attribute :user do |comment|
    UserSerializer.new(comment.user).to_h
  end

  attribute :liked do |comment, params|
    params[:current_user].voted_up_on?(comment)
  end

  attribute :disliked do |comment, params|
    params[:current_user].voted_down_on?(comment)
  end
end
