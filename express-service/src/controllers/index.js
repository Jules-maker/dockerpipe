module.exports = {
    getHello: (req, res) => {
        res.send('Hello from Express!');
    },
    getData: (req, res) => {
        // Example data response
        res.json({ message: 'This is some data from the Express service.' });
    }
};