# Chat flow – end-to-end

## 1. Clear chat

### Client (ChatOptionsMenu)
1. User opens menu → "Clear chat" → Confirm modal.
2. On confirm: `conversationId` required; `clearConversationLocal(conversationId)` runs (SocketContext).
3. `conversationClearedLocal` is dispatched with `{ conversation_id: cid }`.
4. `await clearConversation(conversationId)` (SocketContext) – emit `"clearConversation"` with `{ conversation_id, user_id }`, 15s timeout.
5. Success → toast; error → toast; `finally` → loading off.

### SocketContext (local + events)
- **clearConversationLocal(cid):** `messages[cid] = []`, unread[cid] = 0, clear activeConversation/typing for cid.
- **conversationCleared** / **conversationClearedLocal:** same handler: normalize `conversation_id` to string, set `messages[cid] = []`, unread, activeConversation, typing.

### Server
1. Payload check: `conversation_id`, `user_id` required; else callback error.
2. Load conversation; check user is participant.
3. `messages.update({ deleted_at: now }).eq("conversation_id", conversation_id)`.
4. Emit `conversationCleared` to room + both users; `callback({ success: true })`.

### Others
- **ChatContext:** Messages come from `socketMessages[selected.conversation_id]`; after clear that key is `[]` → UI shows no messages.
- **chats page:** Listens to socket + local; clears last_message for affected contacts, resets unread.

---

## 2. Delete chat

### Client (ChatOptionsMenu)
1. User opens menu → "Delete chat" → type "DELETE" → Confirm.
2. On confirm: `conversationId` required; `deleteConversationLocal(conversationId)` runs.
3. `conversationDeletedLocal` dispatched with `{ conversation_id: cid }`.
4. `await deleteConversation(conversationId)` – emit `"deleteConversation"`, 15s timeout.
5. Success/error toast; `finally` → loading off.

### SocketContext
- **deleteConversationLocal(cid):** Remove `messages[cid]`, update contacts (remove only this conversation from contact; remove contact only if no conversations left), unreadCounts, activeConversation.
- **conversationDeleted** / **conversationDeletedLocal:** same handler: same contact logic (update or remove), delete messages[cid], unread, activeConversation.

### ChatContext
- Listens to `conversationDeletedLocal`: if `selected.conversation_id === cid` → `setSelected(null)`.

### selected-chat page
- Listens to `conversationDeletedLocal`: if deleted conversation is current URL → `router.replace("/chats")`.

### chats page
- **handleConversationDeleted:** If selected conversation deleted → unselect, show contacts. Update contacts (remove conversation from contact; remove contact only if no conversations left). If open chat was this conversation → clear messages.

### Server
1. Payload check: `conversation_id`, `user_id` required.
2. Load conversation; check user is participant (string-normalized).
3. `conversations.update({ deleted_at: now }).eq("id", conversation_id)`.
4. `messages.update({ deleted_at: now }).eq("conversation_id", conversation_id)`.
5. Emit `conversationDeleted` to room + both users; `callback({ success: true })`.

---

## 3. Receive message (new conversation in contacts)

### Server
- On `sendMessage`: save message, emit `receiveMessage` to room + recipient sockets.

### Chats page
- **handleReceiveMessage:** Update existing contact if conversation matches; else **addNewContactFromMessage(msgg)**.
- **addNewContactFromMessage:** Fetch conversation by `msgg.conversation_id` (with `deleted_at` null), build contact, add to contacts (or merge if same user), update conversations + contactToConversationMap.
- **Refetch on visibility/pathname:** When pathname is `/chats` or tab becomes visible, refetch conversations so new chats appear.

### SocketContext
- **receiveMessage:** Add message to `messages[convId]` (convId string-normalized), update unread, notifications.

### ChatContext
- Messages derived from `socketMessages[selected.conversation_id]` (string key).

---

## 4. Selected-chat (user switch + load)

### selected-chat page
- **conversationId** from URL.
- Effect: if `conversationId` and (no selected or selected.conversation_id !== conversationId) → `loadConversation(conversationId)`; if it returns `false` (e.g. deleted) → `router.replace("/chats")`.
- If !selected → show spinner; else show ChatArea.

### ChatContext
- **loadConversation(conversationId):** Fetch conversation (with `deleted_at` null); if not found → return false. Else selectConversation(conversationId, chatPartner).
- **selectConversation:** setSelected, joinConversation, markAsRead, fetch messages (with `deleted_at` null), loadMessages(conversationId, msgs).

---

## 5. Data consistency

- **conversation_id:** Normalized to string everywhere (SocketContext keys, event details, server comparisons where added).
- **Contacts with multiple conversations:** Delete/clear update contact (remove one conversation) or remove contact only when no conversations left; same logic in SocketContext and chats page.
- **Clear then delete:** Safe: clear only touches messages; delete then sets conversation + messages deleted_at.
- **Timeouts:** clearConversation and deleteConversation have 15s client timeout so "Processing" never hangs indefinitely.
- **Server:** clearConversation and deleteConversation validate payload (conversation_id, user_id) and always call callback.
