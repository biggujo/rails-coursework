# frozen_string_literal: true

class CreateReposts < ActiveRecord::Migration[7.1]
  def change
    create_table :reposts do |t|
      t.string :content
      t.references :post, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
