const convertDate = (date: string) => {
  const currentDate: any = new Date();

  const inputDate: any = new Date(date);

  const timeDifference = currentDate - inputDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(timeDifference / 1000 / 60);
  const hours = Math.floor(timeDifference / 1000 / 60 / 60);
  const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

  if (seconds < 60) return `${seconds} sec ago`;
  else if (minutes < 60) return `${minutes} min ago`;
  else if (hours < 24) return `${hours} hrs ago`;
  else return `${days} days ago`;
};

export default convertDate;
