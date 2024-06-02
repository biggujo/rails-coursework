# frozen_string_literal: true

require "swagger_helper"

# rubocop:disable Metrics/BlockLength
RSpec.describe "Users API", type: :request do
  path "/users" do
    get "Retrieves all users" do
      tags "Users"
      produces "application/json"

      response "200", "Users found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/User"}

        run_test!
      end
    end
  end

  path "/users/profile" do
    post "Updates a user" do
      tags "Users"
      consumes "application/json"
      produces "application/json"
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: {type: :string},
          nickname: {type: :string},
          city: {type: :string},
          country: {type: :string},
          full_name: {type: :string},
          profile_photo: {type: :string}
        },
        required: ["email"]
      }

      response "200", "User updated" do
        let(:user) {
          {email: "email@example.com", nickname: "nickname", city: "city", country: "country", full_name: "full name",
           profile_photo: "profile_photo"}
        }
        run_test!
      end

      response "422", "Invalid request" do
        let(:user) { {email: ""} }
        run_test!
      end
    end
  end

  path "/users/{id}" do
    get "Retrieves a user" do
      tags "Users"
      produces "application/json"
      parameter name: :id, in: :path, type: :integer

      response "200", "User found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/User"}

        let(:id) {
          User.create(email: "email@example.com", nickname: "nickname", city: "city", country: "country",
                      full_name: "full name", profile_photo: "profile_photo").id
        }
        run_test!
      end
    end
  end

  path "/users/{id}/posts" do
    get "Retrieves a user's posts" do
      tags "Users"
      produces "application/json"
      parameter name: :id, in: :path, type: :integer

      response "200", "Posts found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/Post"}

        let(:id) {
          User.create(email: "email@example.com", nickname: "nickname", city: "city", country: "country",
                      full_name: "full name", profile_photo: "profile_photo").id
        }
        run_test!
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
