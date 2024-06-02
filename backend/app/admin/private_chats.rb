# frozen_string_literal: true

ActiveAdmin.register PrivateChat do # rubocop:disable Metrics/BlockLength
  permit_params :user_1_id, :user_2_id

  index do
    selectable_column
    id_column
    column :user_1
    column :user_2
    column :created_at
    column :updated_at
    actions
  end

  filter :user_1
  filter :user_2
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :user_1
      f.input :user_2
    end
    f.actions
  end

  show do
    attributes_table do
      row :user_1
      row :user_2
      row :created_at
      row :updated_at
      row :messages
    end
    active_admin_comments
  end
end
