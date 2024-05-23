# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    # skip_before_filter :verify_authenticity_token
    respond_to :json

    def respond_with(resource, _opts = {})
      render json: {
        message: "Successful log in",
        data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }, status: :ok
    end

    def respond_to_on_destroy
      if current_user
        render json: {
          message: "Successful log out"
        }, status: :ok
      else
        render json: {
          message: "Couldn't find the active session"
        }, status: :unauthorized
      end
    end
  end
end
