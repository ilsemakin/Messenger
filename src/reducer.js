export default (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        userName: action.payload.userName,
        roomId: action.payload.roomId,
      };
      
    case 'USER_STATUS':
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
