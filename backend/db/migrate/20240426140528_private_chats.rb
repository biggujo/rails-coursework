class PrivateChats < ActiveRecord::Migration[7.1]
  def change
    create_table :private_chats do |t|
      t.references :user_1, null: false
      t.references :user_2, null: false

      t.foreign_key "users", column: "user_1_id"
      t.foreign_key "users", column: "user_2_id"
      t.index [:user_1_id, :user_2_id], :unique => true

      t.timestamps
    end
  end
end
