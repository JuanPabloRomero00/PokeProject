import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Card, CardBody, CardFooter, CardImg, Badge } from 'reactstrap'
import { Link } from 'react-router-dom'

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
      if (respuesta.sprites.front_default != null) {
        setPokeImg(respuesta.sprites.front_default)
      } else {
        setPokeImg(respuesta.sprites.other['official-artwork'].front_default)
      }
      setCardClass('')
      setLoadClass('d-none')
    } catch (error) {
      console.error('Error al obtener datos del pokemon:', error)
    }
  }

  return (
    <Col sm='4' lg='3' className='mb-3'>
      <Card className={'shwadow border-4 border-info ' + loadClass}>
        <CardImg src='/img/Loading2.gif' height='200' className='p-3'></CardImg>
      </Card>
      <Card className={'animate__animated animate__zoomIn card-hover shadow border-4 border-info ' + cardClass}>
        <CardImg src={pokeImg} height='150' className='p-2' />
        <CardBody className='text-center'>
          <Badge pill color='danger'>#{pokemon.id}</Badge>
          <label className='fs-4 text-capitalize'>{pokemon.name}</label>
        </CardBody>
        <CardFooter className='bg-info'>
          <Link to={'/pokemon/'+pokemon.name} className='btn btn-dark'>
            <i className='fa-solid fa-arrow-up-right-from-square'></i>  Detalle</Link>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default PokeTarjeta

