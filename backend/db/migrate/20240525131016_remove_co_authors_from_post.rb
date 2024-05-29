# frozen_string_literal: true

class RemoveCoAuthorsFromPost < ActiveRecord::Migration[7.1]
  def change
    drop_table :posts_users do |t|
      t.index %i[user_id post_id], unique: true
    end
  end
end
