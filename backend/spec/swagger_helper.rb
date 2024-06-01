# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    'v1/swagger.yaml' => {
      openapi: '3.0.1',
      info: {
        title: 'API V1',
        version: 'v1'
      },
      paths: {},
      components: {
        schemas: {
          Group: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              description: { type: :string },
              user: { type: :object, '$ref': '#/components/schemas/User' },
              created_at: { type: :string, format: :date_time },
              updated_at: { type: :string, format: :date_time }
            },
            required: %w[id name description user_id created_at updated_at]
          },
          Message: {
            type: :object,
            properties: {
              id: { type: :integer },
              private_chat_id: { type: :integer },
              author_id: { type: :integer },
              message: { type: :string },
              created_at: { type: :string, format: :date_time },
              updated_at: { type: :string, format: :date_time }
            },
            required: %w[id private_chat_id author_id message created_at updated_at]
          },
          Comment: {
            type: :object,
            properties: {
              id: { type: :integer },
              text: { type: :string },
              created_at: { type: :string, format: :date_time },
              updated_at: { type: :string, format: :date_time },
              post_id: { type: :integer },
              likes_count: { type: :integer },
              dislikes_count: { type: :integer },
              user: { type: :object, '$ref': '#/components/schemas/User' },
              liked: {type: :boolean},
              disliked: {type: :boolean},
            },
            required: %w[id text created_at updated_at post_id likes_count dislikes_count user liked disliked]
          },
          User: {
            type: :object,
            properties: {
              id: { type: :integer },
              email: { type: :string },
              city: { type: :string },
              country: { type: :string },
              full_name: { type: :string },
              nickname: { type: :string },
              last_seen_at: { type: :string, format: :date_time },
              created_at: { type: :string, format: :date_time },
              updated_at: { type: :string, format: :date_time },
              profile_photo: { type: :string, nullable: true }
            },
            required: %w[id email city country full_name nickname last_seen_at created_at updated_at]
          },
          Post: {
            type: :object,
            properties: {
              id: { type: :integer },
              content: { type: :string },
              created_at: { type: :string, format: :date_time },
              updated_at: { type: :string, format: :date_time },
              likes_count: { type: :integer },
              dislikes_count: { type: :integer },
              user: { type: :object, '$ref': '#/components/schemas/User' },
              group: { type: :object, '$ref': '#/components/schemas/Group' },
              repost: { type: :object, '$ref': '#/components/schemas/Post', nullable: true },
              liked: { type: :boolean },
              disliked: { type: :boolean }
            },
            required: %w[id content created_at updated_at likes_count dislikes_count user group liked disliked]
          },
          PrivateChat: {
            type: :object,
            properties: {
              id: { type: :integer },
              user_1: { type: :object, '$ref': '#/components/schemas/User' },
              user_2: { type: :object, '$ref': '#/components/schemas/User' },
              created_at: { type: :string, format: :date_time },
              updated_at: { type: :string, format: :date_time }
            },
            required: %w[id user_1 user_2 created_at updated_at]
          }
        }
      },
      servers: [
        {
          url: 'https://{defaultHost}',
          variables: {
            defaultHost: {
              default: 'www.example.com'
            }
          }
        }
      ]
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :yaml
end
