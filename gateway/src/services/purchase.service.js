export class PurchaseService {
  constructor(httpClient, purchaseServiceUrl) {
    this.httpClient = httpClient;
    this.purchaseServiceUrl = purchaseServiceUrl;
  }

  create(payload) {
    return this.httpClient.post(this.purchaseServiceUrl, payload);
  }
}
