require_relative "helpers/hash_unwrapper_helper"

class UserSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :email, :last_seen_at, :nickname, :created_at
end
