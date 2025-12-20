export const EVENTS = {
  CONNECTION: "connection",          // When a client connects to the server
  DISCONNECT: "disconnect",          // When a client disconnects

  JOIN_CHAT: "join_chat",            // User joins a specific chat room
  LEAVE_CHAT: "leave_chat",          // User leaves a chat room

  SEND_MESSAGE: "send_message",      // Client → Server (send message)
  RECEIVE_MESSAGE: "receive_message",// Server → Client (broadcast new message)

  TYPING: "typing",                  // User starts typing
  STOP_TYPING: "stop_typing",        // User stops typing

  NEW_CHAT_CREATED: "new_chat_created", // When a new chat room or conversation is created

  ERROR: "error",                    // For server-side or client-side errors
};
