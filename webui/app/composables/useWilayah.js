export const useWilayah = () => {
    const { get } = useApi()
    const loading = ref(false)

    const fetchWilayah = async (url, params = {}) => {
        loading.value = true
        try {
            const response = await get(url, {
                all: 'true',
                ...params
            })
            // Handle both wrapped { data: [...] } and unwrapped [...]
            const data = response.data || response || []
            console.log(`[useWilayah] Data loaded from ${url}:`, data.length, 'items')
            return Array.isArray(data) ? data : (data.data || [])
        } catch (error) {
            console.error(`[useWilayah] Error fetching from ${url}:`, error)
            return []
        } finally {
            loading.value = false
        }
    }

    const fetchProvinsi = async (search = '') => {
        // Caching provinsi karena jarang berubah
        if (!search && typeof window !== 'undefined') {
            const cached = localStorage.getItem('list_provinsi')
            if (cached) return JSON.parse(cached)
        }

        const data = await fetchWilayah('/wilayah/provinsi', { search })
        
        if (!search && data.length > 0 && typeof window !== 'undefined') {
            localStorage.setItem('list_provinsi', JSON.stringify(data))
        }
        
        return data
    }

    const fetchKota = async (provinsiId, search = '') => {
        if (!provinsiId) return []
        return await fetchWilayah('/wilayah/kota', { provinsi_id: provinsiId, search })
    }

    const fetchKecamatan = async (kotaId, search = '') => {
        if (!kotaId) return []
        return await fetchWilayah('/wilayah/kecamatan', { kota_id: kotaId, search })
    }

    const fetchKelurahan = async (kecamatanId, search = '') => {
        if (!kecamatanId) return []
        return await fetchWilayah('/wilayah/kelurahan', { kecamatan_id: kecamatanId, search })
    }

    return {
        loading,
        fetchProvinsi,
        fetchKota,
        fetchKecamatan,
        fetchKelurahan
    }
}

