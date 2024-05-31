# frozen_string_literal: true

require_relative "helpers/hash_unwrapper_helper"

class PostSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :title, :content, :created_at, :updated_at

  attribute :likes_count do |post|
    post.get_upvotes.size
  end

  attribute :dislikes_count do |post|
    post.get_downvotes.size
  end

  attribute :user do |post|
    UserSerializer.new(post.user).to_h
  end

  attribute :group do |post, params|
    GroupSerializer.new(post.group, params: {current_user: params[:current_user]}).to_h if post.group
  end

  attribute :repost do |post, params|
    PostSerializer.new(post.repost, params: {current_user: params[:current_user]}).to_h if post.repost
  end

  attribute :liked do |post, params|
    params[:current_user].voted_up_on?(post)
  end

  attribute :disliked do |post, params|
    params[:current_user].voted_down_on?(post)
  end

  attribute :photos do |post|
    post.photos.map(&:url)
  end
end
