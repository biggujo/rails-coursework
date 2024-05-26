# frozen_string_literal: true

class RepostSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :content, :created_at, :updated_at

  attribute :post do |repost|
    PostSerializer.new(repost.post).to_h
  end

  attribute :user do |repost|
    UserSerializer.new(repost.user).to_h
  end
end
