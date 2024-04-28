class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_and_belongs_to_many :co_authors, class_name: 'User'

  acts_as_votable

  validate :co_author_cannot_be_author

  def co_author_cannot_be_author
    if co_authors.include?(user)
      errors.add(:co_authors, "can't be the author of the post")
    end
  end

  def as_json(options = {})
    super(options.merge(
      methods: [:likes_count, :dislikes_count],
      include: { co_authors: { only: [:id] } }))
  end

  def likes_count
    self.get_upvotes.size
  end

  def dislikes_count
    self.get_downvotes.size
  end
end
