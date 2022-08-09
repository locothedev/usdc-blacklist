export const getEllipsisTxt = (str: string, n = 6) =>
  `${str.slice(0, n)}...${str.slice(str.length - n)}`;
