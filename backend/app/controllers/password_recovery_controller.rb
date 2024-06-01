# frozen_string_literal: true

class PasswordRecoveryController < ApiController
  def reset
    user = User.find_by(email: password_params[:email])

    if user.present?
      user.send_reset_password_instructions
      render json: {message: "Password recovery instructions have been sent to your email."}, status: :ok
    else
      render json: {error: "Email not found."}, status: :not_found
    end
  end

  private

  def password_params
    params.require(:user).permit(:email)
  end
end
