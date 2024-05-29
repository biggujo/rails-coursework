# frozen_string_literal: true

ActiveAdmin.register Post do
  permit_params :content, :user_id, :group_id, :reposted_post_id

  index do
    selectable_column
    id_column
    column :content
    column :user
    column :group
    column :repost
    column :likes_count
    column :dislikes_count
    column :created_at
    column :updated_at
    actions
  end

  filter :content
  filter :user
  filter :group
  filter :repost
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :content
      f.input :user
      f.input :group
      f.input :repost
    end
    f.actions
  end

  show do
    attributes_table do
      row :content
      row :user
      row :group
      row :comments
      row :repost
      row :likes_count
      row :dislikes_count
      row :created_at
      row :updated_at
    end
    active_admin_comments
  end
end

