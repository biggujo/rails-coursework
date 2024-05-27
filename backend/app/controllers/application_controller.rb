class ApplicationController < ActionController::API
  before_action :configure_devise_params, if: :devise_controller?
  before_action :update_last_seen_at, if: -> { user_signed_in? && current_user.last_seen_at < 5.minutes.ago }

  include Pagy::Backend

  def update_last_seen_at
    current_user.update_column(:last_seen_at, Time.now)
  end

  def configure_devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :nickname])
  end
end
