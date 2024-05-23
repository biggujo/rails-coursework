# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def respond_with(resource, _opts={})
      if resource.persisted?
        render json: {
          message: "Successful sign up",
          data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }, status: :ok
      else
        render json: {
          status: {
            error: "Couldn't sign up"
          }
        }, status: :unprocessable_entity
      end
    end
  end
end
