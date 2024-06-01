interface MessageEntity {
  id: number;
  private_chat_id: number;
  author_id: number;
  message: string;
  created_at: string;
  updated_at: string;
}

export default MessageEntity;
