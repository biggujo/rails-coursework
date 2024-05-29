class Messages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.references :private_chat, null: false
      t.references :author, null: false
      t.string :message, null: false

      t.foreign_key "private_chats", column: "private_chat_id"
      t.foreign_key "users", column: "author_id"

      t.timestamps
    end
  end
end
