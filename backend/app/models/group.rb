# frozen_string_literal: true

class Group < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :users
  has_many :posts, dependent: :destroy

  validate :acceptable_image
  has_one_attached :profile_photo

  def acceptable_image
    return unless profile_photo.attached?

    errors.add(:profile_photo, "must weight less than 2 MB") unless profile_photo.blob.byte_size <= 2.megabyte

    acceptable_types = ["image/jpeg", "image/png", "image/webp"]
    return if acceptable_types.include?(profile_photo.content_type)

    errors.add(:profile_photo, "must be either a JPEG, PNG or WEBP")
  end
end
