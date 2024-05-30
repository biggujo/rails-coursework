# frozen_string_literal: true

class Group < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :users
  has_many :posts, dependent: :destroy
end
