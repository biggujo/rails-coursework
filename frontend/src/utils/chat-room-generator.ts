interface FunctionInterface {
  (ownId: string, otherId: string): string;
}

const generateRoomName: FunctionInterface = (ownId, otherId) =>
  `${ownId}_${otherId}`;

export default generateRoomName;
