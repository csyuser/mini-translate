
function formatTime(string){
  const now = dayjs();
  if (dayjs(string).isSame(now, 'day')) {
    return '今天';
  } else if (dayjs(string).isSame(now.valueOf() - 86400 * 1000, 'day')) {
    return '昨天';
  } else if (dayjs(string).isSame(now.subtract(2, 'day'), 'day')) {
    return '前天';
  } else if (dayjs(string).isSame(now, 'year')) {
    return dayjs(string).format('M月D日');
  } else {
    return dayjs(string).format('YYYY年M月D日');
  }
}


module.exports = {
  formatTime: formatTime
}
