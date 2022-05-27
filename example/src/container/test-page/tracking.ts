import { DataTracking } from '@shopee-data/data-tracking';

const tracking = new DataTracking({ userId: 12306, appId: 45, sendImmediately: true });

tracking.register(true);
