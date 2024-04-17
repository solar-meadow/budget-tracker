import { PurchaseService } from "../services/purchase.service.js";
import { HttpClient } from "../services/http-client.service.js";

const getMyDebts = async (req, res) => {
  const purchaseService = res.send();
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
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export { getMyDebts, createPurchase };
