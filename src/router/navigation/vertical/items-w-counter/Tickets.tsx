import { EmailRounded, ListAlt } from '@mui/icons-material';

import { getsAllNotifications } from '@/src/api/endpoints/support';
import { useGetCounterOnIcons } from '@/src/hooks/useGetCountersOnIcons';
import CounterIcon from '../../counter-icon/CounterIcon';

export const TicketNotification = () => {
  const { count: messageListCount } = useGetCounterOnIcons({
    key: 'notificationsCount',
    endpoint: getsAllNotifications,
  });
  const messageCategoryCount = 0;

  return <CounterIcon count={messageCategoryCount + messageListCount} Icon={EmailRounded} mr={0.5} mt={0.5} />;
};

export const MessageList = () => {
  const notificationsCount = localStorage.getItem('notificationsCount');
  return <CounterIcon count={Number(notificationsCount)} Icon={ListAlt} />;
};
