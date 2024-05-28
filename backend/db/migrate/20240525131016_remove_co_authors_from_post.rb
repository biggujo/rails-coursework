class RemoveCoAuthorsFromPost < ActiveRecord::Migration[7.1]
  def change
    drop_table :posts_users
  end
end
