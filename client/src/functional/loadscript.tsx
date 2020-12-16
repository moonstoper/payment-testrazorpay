import moment from "moment";
export default function loadscript(src: any) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const checkin = (selectedate: any) => {
  const currentdate = moment().format("YYYY-MM-DD");
  const sdate = moment(selectedate);
  const diffdate = sdate.diff(currentdate, "days");
  console.log(diffdate);
  if (diffdate > 7) {
    return true;
  } else {
    return false;
  }
};
