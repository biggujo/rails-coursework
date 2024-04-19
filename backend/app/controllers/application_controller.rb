# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :configure_devise_params, if: :devise_controller?

  def configure_devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[email password nickname])
  end
end
