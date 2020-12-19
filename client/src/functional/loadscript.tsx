// functional folders conatins resusable or large functions and pages whose main purpose is to clean the cluuter from main components 
import moment from "moment";

export default function loadscript(src: any) { //loads the payment script in background
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

export const checkin = (selectedate: any) => { //checking the date if user has the option to pay 30% upfront
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


export const recieptgenerator = (req:any) =>{ //generate receipt for each payment
  console.log(req._id)
  const cd = new Date().getTime()
  console.log(cd)
  return "".concat("INV_",req.username,cd.toString()) //using username and current time
}

export const LoadRazer = async ()=>{
  const construct = await loadscript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );
  if (!construct) {
    alert("Razorpay sdk didn't load");
    return false;
  } else {
    alert("loaded");
    return true
  }
  
}

