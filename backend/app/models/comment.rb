# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates :text, presence: true
  validates :user, presence: true
  validates :post, presence: true

  acts_as_votable

  def likes_count
    get_upvotes.size
  end

  def dislikes_count
    get_downvotes.size
  end

  def self.ransackable_associations(_auth_object=nil)
    %w[post user votes_for]
  end

  def self.ransackable_attributes(_auth_object=nil)
    %w[created_at id id_value post_id text updated_at user_id]
  end
end
