import { INotification } from "../app/components/navigation/header/NotificationDropdown";

const sortTime = (a: INotification, b: INotification) => {
  const currentDate: any = new Date();
  try {
    const firstCommentDate = a?.data.timestamp.toDate();
    const secondCommentDate = b?.data.timestamp.toDate();
    const firstTimeDifference = currentDate - firstCommentDate;
    const secondTimeDifference = currentDate - secondCommentDate;
    return firstTimeDifference - secondTimeDifference;
  } catch (error) {
    return 0 - 0;
  }
};

export default sortTime;
