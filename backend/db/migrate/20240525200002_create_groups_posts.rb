class CreateGroupsPosts < ActiveRecord::Migration[7.1]
  def change
    create_table :groups_posts, id: false do |t|
      t.references :group, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
