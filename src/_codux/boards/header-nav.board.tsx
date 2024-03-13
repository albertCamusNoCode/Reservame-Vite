import { createBoard } from "@wixc3/react-board";
import SideNav from "../../components/SideNav/SideNav";

export default createBoard({
  name: "SideNav",
  Board: () => (
    <div>
      <SideNav />
    </div>
  ),
  isSnippet: true,
});
