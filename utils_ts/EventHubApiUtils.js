class EventHubApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
      { data: this.loginPayload }
    );

    if (!loginResponse.ok()) {
      throw new Error("EventHub API login failed with status " + loginResponse.status());
    }

    const { token } = await loginResponse.json();
    if (!token) {
      throw new Error("EventHub API login response did not include a token");
    }

    return token;
  }

  async loginToBrowserContext(browserContext) {
    const token = await this.getToken();

    await browserContext.addInitScript(({ storageKey, value }) => {
      window.localStorage.setItem(storageKey, value);
    }, { storageKey: "eventhub_token", value: token });
  }
}

module.exports = { EventHubApiUtils };
