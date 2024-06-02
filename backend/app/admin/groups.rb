# frozen_string_literal: true

ActiveAdmin.register Group do # rubocop:disable Metrics/BlockLength
  permit_params :name, :description, :user_id, user_ids: []

  index do
    selectable_column
    id_column
    column :name
    column :description
    column :user
    column :created_at
    column :updated_at
    actions
  end

  filter :name
  filter :description
  filter :user
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :name
      f.input :description
      f.input :user
      f.input :users, as: :check_boxes, collection: User.all
    end
    f.actions
  end

  show do
    attributes_table do
      row :name
      row :description
      row :user
      row :created_at
      row :updated_at
    end
    panel "Members" do
      table_for group.users do
        column :id
        column :email
        column :nickname
      end
    end
    active_admin_comments
  end
end
