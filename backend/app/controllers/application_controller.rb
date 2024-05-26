class ApplicationController < ActionController::API
  include Pagy::Backend
  before_action :configure_devise_params, if: :devise_controller?

  def configure_devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :nickname])
  end
end
