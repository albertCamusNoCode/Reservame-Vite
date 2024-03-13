import { createBoard } from '@wixc3/react-board';
import TimeGrid from '../../../components/TimeGrid/TimeGrid';

export default createBoard({
    name: 'TimeGrid',
    Board: () => <TimeGrid />,
    isSnippet: true,
});