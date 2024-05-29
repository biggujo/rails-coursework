# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  respond_to :json

  def respond_with(resource, _opts={})
    if resource.persisted?
      render json: {
        message: "Password changed successfully"
      }, status: :ok
    else
      render json: {
        status: {
          error: "Couldn't change password"
        }
      }, status: :unprocessable_entity
    end
  end
end
