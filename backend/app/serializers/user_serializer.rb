class UserSerializer
  include FastJsonapi::ObjectSerializer
  include HashUnwrapperHelper

  attributes :id, :email, :created_at
end
