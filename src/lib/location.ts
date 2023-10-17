import axios from 'axios'

interface Address {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

export const findCityByCEP = async (cep: string): Promise<string | null> => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    if (response.status === 200) {
      const addressData: Address = response.data

      return addressData.localidade
    }

    throw new Error('Error when querying the CEP.')
  } catch (error) {
    console.error('Error when querying the CEP.')
    return null
  }
}

// Exemplo de uso
const cep = '12345678' // Insira um CEP válido
findCityByCEP(cep)
  .then((city) => {
    if (city) {
      console.log(`A cidade para o CEP ${cep} é: ${city}`)
    } else {
      console.log(`Não foi possível obter a cidade para o CEP ${cep}.`)
    }
  })
  .catch((error) => console.error('Erro:', error))
