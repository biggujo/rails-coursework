class UpdatePostsForReposts < ActiveRecord::Migration[7.1]
  def change
    # Drop the reposts table
    drop_table :reposts

    # Add reposted_post_id to the posts table
    add_reference :posts, :reposted_post, foreign_key: { to_table: :posts }, null: true
  end
end

