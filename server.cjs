const express = require('express');
const fs = require('fs');
const path = require('path');

const createServer = async () => {
  const app = express();
  const template = fs.readFileSync(
    path.resolve(__dirname, 'index.html'),
    'utf-8'
  );
  const vite = await require('vite').createServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.get('*', async (req, res) => {
    const url = req.originalUrl;
    try {
      const templateResult = await vite.transformIndexHtml(url, template);
      const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render;
      const html = await render(url);
      const finalHtml = templateResult.replace('<!--ssr-outlet-->', html);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e) {
      console.log(e);
    }
  });

  app.listen(28192, () => {
    console.log('Server is running at http://localhost:28192');
  });
};

createServer();
