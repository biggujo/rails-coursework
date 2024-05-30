# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      id_from_jwt = JWT.decode(cookies["X-Authorization"], "", false)[0]["sub"]

      reject_unauthorized_connection unless id_from_jwt

      user = User.find_by(id: id_from_jwt)

      reject_unauthorized_connection unless user

      user
    end
  end
end
