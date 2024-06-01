# frozen_string_literal: true

require_relative "helpers/hash_unwrapper_helper"

class PrivateChatSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :created_at, :updated_at
end
