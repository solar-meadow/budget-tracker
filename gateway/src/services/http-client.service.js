export class HttpClient {
  constructor() {}

  async get(url) {
    return fetch(url, { method: "GET" });
  }

  post(url, payload) {
    return fetch(url, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}
