class Api {
  _baseUrl: string;

  constructor(options: { baseUrl: string; }) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  _headers() {
    return {
      'Content-Type': 'application/json',
    };
  }

  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers(),
    }).then(this._handleResponse);
  }

  postOrders(idAllIngredients: string[]) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ ingredients: idAllIngredients }),
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://norma.nomoreparties.space/api',
});
