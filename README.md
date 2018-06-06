# Overview
Base NodeJS rest webapi with basic routing and authentication modules.
You can use that project as template to start a new rest api and save some time.

# Using the code

 1. Close the repository from github.
 2. Restore the packages `npm install`
 3. Run the server `node server/server`
 4. At this time the server gonna be running using the port `:3000`
 5. Make a request as below to receive an access token

> POST /login HTTP/1.1 Host: localhost:3000 Content-Type: application/json 
> Cache-Control: no-cache { 	"username":"admin","password":"admin@app.com" }
> 
> Response: {
>     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9......",
>     "expires_in": 1528398397195,
>     "token_type": "bearer" 
>     }

 7. By default the template uses `admin/admin@app.com` based on that you can code your module to spoof the response.

