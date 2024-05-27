class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_and_belongs_to_many :friends,
                          class_name: "User",
                          join_table: :friends,
                          association_foreign_key: :friend_id

  validates :nickname, presence: true, uniqueness: true

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
end
