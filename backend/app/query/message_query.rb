class MessageQuery
  def initialize(initial_scope)
    @initial_scope = initial_scope
  end

  def call
    scoped = @initial_scope

    sort_by_created_at(scoped)
  end

  private

  def sort_by_created_at(scoped)
    scoped.order("created_at DESC")
  end
end
