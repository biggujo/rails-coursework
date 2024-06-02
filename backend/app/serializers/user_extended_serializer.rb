# frozen_string_literal: true

require_relative "helpers/hash_unwrapper_helper"

# It is an extended serializer for user includes all other fields
class UserExtendedSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :email, :city, :country, :full_name, :nickname, :admin, :last_seen_at, :created_at, :updated_at

  attributes :friends do |user|
    {
      friends: user.mutual_friends.length,
      following: user.following.length,
      followers: user.followers.length
    }
  end

  attributes :profile_photo do |user|
    user.profile_photo.url
  end
end
