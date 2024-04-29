const express = require('express');
const cors = require('cors');
const app = express();
const bookRoutes = require('./routes/bookRoutes');

app.use(cors());

app.use('/api', bookRoutes)

//Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Start the server and have it listen for incoming requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});