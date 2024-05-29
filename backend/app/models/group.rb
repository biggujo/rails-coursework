class Group < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :users
  has_many :posts

  def self.ransackable_attributes(auth_object = nil)
    %w[created_at description id id_value name updated_at user_id]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[posts user users]
  end
end
