function formatDate(timestamp) {
  let month = String(timestamp.getMonth() + 1);
  let day = String(timestamp.getDate());
  const year = String(timestamp.getFullYear());
  const hour = String(timestamp.getHours());
  let minute = String(timestamp.getMinutes());

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (minute.length < 2) minute = `0${minute}`;

  const date = `${day}/${month}/${year}`;
  const time = `${hour}:${minute}`;

  return { date, time };
}

export default {
  formatDate,
};
