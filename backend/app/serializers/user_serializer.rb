# frozen_string_literal: true

require_relative "helpers/hash_unwrapper_helper"

class UserSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :email, :created_at
end
