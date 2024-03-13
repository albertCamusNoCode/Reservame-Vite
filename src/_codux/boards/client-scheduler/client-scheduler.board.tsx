import { createBoard } from '@wixc3/react-board';
import { ClientScheduler } from '../../../components/scheduler/Client.Scheduler';

export default createBoard({
    name: 'ClientScheduler',
    Board: () => <ClientScheduler />,
    isSnippet: true,
});