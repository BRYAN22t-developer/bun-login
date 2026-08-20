# Login example with jwt and Google Oauth 2.0

In this project I implemented login with username and password using jwt and login with google using Oauth 2.0

> ## Technologies
> - bun
> - express
> - react 

## Setup
> ### Google Client
> 1. Go to https://console.cloud.google.com/projectcreate
> 2. Go **Clients** -> **Create client**
> 3. Select **web application**
> 4. In **Authorized origins of JavaScript** add ``` http://localhost:5000 ```
> 5. In **Authorized redirect URIs** add ``` http://localhost:5123/auth/callback/google ```
> 6. **Create**

> [!WARNING]
> Save **Client secret** because you couldn't never see it again

> ### Backend .env
> 7. Copy client id and paste in .env as ``` GOOGLE_CLIENT_ID ```
> 8. Copy client secret and paste in .env as ``` GOOGLE_CLIENT_SECRET ```
> 9. Set ``` PORT ``` as ``` 5123 ```, if you choose another one, you must edit **Authorized redirect URIs** above
> 10. Set ``` FRONTEND_URL ``` as ``` http://localhost:5000 ``` or any other

> ### Frontend .env
> 11. Set ``` PORT ``` as ``` 5000 ```, if you choose another one, you must edit **Authorized origins of JavaScript** above

> ### Instalation
> 12. You must have bun installed, if you don't, do it here: https://bun.com/docs/installation
> 13. run ``` bun install ``` in ``` /frontend ``` and ``` /backend ```

## How to run
> 1. Go to ```/backend ``` and run ``` bun dev ```
> 2. Go to ```/frontend ``` and run ``` bun dev ```
