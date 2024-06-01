# frozen_string_literal: true

class ApiController < ActionController::API
  include Pagy::Backend
  before_action :configure_devise_params, if: :devise_controller?
  before_action :update_last_seen_at, if: -> { user_signed_in? && current_user.last_seen_at < 5.minutes.ago }

  def update_last_seen_at
    current_user.update_column(:last_seen_at, Time.now)
  end

  def configure_devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :nickname, :country, :city, :full_name])
  end
end