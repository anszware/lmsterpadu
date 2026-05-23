import { e as useRuntimeConfig } from './server.mjs';
import { u as useCookie } from './cookie-D7ajVlMO.mjs';

const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie("access_token");
  const baseURL = config.public.apiBase;
  const getDefaultHeaders = () => {
    const headers = {
      "Accept": "application/json"
    };
    if (token.value) {
      headers["Authorization"] = `Bearer ${token.value}`;
    }
    return headers;
  };
  const fetchapi = async (url, options = {}) => {
    const headers = {
      ...getDefaultHeaders(),
      ...options.headers
    };
    if (options.body instanceof FormData) {
      if (headers["Content-Type"]) {
        delete headers["Content-Type"];
      }
    } else if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
    try {
      return await $fetch(url, {
        baseURL,
        headers,
        ...options
      });
    } catch (error) {
      if (error.status === 401) {
        console.error("Unauthenticated error detected. Token value:", token.value ? "Exists" : "Empty");
      }
      throw error;
    }
  };
  async function get(url, params = {}) {
    return await fetchapi(url, { method: "GET", params });
  }
  async function post(url, body = {}) {
    return await fetchapi(url, { method: "POST", body });
  }
  async function put(url, body = {}) {
    return await fetchapi(url, { method: "PUT", body });
  }
  async function del(url) {
    return await fetchapi(url, { method: "DELETE" });
  }
  return { get, post, put, del, fetchapi, baseURL };
};

export { useApi as u };
//# sourceMappingURL=useApi-BTut_o5P.mjs.map
