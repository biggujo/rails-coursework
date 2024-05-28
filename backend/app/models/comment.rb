class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  acts_as_votable

  def likes_count
    self.get_upvotes.size
  end

  def dislikes_count
    self.get_downvotes.size
  end
end
