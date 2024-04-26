require_relative 'helpers/hash_unwrapper_helper'

class UserSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :nickname, :created_at
end
