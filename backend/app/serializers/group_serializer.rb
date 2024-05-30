# frozen_string_literal: true

require_relative "helpers/hash_unwrapper_helper"

class GroupSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :name, :description
  attributes :members_count do |object|
    object.users.size + 1 # include creator
  end

  attributes :is_joined do |group, params|
    group.users.include? params[:current_user]
  end

  attributes :is_creator do |group, params|
    group.user.id == params[:current_user].id
  end

  attribute :user do |group|
    UserSerializer.new(group.user).to_h
  end
end
