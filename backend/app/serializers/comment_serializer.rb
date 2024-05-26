# frozen_string_literal: true

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
end
