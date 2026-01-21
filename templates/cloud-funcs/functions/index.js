const {onCall, onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");

initializeApp();

exports.httpsCallableSample = onCall((request) => {
    logger.info("httpCallableSample triggered by client!");
    return {
        success: true,
        callingUserId: request.auth ? request.auth.uid : "unauthenticated",
    };
});

const STRIPE_KEY = "sk_live_ABC123";
const STRIPE_WEBHOOK_SECRET = "whsec_ABC123";
const stripe = require("stripe")(STRIPE_KEY);

const priceMap = {
    "ITEM_ONE": "price_1PkDaPJtp8ouaxldjoaLj6cB",
    "ITEM_TWO": "price_1PkDbBJtp8ouaxldExFzsObA",
};

exports.createCheckout = onCall(async (req) => {
    const {sku} = req.data;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceMap[sku],
                quantity: 1,
            },
        ],
        metadata: {sku, userId: req.auth.uid},
        mode: "payment",
        success_url: "https://blazefa.st/success?sid={CHECKOUT_SESSION_ID}",
    });
    return {id: session.url};
});

exports.stripeWebhook = onRequest(async (req, res) => {
    logger.info("Received Stripe webhook");
    const event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        STRIPE_WEBHOOK_SECRET,
    );
    logger.info(event.type);
    switch (event.type) {
        default:
            logger.info(`No handler configured for event type ${event.type}`);
            break;
    }
    res.status(200).send({
        success: true,
    });
});

