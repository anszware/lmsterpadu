export const useApi = () => {
    const config = useRuntimeConfig()
    const token = useCookie('access_token')

    const baseURL = config.public.apiBase

    const getDefaultHeaders = () => ({
        Authorization: token.value ? `Bearer ${token.value}` : '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    })

    const fetchapi = async (url, options = {}) => {
        return await $fetch(url, {
            baseURL,
            headers: {
                ...getDefaultHeaders(),
                ...options.headers
            },
            ...options
        })
    }

    async function get(url, params = {}) {
        return await fetchapi(url, { method: 'GET', params })
    }

    async function post(url, body = {}) {
        return await fetchapi(url, { method: 'POST', body })
    }

    async function put(url, body = {}) {
        return await fetchapi(url, { method: 'PUT', body })
    }

    async function del(url) {
        return await fetchapi(url, { method: 'DELETE' })
    }

    return { get, post, put, del, fetchapi, baseURL }
}
