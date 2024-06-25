const express = require('express');
const cors = require('cors');
const employeesRouter = require('./routes/employees');
const { sequelize } = require('./models');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', employeesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
