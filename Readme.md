## Documentaation

for setup `npm i` in root and client folder<br/>
run &nbsp; `npm run dev` &nbsp; in terminal


How a user is connecting to the server and databse

![Alt text](https://github.com/moonstoper/files/blob/master/Untitled%20Diagram.png)
<<<<<<< HEAD

Whenever a user make a request from a page,the request is dispatched to  actions page containing functions on how to handle to data.
It then make a call to either backend server or any other api on distant server.After getting the response it dispatches the reponse to a 
reducer which updates a particular variable where the specific data has to be stored.The client page can now get access to the variable when ever an wherever and also other pages.

For logging passport module has been used as it provides easy authentication method and de-authentication method. 

- Upi Payment is done with giving user chance to pay 30% upfront if checkin date is after 7 days.
- Remaning/Pending amount is also handled , user can pay the remaning and database is also updated accordingly.
- NO hotel table was made therefore room date is not locked.
- Login is setup  /  Register method is also done .
- Simple service-worker has been set.
=======
- Upi Payment is done with giving user chance to pay 30% upfront if checkin date is after 7 days
- Remaning/Pending amount is also handled ,user can pay the remaning and database is also updated accordingly,.
- NO hotel table was made therefore product date of use is not locked.
- Login is setup  /  Register method is also done but commited as it was only for testing.
- Service worker setup but not registering, might be some issue with express.js currently looking
>>>>>>> 78cb5d95cc6d0499c92ada3507a4812610ebfa69
