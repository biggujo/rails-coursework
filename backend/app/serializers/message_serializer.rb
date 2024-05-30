# frozen_string_literal: true

require_relative "helpers/hash_unwrapper_helper"

class MessageSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :message, :author_id
end
