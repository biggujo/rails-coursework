# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  protected

  def authenticate_admin_user!
    authenticate_user!
    return if current_user.admin?

    render json: {error: "Unauthorized access"}, status: :unauthorized
  end

  def current_admin_user
    return unless current_user&.admin?

    current_user
  end
end
