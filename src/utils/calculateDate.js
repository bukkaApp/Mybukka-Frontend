const calculateDate = (dateString) => {
  const dateArray = new Date(dateString).toString().split(' ');
  const year = dateArray[1];
  const day = dateArray[0];
  const date = dateArray[2];
  const time = dateArray[4];
  return { year, day, time: time?.substring(0, 5), date };
};
export default calculateDate;
