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

  postOrders(idAllIngredients: string[], token) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: idAllIngredients }),
    }).then(this._handleResponse);
  }

  getOrdersAll() {
    return fetch(`${this._baseUrl}/orders/all`, {
      headers: this._headers(),
    }).then(this._handleResponse);
  }

  postForgotPassword(email: string) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ email }),
    }).then(this._handleResponse);
  }

  postRegister(name, email, password) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
      if (res.status >= 500) {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
      return res.json();
    });
  }

  postLogin(email, password) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.status >= 500) {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
      return res.json();
    });
  }

  postResetPassword(password, token) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ password, token }),
    }).then((res) => {
      if (res.status >= 500) {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
      return res.json();
    });
  }

  postRefreshToken(refreshToken) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ token: refreshToken }),
    }).then((res) => {
      if (res.status >= 500) {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
      return res.json();
    });
  }

  postLogout(refreshToken) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({ token: refreshToken }),
    }).then((res) => {
      if (res.status >= 500) {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
      return res.json();
    });
  }

  getUser(token) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status >= 500) {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
      return res.json();
    });
  }

  pathUser(token, name, email, password) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
      if (res.status >= 500) {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
      return res.json();
    });
  }
}

export const api = new Api({
  baseUrl: 'https://norma.nomoreparties.space/api',
});
