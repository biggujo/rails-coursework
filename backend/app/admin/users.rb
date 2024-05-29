# frozen_string_literal: true

ActiveAdmin.register User do
  permit_params :email, :nickname, :last_seen_at, :country, :city, :full_name, :admin, :profile_photo

  index do
    selectable_column
    id_column
    column :email
    column :nickname
    column :last_seen_at
    column :country
    column :city
    column :full_name
    column :admin
    column :created_at
    column :updated_at
    actions
  end

  filter :email
  filter :nickname
  filter :last_seen_at
  filter :country
  filter :city
  filter :full_name
  filter :admin
  filter :created_at
  filter :updated_at

  form do |f|
    f.inputs do
      f.input :email
      f.input :nickname
      f.input :last_seen_at
      f.input :country, :as => :string
      f.input :city
      f.input :full_name
      f.input :admin
      f.input :profile_photo, as: :file
    end
    f.actions
  end

  show do
    attributes_table do
      row :email
      row :nickname
      row :last_seen_at
      row :country
      row :city
      row :full_name
      row :admin
      row :created_at
      row :updated_at
      row :profile_photo do |user|
        if user.profile_photo.attached?
          image_tag url_for(user.profile_photo), size: "100x100"
        else
          content_tag(:span, "No photo available")
        end
      end
    end
    active_admin_comments
  end
end
