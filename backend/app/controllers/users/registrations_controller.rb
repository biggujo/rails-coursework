# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        message: 'Successful sign up',
        data: UserExtendedSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: {
        status: {
          error: "Couldn't sign up"
        }
      }, status: :unprocessable_entity
    end
  end

  def sign_up_params
    params.require(:user).permit(:email, :nickname, :full_name, :password, :country, :city).tap do |user_params|
      user_params[:admin] = user_params[:email].ends_with?("@karazin.ua")
    end
  end
end
