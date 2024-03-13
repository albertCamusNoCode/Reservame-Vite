import { Button } from "@/components/ui/button";
import { createBoard } from "@wixc3/react-board";

export default createBoard({
  name: "Button",
  Board: () => (
    <div>
      <Button>Button</Button>
    </div>
  ),
  isSnippet: true,
});
