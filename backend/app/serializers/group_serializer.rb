# frozen_string_literal: true

class GroupSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :name, :description, :user
  attributes :members_count do |object|
    object.users.size
  end

end
