# frozen_string_literal: true

class SearchService
  def initialize(query)
    @query = query
  end

  def call
    users = User.where("full_name ILIKE ? OR nickname ILIKE ?", "%#{@query}%", "%#{@query}%")
    groups = Group.where("name ILIKE ?", "%#{@query}%")

    serialized_users = UserSerializer.new(users).serializable_hash
    serialized_groups = GroupSerializer.new(groups).serializable_hash

    serialized_users[:data].each { |user| user[:type] = 'user' }
    serialized_groups[:data].each { |group| group[:type] = 'group' }

    serialized_users[:data] + serialized_groups[:data]
  end
end
