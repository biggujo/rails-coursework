# frozen_string_literal: true

class CreateFriends < ActiveRecord::Migration[7.1]
  def change
    create_table :friends do |t|
      t.integer :user_id
      t.integer :friend_id
      t.timestamps null: false
    end

    add_index :friends, :user_id
    add_index :friends, :friend_id
    add_index :friends, %i[user_id friend_id], unique: true
  end
end
