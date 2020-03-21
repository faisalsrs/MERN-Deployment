const express = require("express");
const cors = require("cors");
const port = 8000;
const db_name = "pet";

require("./config/mongoose.config")(db_name);

const app = express();
app.use(cors());

//req.body will be undefined without this
app.use(express.json());

// long-form
//const exportedRoutesFunc = require("./routes/pet.routes");
// exportedRoutesFunc(app);

require("./routes/pet.routes")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
