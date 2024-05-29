# frozen_string_literal: true

require_relative "helpers/hash_unwrapper_helper"

class UserSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :email, :last_seen_at, :nickname, :full_name, :created_at

  attributes :profile_photo do |user|
    user.profile_photo.url
  end
end
