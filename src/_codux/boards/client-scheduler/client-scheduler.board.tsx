import { createBoard } from "@wixc3/react-board";
import { ClientScheduler } from "../../../components/Schedule/ClientScheduler";

export default createBoard({
  name: "ClientScheduler",
  Board: () => <ClientScheduler />,
  isSnippet: true,
});
