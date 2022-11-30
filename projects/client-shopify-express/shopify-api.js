const express = require('express');
const app = express();
const http = require('http');
const Shopify = require('@shopify/shopify-api').Shopify;
const ApiVersion = require('@shopify/shopify-api').ApiVersion;
require('dotenv').config();

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST, HOST_SCHEME } = process.env;

Shopify.Context.initialize({
    API_KEY,
    API_SECRET_KEY,
    SCOPES: [SCOPES],
    HOST_NAME: HOST.replace(/https?:\/\//, ""),
    HOST_SCHEME,
    IS_EMBEDDED_APP: false,
    API_VERSION: ApiVersion.July22
});

const ACTIVE_SHOPIFY_SHOPS = {};

app.get('/', async (http_request, http_response) => {
    if(ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
        http_response.redirect('/auth/shopify');
    } else {
        http_response.send('<html><body><p>Your Node instance is running.</p></body></html>');
    }
});

app.get('/auth/shopify', async (http_request, http_response) => {
    let authorizedRoute = await Shopify.Auth.beginAuth(
        http_request,
        http_response,
        SHOP,
        '/api/auth/shopify/callback',
        false,
    );
    return http_response.redirect(authorizedRoute);
});

app.get('/auth/shopify/callback', async (http_request, http_response) => {
    console.log(2)
    try {
        const client_session = await Shopify.Auth.validateAuthCallback(
            http_request,
            http_response,
            http_request.query);
        ACTIVE_SHOPIFY_SHOPS[SHOP] = client_session.scope;
        console.log(client_session.accessToken);
    } catch (eek) {
        console.error(eek);
        http_response.send('<html><body><p>${JSON.stringify(eek)}</p></body></html>')
    }
    return http_response.redirect('/auth/shopify/success');
});

app.get('/auth/shopify/success', async  (http_request, http_response) => {
    http_response.send('<html><body><p>You have successfully authenticated and are back at your app.</p></body></html>');
});

app.get('/products', async (http_request, http_response) => {
    const client_session = await Shopify.Utils.loadCurrentSession(http_request, http_response);
    console.log('client_session: ' + JSON.stringify(client_session));

    const client = new Shopify.Clients.Rest(client_session.shop, client_session.accessToken);

    const products = await client.get({
        path: 'products'
    });
    console.log('Products: ' + JSON.stringify(products));

    let product_names_formatted = '';
    for(let i =0; i < products.body.products.length; i++) {
        product_names_formatted += '<p>' + products.body.products[i].title + '</p>';
    }

    http_response.send(`<html><body><p>Products List</p>
          ${product_names_formatted}
          </body></html>`);

});

const httpServer = http.createServer(app);

httpServer.listen(3000, () => console.log('Your Slack-OAuth app is listening on port 3000.'));