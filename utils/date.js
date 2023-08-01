function dateFormat(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}


module.exports = { dateFormat };