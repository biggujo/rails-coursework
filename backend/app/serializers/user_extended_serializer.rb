require_relative 'helpers/hash_unwrapper_helper'

# It is an extended serializer for user includes all other fields
class UserExtendedSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :email, :last_seen_at, :nickname, :created_at, :updated_at
end