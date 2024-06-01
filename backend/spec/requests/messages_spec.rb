require 'swagger_helper'

RSpec.describe 'Messages API', type: :request do

  path '/private_chats/{private_chat_id}/messages' do
    parameter name: 'private_chat_id', in: :path, type: :string, description: 'private_chat_id'

    get('list messages') do
      tags 'Messages'
      produces 'application/json'

      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/Message' }
        run_test!
      end
    end

    post('create message') do
      tags 'Messages'
      consumes 'application/json'
      produces 'application/json'

      response(200, 'successful') do
        schema type: :array, items: { '$ref' => '#/components/schemas/Message' }
        run_test!
      end
    end
  end
end
