const getUrlFromType = (type: string | undefined, typeId: number | string | undefined) => {
  console.log("****************************************", type)
  if (type === null || type === undefined) return '/main';
  switch (type) {
    case "ALBUM":
      return `/photo/${typeId}`;
    case "SCHEDULE":
      return "/schedule";
    case "APPOINTMENT":
      return "/chatting";
    default:
      return '/main';
  }
};
export default getUrlFromType;