import { createBoard } from "@wixc3/react-board";
import { ClientScheduler } from "../../../components/Schedule/Step 1/SchedulerStep";

export default createBoard({
  name: "ClientScheduler",
  Board: () => <ClientScheduler />,
  isSnippet: true,
});
