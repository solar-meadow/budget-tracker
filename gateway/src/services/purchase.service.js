export class PurchaseService {
  constructor(httpClient, purchaseServiceURL) {
    this.httpClient = httpClient;
    this.purchaseServiceURL = purchaseServiceURL;
  }

  get(userId) {
    return this.httpClient.get(this.purchaseServiceURL.toString(), userId);
  }

  create(payload) {
    return this.httpClient.post(this.purchaseServiceURL.toString(), payload);
  }
}
