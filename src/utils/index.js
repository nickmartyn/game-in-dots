function getRandomInt(min, max) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFormattedDate() {
  const dateObj = new Date();
  const monthOptions = ['January', 'February', 'March', 'April', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const time = dateObj.toLocaleTimeString([], timeOptions);
  const month = monthOptions[dateObj.getMonth()];
  return `${time}; ${dateObj.getDate()} ${month} ${dateObj.getFullYear()}`;
}

export { getRandomInt, getFormattedDate };
export default getRandomInt;
