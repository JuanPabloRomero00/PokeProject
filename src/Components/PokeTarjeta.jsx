import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Card, CardBody, CardFooter, CardImg, Badge } from 'reactstrap'

const PokeTarjeta = (params) => {
  const [pokemon, setPokemon] = useState({})
  const [pokeImg, setPokeImg] = useState('')
  const [cardClass, setCardClass] = useState('d-none')
  const [loadClass, setLoadClass] = useState('')

  useEffect(() => {
    getPokeData();
  }, []);

  const getPokeData = async () => {
    try {
      const liga = params.poke.url
      const response = await axios.get(liga)
      const respuesta = response.data
      setPokemon(respuesta)
      setPokeImg(respuesta.sprites.front_default)
      setCardClass('')
      setLoadClass('d-none')
    } catch (error) {
      console.error('Error al obtener datos del pokemon:', error)
    }
  }

  return (
    <Col sm='4' lg='3' className='mb-3'>
      <Card>
        <CardImg src={pokeImg} height='150' className='p-2' />
        <CardBody className='text-center'>
          <Badge pill color='danger'>#{pokemon.id}</Badge>
          <label className='fs-4 text-capitalize'>{pokemon.name}</label>
        </CardBody>
      </Card>
    </Col>
  )
}

export default PokeTarjeta

