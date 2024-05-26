# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can :manage, Post do |post|
      post.user == user
    end
    can :manage, Comment, user: user
    can :manage, Repost, user: user
    can :manage, Group, user: user
  end
end
