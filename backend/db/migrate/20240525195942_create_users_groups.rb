class CreateUsersGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :groups_users, id: false do |t|
      t.references :user, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
