# frozen_string_literal: true

ActiveAdmin.register Comment do
  permit_params :user_id, :post_id, :text

  index do
    selectable_column
    id_column
    column :user
    column :post
    column :text
    column :likes_count
    column :dislikes_count
    column :created_at
    column :updated_at
    actions
  end

  filter :user
  filter :post
  filter :text
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :user
      f.input :post
      f.input :text
    end
    f.actions
  end

  show do
    attributes_table do
      row :user
      row :post
      row :text
      row :likes_count
      row :dislikes_count
      row :created_at
      row :updated_at
    end
    active_admin_comments
  end
end
