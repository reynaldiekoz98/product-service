const { HttpError } = require('./lib/http');

function parseProduct(input) {
  if (!input.name || typeof input.name !== 'string' || typeof input.price !== 'number' || !(input.price >= 0)) {
    throw new HttpError(400, 'name and numeric price are required');
  }
  return { name: input.name.trim(), price: input.price };
}
module.exports = { parseProduct };
