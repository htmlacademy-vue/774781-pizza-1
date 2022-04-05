import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

export class CrudApiService {
  #resource;
  constructor(resource) {
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AuthApiService {
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class BuilderApiService extends CrudApiService {
  async dough() {
    const { data } = await axios.get("dough");
    return data;
  }

  async sauces() {
    const { data } = await axios.get("sauces");
    return data;
  }

  async ingredients() {
    const { data } = await axios.get("ingredients");
    return data;
  }

  async sizes() {
    const { data } = await axios.get("sizes");
    return data;
  }
}

export class CartApiService extends CrudApiService {
  async misc() {
    const { data } = await axios.get("misc");
    return data;
  }
}
