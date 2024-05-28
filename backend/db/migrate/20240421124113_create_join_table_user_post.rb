class CreateJoinTableUserPost < ActiveRecord::Migration[7.1]
  def change
    create_join_table :users, :posts do |t|
      t.index [:user_id, :post_id], unique: true
    end
  end
end
