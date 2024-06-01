require 'swagger_helper'

RSpec.describe 'Password Recovery API', type: :request do
  path '/password/reset' do
    post 'Sends password recovery instructions' do
      tags 'Password Recovery'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string }
        },
        required: ['email']
      }

      response '200', 'Instructions sent' do
        let(:user) { { email: 'user@example.com' } }
        run_test!
      end

      response '404', 'Email not found' do
        let(:user) { { email: 'nonexistent@example.com' } }
        run_test!
      end
    end
  end
end
