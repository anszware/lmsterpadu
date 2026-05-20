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
            return response.data || []
        } catch (error) {
            console.error(`Error fetching from ${url}:`, error)
            return []
        } finally {
            loading.value = false
        }
    }

    const fetchProvinsi = async (search = '') => {
        return await fetchWilayah('/wilayah/provinsi', { search })
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

