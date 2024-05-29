# frozen_string_literal: true

class ChangePostsGroupsRelation < ActiveRecord::Migration[7.1]
  def change
    drop_table :groups_posts do |t|
      t.bigint :group_id, null: false
      t.bigint :post_id, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.index ["group_id"], name: "index_groups_posts_on_group_id"
      t.index ["post_id"], name: "index_groups_posts_on_post_id"
    end

    change_table :posts do |t|
      t.references :group, foreign_key: true, null: true
    end
  end
end
