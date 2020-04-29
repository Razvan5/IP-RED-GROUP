# Hello there!
This is our `node.js` server made with `express`.
I will write some useful info here.

# How to use

 These are the steps: 
 

 1. Make sure you are in the same directory as `app.js`
 2. Go to your command line and write: 
	 > npm install
 3. Then to run the server you have to write:
	 > npm start 
 4. Good job! Now you can access the pages. Try in your browser:
     > localhost:3000/
 5. This will get you the login page.

# How does it work?
Will start by looking at the app.js file. There are many thing we don't need to know at first so let's see the //roots tag.
>//roots
>app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/accountDashboard', accountDashboardRouter);
app.use('/institutionDashboard', institutionDashboardRouter);
app.use('/contact', contactRouter);
app.use('/terms', termsRouter);

A `route` is a way for us to split our webpage resources in different folders. Let's say our page has the URL: `localhoast:3000`The logic follows like this for `app.use('/login', loginRouter)` :
>  when we acces `localhost:3000/loghin` in the server will give the responsability of responding the to resquest to the `loginRouter`  object.

Let's say our request is a simple `GET` request at /login. In order to respond to this request we have to write in the `loginRouter`  object the following: 
> router.get('/', function (req, res, next) {
res.sendFile(path.join(__dirname, '../public/pages/login.html'));
});

Remember! We are in the `/login` route. This function indicates to the app that when we get a `GET` request at the URL : `/loghin` we send a certain file.
**Another example!**
> router.post('/test', function (req, res, next) {
res.send("This is a test response");
});

This indicates to the app that when we get a `POST` request at the URL: `/login/test` we send: *"This is a test response"* 

I hope this explained how the routing works in express. 

**Next step!**
The next step in understanding how this works is understanding where these requests that we got come from. Sadly they are not black magic! 
- We have to look at the `loginRequest.js` from `public/javaScripts` folder.

In there we will have to be focused on just on the callback function of this line: 
> document.addEventListener("DOMContentLoaded", function() {
>  var form = document.getElementById("login-form");
        var xmlhttp = new XMLHttpRequest();
...

The basic idea of this function goes like this:

 1. Look for your object that has information needed for the request. In this case it is the login-form because there we insert out username and password.
 2. Add a event listener so that we can add/overwrite our own functionalities. In this case we overwrote the submit event of the form as we can see in this line
     > form.addEventListener("submit", function(e) {
             e.preventDefault();
 3. Collect the needed data in a JSON, we have the function `toJSONString(this);` it might need some tweaking in other contexts but we can reuse it for forms.
 4. Create a `xmlhttp` request! 
 > xmlhttp.open(REQUEST.METHOD , URL);
     xmlhttp.setRequestHeader(...); <-- set the headers
     xmlhttp.send(DATA); <-- send the data
 5. Wait for the response and process it
 > xmlhttp.onload = function() {
                var newData = JSON.parse(xmlhttp.responseText);
					process_data() etc 		

***Important!*** We do the same thing on the server side just with `node.js` If you understand the process here you will understand what happens in the `router.post('/', function (req, res, next) {...})` function from `loginRouter`! 

This was all I hope you will understand the things here. If you have any questions ask anyone! You can put question even in ISSUES page in GitHub so anyone can see the discusion. Good luck with the project.