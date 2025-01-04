const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

url = "mongodb://127.0.0.1:27017/Demo";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(error => console.error('Error connecting to MongoDB:', error));


server.use(cors());
server.use(express.json());
server.use(routes);

const PORT = process.env.PORT || 8086;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
