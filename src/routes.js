const { HttpError } = require('./lib/http');
const { parseProduct } = require('./validate');

module.exports = (router, store) => {
  const find = ({ params }) => {
    const product = store.get(Number(params.id));
    if (!product) throw new HttpError(404, 'product not found');
    return product;
  };

  const version = process.env.APP_VERSION || 'dev';   // git SHA baked into the image (same as the image tag)
  router.get('/health', ({ send }) => send(200, { status: 'ok', service: 'product-service', version }));
  router.get('/version', ({ send }) => send(200, { service: 'product-service', version }));
  router.get('/products', ({ send }) => send(200, store.list()));
  router.post('/products', async ({ json, send }) => send(201, store.create(parseProduct(await json()))));
  router.get('/products/:id', ctx => ctx.send(200, find(ctx)));
  router.put('/products/:id', async ctx => { find(ctx); ctx.send(200, store.update(Number(ctx.params.id), parseProduct(await ctx.json()))); });
  router.delete('/products/:id', ctx => { find(ctx); ctx.send(200, store.remove(Number(ctx.params.id))); });
};
