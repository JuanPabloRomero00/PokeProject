import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Card, CardBody, CardFooter, CardImg, Badge } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const PokeTarjeta = (params) => {
  const [pokemon, setPokemon] = useState({})
  const [imgSrc, setImgSrc] = useState('')
  const [cardClass, setCardClass] = useState('d-none')
  const [loadClass, setLoadClass] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const typeColors = {
    fire: 'danger',
    water: 'primary',
    grass: 'success',
    electric: 'warning',
    ice: 'info',
    fighting: 'dark',
    poison: 'secondary',
    ground: 'secondary',
    flying: 'light',
    psychic: 'danger',
    bug: 'success',
    rock: 'secondary',
    ghost: 'dark',
    dragon: 'primary',
    dark: 'dark',
    steel: 'secondary',
    fairy: 'light',
    normal: 'secondary'
  }

  const typeIconMap = {
    fire: 'Fuego.webp',
    water: 'Agua.png',
    grass: 'Planta.png',
    electric: 'Eléctrico.png',
    ice: 'Hielo.webp',
    fighting: 'Lucha.png',
    poison: 'Veneno.png',
    ground: 'Tierra.webp',
    flying: 'Volador.webp',
    psychic: 'Psiquico.webp',
    bug: 'Bicho.webp',
    rock: 'Roca.png',
    ghost: 'Fantasma.webp',
    dragon: 'Dragón.png',
    dark: 'Siniestro.webp',
    steel: 'Acero.webp',
    fairy: 'Hada.webp',
    normal: 'Normal.webp'
  }

  useEffect(() => {
    getPokeData();
  }, [params.poke]);

  const getPokeData = async () => {
    try {
      const liga = params.poke.url
      const response = await axios.get(liga)
      const respuesta = response.data
      setPokemon(respuesta)
      if (respuesta.sprites.other['official-artwork'].front_default != null) {
        setImgSrc(respuesta.sprites.other['official-artwork'].front_default)
      } else {
        setImgSrc(respuesta.sprites.front_default)
      }
      setCardClass('')
      setLoadClass('d-none')

      // Get description
      const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${respuesta.id}`)
      const species = speciesResponse.data
      const desc = species.flavor_text_entries.find(e => e.language.name === 'es')?.flavor_text.replace(/\f/g, ' ') || 'No description available.'
      setDescription(desc)
    } catch (error) {
      console.error('Error al obtener datos del pokemon:', error)
    }
  }

  const primaryType = pokemon.types?.[0]?.type?.name || 'normal'
  const borderColor = typeColors[primaryType] || 'info'

  return (
    <Col sm='4' lg='3' className='mb-3'>
      <Card className={'shwadow border-4 border-info ' + loadClass}>
        <CardImg src='/img/Loading2.gif' height='240' className='p-3'></CardImg>
      </Card>
      <div className='text-decoration-none' onClick={() => navigate('/pokemon/'+pokemon.name)}>
        <Card className={`animate__animated animate__zoomIn card-hover shadow border-4 border-${borderColor} ` + cardClass}>
          <CardImg src={imgSrc} height='190' className='p-2' />
          <div className="card-overlay" style={{ backgroundImage: `url(${imgSrc})` }}></div>
          <CardBody className='text-center'>
            <div className="d-flex justify-content-center mb-2">
              {pokemon.types && pokemon.types.map((typeObj, index) => (
                typeIconMap[typeObj.type.name] && (
                  <img key={index} src={`/img/${typeIconMap[typeObj.type.name]}`} alt={typeObj.type.name} style={{width: '30px', height: '30px', margin: '0 5px'}} />
                )
              ))}
            </div>
            <Badge pill color='danger'>#{pokemon.id}</Badge>
            <label className='fs-4 text-capitalize'>{pokemon.name}</label>
          </CardBody>
          <div className="hover-content">
            <p className="description">{description}</p>
            <div className='btn btn-dark'>Ver detalle</div>
          </div>
        </Card>
      </div>
    </Col>
  )
}

export default PokeTarjeta

