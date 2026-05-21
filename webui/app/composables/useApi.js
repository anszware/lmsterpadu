export const useApi = () => {
    const config = useRuntimeConfig()
    const token = useCookie('access_token')

    const baseURL = config.public.apiBase

    const getDefaultHeaders = () => {
        const headers = {
            'Accept': 'application/json',
        }

        if (token.value) {
            headers['Authorization'] = `Bearer ${token.value}`
        }

        return headers
    }

    const fetchapi = async (url, options = {}) => {
        const headers = {
            ...getDefaultHeaders(),
            ...options.headers
        }

        // Jangan set Content-Type jika body adalah FormData agar browser yang mengaturnya (termasuk boundary)
        if (options.body instanceof FormData) {
            if (headers['Content-Type']) {
                delete headers['Content-Type']
            }
        } else if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json'
        }

        // console.log('Final Headers for request to:', url, headers);

        try {
            return await $fetch(url, {
                baseURL,
                headers,
                ...options
            })
        } catch (error) {
            if (error.status === 401) {
                console.error('Unauthenticated error detected. Token value:', token.value ? 'Exists' : 'Empty');
            }
            throw error
        }
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
