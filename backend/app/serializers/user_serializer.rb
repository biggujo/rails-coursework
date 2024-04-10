class UserSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :email, :nickname, :created_at, :updated_at
end
