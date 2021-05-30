class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _headers() {
    return {
      "Content-Type": "application/json",
    };
  }

  getIngredients() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers(),
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api/ingredients",
});
