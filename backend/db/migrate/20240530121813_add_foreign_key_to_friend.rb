# frozen_string_literal: true

class AddForeignKeyToFriend < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :friends, :users, column: :user_id
    add_foreign_key :friends, :users, column: :friend_id
  end
end
