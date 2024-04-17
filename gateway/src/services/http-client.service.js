export class HttpClient {
  constructor() {}

  async get(url) {
    return fetch(url, { method: "GET" });
  }

  post(url, payload) {
    console.log(payload);

    return fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}
