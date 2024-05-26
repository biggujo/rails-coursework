class User < ApplicationRecord
  has_many :posts
  has_many :comments
  has_many :reposts

  include Devise::JWT::RevocationStrategies::JTIMatcher

  acts_as_voter

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  validates :nickname, presence: true, uniqueness: true
end
