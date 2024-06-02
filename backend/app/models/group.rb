# frozen_string_literal: true

class Group < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :users
  has_many :posts, dependent: :destroy
  has_one_attached :profile_photo

  validate :acceptable_image
  validates :name, presence: true
  validates :user, presence: true
  validates :description, presence: true

  def self.joined_groups(user_id)
    Group.joins("INNER JOIN groups_users ON groups.id = groups_users.group_id")
         .where(groups_users: {user_id:})
  end

  def acceptable_image
    return unless profile_photo.attached?

    errors.add(:profile_photo, "must weight less than 2 MB") unless profile_photo.blob.byte_size <= 2.megabyte

    acceptable_types = ["image/jpeg", "image/png", "image/webp"]
    return if acceptable_types.include?(profile_photo.content_type)

    errors.add(:profile_photo, "must be either a JPEG, PNG or WEBP")
  end

  def self.ransackable_attributes(_auth_object=nil)
    %w[created_at description id id_value name updated_at user_id]
  end

  def self.ransackable_associations(_auth_object=nil)
    %w[posts user users]
  end
end
