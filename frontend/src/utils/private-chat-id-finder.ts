import { ChatEntity } from '../interfaces';

const findPrivateChatId = ({
  chats,
  givenUser1Id,
  givenUser2Id,
}: {
  chats: Array<ChatEntity>;
  givenUser1Id: number;
  givenUser2Id: number;
}): number | null => {
  if (!chats || chats.length === 0) {
    return null;
  }

  const index = chats.findIndex(
    ({ user_1: { id: user1Id }, user_2: { id: user2Id } }) =>
      (user1Id === givenUser1Id && user2Id === givenUser2Id) ||
      (user1Id === givenUser2Id && user2Id === givenUser1Id)
  );

  if (index === -1) {
    return null;
  }

  return chats[index].id;
};

export default findPrivateChatId;
