exports.dateTimeFormatTH = (date) => {
  if (!date) {
    return null;
  }
  return new Date(date).toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
  });
};
