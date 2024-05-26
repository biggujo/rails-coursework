class SetMaxLengthOfMessage < ActiveRecord::Migration[7.1]
  def change
    change_column :messages, :message, :string, limit: 500
  end
end
