# frozen_string_literal: true

ActiveAdmin.register Message do
  permit_params :private_chat_id, :author_id, :message

  index do
    selectable_column
    id_column
    column :private_chat
    column :author
    column :message
    column :created_at
    column :updated_at
    actions
  end

  filter :private_chat
  filter :author
  filter :message
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :private_chat
      f.input :author
      f.input :message
    end
    f.actions
  end

  show do
    attributes_table do
      row :private_chat
      row :author
      row :message
      row :created_at
      row :updated_at
    end
    active_admin_comments
  end
end
