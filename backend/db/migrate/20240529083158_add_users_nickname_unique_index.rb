# frozen_string_literal: true

class AddUsersNicknameUniqueIndex < ActiveRecord::Migration[7.1]
  def change
    add_index :users, :nickname, unique: true
  end
end
