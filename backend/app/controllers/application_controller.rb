# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Pagy::Backend
  include ActiveStorage::SetCurrent
  before_action :configure_devise_params, if: :devise_controller?
  before_action :update_last_seen_at, if: -> { user_signed_in? && current_user.last_seen_at < 5.minutes.ago }

  include Pagy::Backend

  def update_last_seen_at
    current_user.update(last_seen_at: Time.now.getlocal)
  end

  def configure_devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[email password nickname country city full_name])
  end
end
