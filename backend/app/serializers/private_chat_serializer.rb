require_relative 'helpers/hash_unwrapper_helper'

class PrivateChatSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :user_1_id, :user_2_id, :created_at, :updated_at
end
