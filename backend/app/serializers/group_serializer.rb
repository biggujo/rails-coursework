# frozen_string_literal: true
require_relative 'helpers/hash_unwrapper_helper'

class GroupSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :name, :description
  attributes :members_count do |object|
    object.users.size
  end

  attribute :user do |group|
    UserSerializer.new(group.user).to_h
  end
end
