import moment from "moment";

export const dateTimeReviver = (key: any, value: any) => {
  const isoPattern =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+\-])(\d{2}):(\d{2}))$/;
  if (typeof value === "string") {
    const a = isoPattern.exec(value);

    if (a) {
      return new Date(a[0]);
    }
  }
  return value;
};

export const dateFormatter = (date: Date): string => {
  return moment(date).format("YYYY-MM-DD");
};
