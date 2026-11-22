const PORT = process.env.PORT || 3002;
require('./src/app').listen(PORT, () => console.log(`product-service on ${PORT}`));
