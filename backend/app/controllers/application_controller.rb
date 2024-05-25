class ApplicationController < ActionController::API
  before_action :configure_devise_params, if: :devise_controller?

  include Pagy::Backend

  def configure_devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :nickname])
  end
end
