class PrivateChats < ActiveRecord::Migration[7.1]
  def change
    create_table :private_chats do |t|
      t.references :user_1, null: false
      t.references :user_2, null: false

      t.timestamps
    end

    add_foreign_key "private_chats", "users", column: "user_1_id"
    add_foreign_key "private_chats", "users", column: "user_2_id"
  end
end
