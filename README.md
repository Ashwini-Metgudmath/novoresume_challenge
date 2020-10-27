# Novorésumé Challenge

Should you accept the challenge, we want you to complete 4 tasks based on the provided mock-ups. You can find the mock-ups in the **mockups** folder, and the image assets in **frontend/public/images**. In the project, you have some functionalities already implemented such as register, save products, save billing info. To reach the logged in page though, you need to achieve your second task. You can explore what functionalities you have under backend/operations. The project doesn't have any unit tests implemented, but we want to see your approach to [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) while developing (task 1).

### Your tasks:

1. Write the unit test for the login function you will write in the second task. You are free to use your favorite testing libraries.

2. Implement login functionality via [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken) by filling the ***login()*** function in [users.js](backend/operations/users.js). Frontend for this functionality is already provided. Hint: make use of [middleware.js](backend/middleware.js).

3. Implement the functionality to generate the HTML for the PDF of the offer in front-end by making use of the generatePdf() function in [calls.js](frontend/src/calls/calls.js) and generateOffer() function in [offers.jsx](frontend/src/pages/offers/offers.jsx). Basically, we want a user to be able to generate a PDF of their offer, when they click Download PDF button in UI. The backend for it is already implemented using the library called [wkhtmltopdf](https://www.npmjs.com/package/wkhtmltopdf) and ready to accept requests on /users/:id/offer endpoint in [users.js](backend/routes/users.js). (In the PDF mock-up you will see the images of the products. Adding the images to the PDF is a bit more complicated hence not required, but a bonus)

4. Implement the landing page with React by filling [home.jsx](frontend/src/pages/home/home.jsx) in according to the landing page mock-up. The project is styled using SASS, but you can use plain CSS, or something of your choice for styling. Making the page responsive is not required, but a bonus.

### Notes:
- Your code should be clean and follow the best practices
- Your implementations and changes should be documented in the README file
- The app should be running and functioning properly on Docker (it is already, so you should not need to do anything about this)
- You should do the assignment by yourself

### The stack you need to have installed on your machine:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [Docker](https://docs.docker.com/get-docker/)

### How to run the app:

#### *To run the app locally without Docker:*

In [backend/database/mongodb.js](backend/database/mongodb.js), comment the line for *Uri for the Docker setup*, and uncomment the line for *Uri for the localhost setup*.

In the backend folder, run:
```
nodemon app.js
```

In the frontend folder, run:
```
npm start
```

The app now should be running on https://localhost:3000. 

#### *To run the app with Docker:*

Make sure you are using the *Uri for Docker setup* in [backend/database/mongodb.js](backend/database/mongodb.js).

In the project folder, run:
```
docker-compose build
```

Then, again in the project folder, run:
```
docker-compose up
```

For other useful Docker commands, see [this](https://docs.docker.com/engine/reference/commandline/docker/).

The app now should be running on https://localhost:3000.

#### Don't miss the hints spread throughout the code! Good luck, and may the force be with you!



# Solution overview 

### Task 1: pending

### Task 2: Login function implemented using JSON Web Tokens ('jsonwebtoken')
* Passowrd validation is done in ***login()*** by using ***bcrypt.compare()***
* Generating token done in ***generateAccessToken()*** by using ***jwt.sign()***
* Authenticating token done in ***authenticateToken()*** by using ***jwt.verify()***


### Task 3: Generating html and creating pdf of html page done using html-pdf (**Bonus: adding images to the pdf is implemented**) 
* Implemented solution by taking a defferent apporch, used html-pdf instead of wkhtmltopdf.           
* html template is created and stored in backend folder in a file called pdfTemplate.js.         
* Only user-info object is passed from frontend to the api instead of complete html file and user-info embedded in html dynamically.    
* ***pdf.create()***  will generate pdf by taking html as input and store it in a folder called documents at the backend.
* I have created new endpoint called ***fetch-pdf/*** which will return pdf to frontend.
* At frontend ***saveAs()*** from file-saver downloads the file.
* **Bonus: Adding images to the pdf functionality implemented**

### Task 4: Implemented the landing page (**Bonus: Making the page responsive is done**)
* Implemented the landing page with React by filling home.jsx according to the landing page mock-up. 
* **Bonus: Making page responsive is done using media queries.**

            

