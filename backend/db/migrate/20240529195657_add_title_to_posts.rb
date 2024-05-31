# frozen_string_literal: true

class AddTitleToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :title, :string, null: false, default: "Lorem ipsum"
  end
end
