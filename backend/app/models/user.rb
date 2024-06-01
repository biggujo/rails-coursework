# frozen_string_literal: true

class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  include Devise::JWT::RevocationStrategies::JTIMatcher

  acts_as_voter

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_and_belongs_to_many :friends,
                          class_name: "User",
                          join_table: :friends,
                          association_foreign_key: :friend_id
  has_many :groups, dependent: :restrict_with_error

  validate :acceptable_image
  validates :nickname, presence: true, uniqueness: true
  validates :city, presence: true
  validates :country, presence: true
  validates :full_name, presence: true

  has_one_attached :profile_photo

  def mutual_friends
    User.joins("INNER JOIN friends ON users.id = friends.friend_id")
        .where(friends: {user_id: id})
        .where(users: {id: followers.ids})
  end

  def following
    User.joins("INNER JOIN friends ON users.id = friends.friend_id")
        .where(friends: {user_id: id})
  end

  def followers
    User.joins("INNER JOIN friends ON users.id = friends.user_id")
        .where(friends: {friend_id: id})
  end

  def remove_friend(friend)
    friends.delete(friend)
  end

  def acceptable_image
    return unless profile_photo.attached?

    errors.add(:profile_photo, "must weight less than 2 MB") unless profile_photo.blob.byte_size <= 2.megabyte

    acceptable_types = ["image/jpeg", "image/png", "image/webp"]
    return if acceptable_types.include?(profile_photo.content_type)

    errors.add(:profile_photo, "must be either a JPEG, PNG or WEBP")
  end
end
