interface FunctionInterface {
  (ownId: number, otherId: number): string;
}

// This function creates proper room IDs for chats
const generateRoomName: FunctionInterface = (ownId, otherId) => {
  if (ownId > otherId) {
    return `${otherId}_${ownId}`;
  }

  return `${ownId}_${otherId}`;
};

export default generateRoomName;
