const express = require("express");
const cors = require("cors");
const plantRouter = require('./routers/plant_routers');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', plantRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
