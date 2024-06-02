# frozen_string_literal: true

require "swagger_helper"

# rubocop:disable Metrics/BlockLength
RSpec.describe "PrivateChats API", type: :request do
  path "/private_chats" do
    get "Retrieves all private chats" do
      tags "PrivateChats"
      produces "application/json"

      response "200", "Private chats found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/PrivateChat"}

        run_test!
      end
    end

    post "Creates a private chat" do
      tags "PrivateChats"
      consumes "application/json"
      produces "application/json"
      parameter name: :private_chat, in: :body, schema: {
        type: :object,
        properties: {
          user_1_id: {type: :integer},
          user_2_id: {type: :integer}
        },
        required: %w[user_1 user_2]
      }

      response "201", "Private chat created" do
        schema type: :array, items: {"$ref" => "#/components/schemas/PrivateChat"}
        run_test!
      end

      response "400", "Bad request" do
        let(:private_chat) { {user_1: 1} }
        run_test!
      end
    end
  end

  path "/private_chats/{id}" do
    get "Retrieves a private chat" do
      tags "PrivateChats"
      produces "application/json"
      parameter name: :id, in: :path, type: :integer

      response "200", "Private chat found" do
        schema type: :array, items: {"$ref" => "#/components/schemas/PrivateChat"}

        let(:id) { PrivateChat.create(user_1_id: 1, user_2_id: 2).id }
        run_test!
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
