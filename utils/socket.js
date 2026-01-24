//socket.io connection
import { io } from "socket.io-client";
import { Capacitor } from "@capacitor/core";
const isAndroid = Capacitor.isNativePlatform();
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const socket = io(SOCKET_URL, {
  transports: isAndroid ? ["websocket"] : ["polling"],
  autoConnect: true,
});

