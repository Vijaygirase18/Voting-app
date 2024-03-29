const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const db = require('./connection/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userController = require('./controller/user');
const candidateController = require('./controller/candidate');

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT"],
    credentials: true
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.put('/update-is-voted', userController.UpdateIsVoted);

app.post('/register',userController.validateRegister, userController.Register);
app.post('/login',userController.validateLogin ,userController.Login);
app.get('/candidates', candidateController.getCandidates);
app.post('/candidates/vote', candidateController.voteCandidate);
app.post('/candidates/add', candidateController.addCandidates); 
app.get('/user',userController.users);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
