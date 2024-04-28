class User < ApplicationRecord
  has_many :posts
  has_many :comments
  has_and_belongs_to_many :co_authored_posts, class_name: 'Post'

  include Devise::JWT::RevocationStrategies::JTIMatcher

  acts_as_voter

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  validates :nickname, presence: true, uniqueness: true
end
