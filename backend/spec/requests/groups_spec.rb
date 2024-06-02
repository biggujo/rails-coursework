# frozen_string_literal: true

require "swagger_helper"

# rubocop:disable Metrics/BlockLength
RSpec.describe "Groups API", type: :request do
  path "/groups" do
    get "Retrieves all groups" do
      tags "Groups"
      produces "application/json"

      response "200", "Groups found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Group"}

        run_test!
      end
    end

    post "Creates a group" do
      tags "Groups"
      consumes "application/json"
      produces "application/json"
      parameter name: :group, in: :body, schema: {
        type: :object,
        properties: {
          name: {type: :string},
          description: {type: :string}
        },
        required: %w[name description]
      }

      response "200", "Group created" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Group"}
        run_test!
      end

      response "422", "Invalid request" do
        let(:group) { {name: "", description: ""} }
        run_test!
      end
    end
  end

  path "/groups/{id}" do
    get "Retrieves a group" do
      tags "Groups"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Group ID"

      response "200", "Group found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Group"}
        run_test!
      end

      response "404", "Group not found" do
        let(:id) { "invalid" }
        run_test!
      end
    end

    patch "Updates a group" do
      tags "Groups"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Group ID"
      parameter name: :group, in: :body, schema: {
        type: :object,
        properties: {
          name: {type: :string},
          description: {type: :string}
        },
        required: %w[name description]
      }

      response "200", "Group updated" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Group"}
        run_test!
      end

      response "422", "Invalid request" do
        let(:id) { create(:group).id }
        let(:group) { {name: "", description: ""} }
        run_test!
      end
    end

    delete "Deletes a group" do
      tags "Groups"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Group ID"

      response "200", "Group deleted" do
        let(:id) { create(:group).id }
        run_test!
      end

      response "404", "Group not found" do
        let(:id) { "invalid" }
        run_test!
      end
    end
  end

  path "/groups/{id}/members" do
    post "Adds a member to the group" do
      tags "Groups"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Group ID"
      parameter name: :user_id, in: :query, type: :string, description: "User ID"

      response "200", "Member added" do
        schema type: :array, items: {"$ref" => "#/components/schemas/User"}
        let(:id) { create(:group).id }
        let(:user_id) { create(:user).id }
        run_test!
      end

      response "422", "User is already a member of this group" do
        let(:group) { create(:group) }
        let(:id) { group.id }
        let(:user) { create(:user) }
        before { group.users << user }
        let(:user_id) { user.id }
        run_test!
      end

      response "404", "Group or User not found" do
        let(:id) { "invalid" }
        let(:user_id) { "invalid" }
        run_test!
      end
    end

    get "Lists members of the group" do
      tags "Groups"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Group ID"

      response "200", "Members found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/User"}
        let(:id) { create(:group).id }
        run_test!
      end

      response "404", "Group not found" do
        let(:id) { "invalid" }
        run_test!
      end
    end
  end

  path "/groups/{id}/members/{user_id}" do
    delete "Removes a member from the group" do
      tags "Groups"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Group ID"
      parameter name: :user_id, in: :path, type: :string, description: "User ID"

      response "200", "Member removed" do
        let(:group) { create(:group) }
        let(:id) { group.id }
        let(:user) { create(:user) }
        before { group.users << user }
        let(:user_id) { user.id }
        run_test!
      end

      response "422", "User is not a member of this group" do
        let(:group) { create(:group) }
        let(:id) { group.id }
        let(:user_id) { create(:user).id }
        run_test!
      end

      response "404", "Group or User not found" do
        let(:id) { "invalid" }
        let(:user_id) { "invalid" }
        run_test!
      end
    end
  end

  path "/groups/{id}/posts" do
    get "Lists posts of the group" do
      tags "Groups"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Group ID"

      response "200", "Posts found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Post"}
        let(:id) { create(:group).id }
        run_test!
      end

      response "404", "Group not found" do
        let(:id) { "invalid" }
        run_test!
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
