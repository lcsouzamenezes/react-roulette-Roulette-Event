// 배경색에 따른 Font 컬러 변경
const getTextColorByBackgroundColor = (hexColor: string): string => {
  const c = hexColor.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 127.5 ? '#fff' : '#000';
};

export default getTextColorByBackgroundColor;
