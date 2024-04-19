require_relative "helpers/hash_unwrapper_helper"

class UserRefreshSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :email, :nickname
end
