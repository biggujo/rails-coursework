# frozen_string_literal: true

class PostSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :content, :created_at, :updated_at

  attribute :likes_count do |post|
    post.get_upvotes.size
  end

  attribute :dislikes_count do |post|
    post.get_downvotes.size
  end

  attribute :user do |post|
    UserSerializer.new(post.user).to_h
  end
end
