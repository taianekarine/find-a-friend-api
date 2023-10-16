import { titleize } from '@/utils/titlesize'
import axios from 'axios'

interface BrasilStateProps {
  name: string
}

export const getBrasilStates = async () => {
  const response = await axios.get('https://brasilapi.com.br/api/ibge/uf/v1')

  return response.data as BrasilStateProps
}

interface BrasilCityResponse {
  nome: string
  codigo_ibge: string
}

interface BrasilCityProps {
  name: string
  code: string
}

export const getBrasilCitysByState = async (
  UFCode: string,
): Promise<BrasilCityProps[]> => {
  const response = await axios.get<BrasilCityResponse[]>(
    `https://brasilapi.com.br/api/ibge/municipios/v1/${UFCode}`,
  )

  return response.data.map((city) => ({
    name: titleize(city.nome),
    code: city.codigo_ibge,
  }))
}

interface GeoLocationProps {
  address: string
  city: string
  coordinates: {
    longitude: string
    latitude: string
  }
}

export const getGeoLocationByCEP = async (
  cep: string,
): Promise<GeoLocationProps> => {
  const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)

  return {
    address: response.data.street,
    city: response.data.city,
    coordinates: {
      latitude: response.data.location.coordinates.latitude,
      longitude: response.data.location.coordinates.longitude,
    },
  }
}
