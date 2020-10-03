import io from "socket.io-client";
import { memoize } from "lodash";
export const socket = memoize(() => io("http://localhost:3000"));
