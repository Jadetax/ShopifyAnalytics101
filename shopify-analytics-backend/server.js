const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend's origin
    credentials: true,              // Allow cookies if needed
}));

app.use(
    session({
        secret: 'your-session-secret', // Replace with your secret
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

app.get('/analytics', (req, res) => {
    const filter = req.query.filter;
    let salesData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [12000, 15000, 8000, 10000, 9000],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    if (filter === 'last7') {
        salesData.labels = salesData.labels.slice(3);
        salesData.datasets[0].data = salesData.datasets[0].data.slice(3);
    }

    res.json(salesData);
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
