import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { createBoard } from "@wixc3/react-board";

export default createBoard({
  name: "Dropdown Menu",
  Board: () => (
    <div>
      <DropdownMenu>This is a Dropdown Menu</DropdownMenu>
    </div>
  ),
  isSnippet: true,
});
