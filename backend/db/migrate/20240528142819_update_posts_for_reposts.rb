# frozen_string_literal: true

class UpdatePostsForReposts < ActiveRecord::Migration[7.1]
  def change
    # Drop the reposts table
    drop_table :reposts do |t|
      t.string :content
      t.references :post, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    # Add reposted_post_id to the posts table
    add_reference :posts, :reposted_post, foreign_key: {to_table: :posts}, null: true
  end
end
