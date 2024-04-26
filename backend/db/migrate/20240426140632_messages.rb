class Messages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.references :private_chat, null: false
      t.references :author, null: false
      t.string :message, null: false

      t.timestamps
    end

    add_foreign_key "messages", "private_chats", column: "private_chat_id"
    add_foreign_key "messages", "users", column: "author_id"
  end
end
