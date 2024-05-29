# frozen_string_literal: true

class CreateJoinTableUserPost < ActiveRecord::Migration[7.1]
  def change
    create_join_table :users, :posts do |t|
      t.index %i[user_id post_id], unique: true
    end
  end
end
