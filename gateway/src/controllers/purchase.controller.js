import { PurchaseService } from "../services/purchase.service.js";
import { HttpClient } from "../services/http-client.service.js";

const getMyDebts = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    res.status(400);
    return;
  }
  const url = new URL(process.env.PURCHASES_SERVICE);
  url.searchParams.set(req.query.userId);
  const httpClient = new HttpClient();
  const purchaseService = new PurchaseService(httpClient, url);

  try {
    const result = await purchaseService.get(payload);
    res.send(result);
  } catch (error) {
    console.error("Purchases service error:\n" + error);
    res.status(500).send("Internal Server Error");
  }
};

const createPurchase = async (req, res) => {
  const httpClient = new HttpClient();
  const purchaseService = new PurchaseService(
    httpClient,
    `${process.env.PURCHASES_SERVICE}/create`
  );

  try {
    const payload = req.body;
    const result = await purchaseService.create(payload);
    res.send(result);
  } catch (error) {
    console.error("Purchases service error:\n" + error);
    res.status(500).send("Internal Server Error");
  }
};

export { getMyDebts, createPurchase };
