# frozen_string_literal: true

class GroupSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :name, :description, :user
end
