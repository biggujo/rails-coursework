class Post < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :groups
  has_many :comments
  has_many :reposts

  acts_as_votable

  def likes_count
    self.get_upvotes.size
  end

  def dislikes_count
    self.get_downvotes.size
  end
end
