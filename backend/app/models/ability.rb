# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can :manage, Post, user: user
    can :manage, Comment, user: user
    can :manage, Group, user: user
  end
end
