'use strict'

const express = require('express');
const router = express.Router();
const {Shopify, ApiVersion} = require("@shopify/shopify-api");
const bcrypt = require("bcrypt")
require('dotenv').config();
const { sessionStorage } = require("sessionstorage");
const ShopifyMiddleware = require('../middlewares/shopify.middleware.js');
const {createToken} = require('../services/token.service');
const {getUser} = require('../services/shopify.service');

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST } = process.env;

Shopify.Context.initialize({
    API_KEY,
    API_SECRET_KEY,
    SCOPES: SCOPES.split(","),
    HOST_NAME: HOST.replace(/https?:\/\//, ""),
    HOST_SCHEME: HOST.split("://")[0],
    IS_EMBEDDED_APP: true,
    API_VERSION: ApiVersion.October22,
    SESSION_STORAGE: sessionStorage,
});

router.get ('/', async (req, res) => {
    res.send('Welcome to the Client Shopify api project of Jose Agraz - Joseagraz29@gmail.com');
});

router.post('/login', ShopifyMiddleware.login, async (req, res) => {
    const { private_key, user_id } = req.body;
    const user = await getUser(user_id)

    if (user) {
        const isPrivateKeyMatching = await bcrypt.compare(user.private_key, private_key)
            if (isPrivateKeyMatching){
                const token = createToken(req.body);
                return res.status(200).send({
                    status: 'success',
                    data : {
                        id: token.id,
                        token: token.token_encode,
                        expiration_date: token.expiration_date
                    }
                });
            } else {
                return res.status(200).send({
                    status: 'err',
                    message: 'private_key is incorrect'
                });
            }
    } else {
        return res.status(200).send({
            status: 'error',
            message: 'Data Not Validated'
        });
    }
});

router.get('/products', async (req, res) => {
    try {
        const response = []
        const client_session = await Shopify.Utils.loadOfflineSession(SHOP);
        const client = new Shopify.Clients.Rest(client_session.shop, client_session.accessToken);
        const products = await client.get(
            {
                path: 'products',
                fields: "id, title, description, images, created_at, updated_at",

            }
        );
        for(let i =0; i < products.body.products.length; i++) {
            response.push({
                _id : products.body.products[i].id,
                name : products.body.products[i].title,
                description : products.body.products[i].body_html.replace(/<[^>]*>?/g, ''),
                images : products.body.products[i].images[0].src,
                created_at : products.body.products[i].created_at,
                updated_at : products.body.products[i].updated_at,
            })
        }
        res.status(200).send({
            status: 'success',
            data: response
        });
    } catch (err) {
        return err

    }
});

module.exports = router;