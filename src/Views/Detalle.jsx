import React, { use } from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, CardBody, CardText, CardImg, Badge, Progress } from 'reactstrap'
import axios from 'axios'
import PokeTarjeta from '../Components/PokeTarjeta'

const Detalle = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [especie, setEspecie] = useState([]);
  const [habitat, setHabitat] = useState('Desconocido');
  const [descripcion, setDescripcion] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);
  const [evoluciones, setEvoluciones] = useState([]);
  const [listaEvoluciones, setListaEvoluciones] = useState([]);
  const [cardClass, setCardClass] = useState('d-none')
  const [loadClass, setLoadClass] = useState('')

  useEffect(() => {
    getPokemon();
  }, [id]);

  const getPokemon = async () => {
    try {
      const liga = 'https://pokeapi.co/api/v2/pokemon/' + id;
      axios.get(liga).then( async (response) => {
        const respuesta = response.data;
        setPokemon(respuesta);
        if (respuesta.sprites.front_default != null) {
          setImagen(respuesta.sprites.front_default)
        } else {
          setImagen(respuesta.sprites.other['official-artwork'].front_default)
        }
        await getTipos(respuesta.types);
        await getHabilidades(respuesta.abilities);
        await getEstadisticas(respuesta.stats);
        await getEspecie(respuesta.species.name);
        setCardClass('')
        setLoadClass('d-none')
      });
    } catch (error) {
      console.error('Error al obtener datos del pokemon:', error)
    }
  }

  const getTipos = async (tip) => {
    try {
      let listaTipos = [];
      tip.forEach( (t) => {
        axios.get(t.type.url).then( async (response) => {
          listaTipos.push(response.data.names[5].name);
          setTipos(listaTipos);
        });
      });
    } catch (error) {
      console.error('Error al obtener tipos del pokemon:', error)
    }
  }

  const getHabilidades = async (hab) => {
    try {
      let listaHabilidades = [];
      hab.forEach( (h) => {
        axios.get(h.ability.url).then( async (response) => {
          listaHabilidades.push(response.data.names[5].name);
          setHabilidades(listaHabilidades);
        });
      });
    } catch (error) {
      console.error('Error al obtener las habilidades del pokemon:', error)
    }
  }

  const getEstadisticas = async (est) => {
    try {
      let listaEstadisticas = [];
      est.forEach( (e) => {
        axios.get(e.stat.url).then( async (response) => {
          listaEstadisticas.push({'nombre': response.data.names[5].name, 'valor': e.base_stat});
          setEstadisticas(listaEstadisticas);
        });
      });
    } catch (error) {
      console.error('Error al obtener las estadísticas del pokemon:', error)
    }
  }

  const getEspecie = async (esp) => {
    try {
      const liga = 'https://pokeapi.co/api/v2/pokemon-species/' + esp;
      axios.get(liga).then( async (response) => {
        const respuesta = response.data;
        setEspecie(respuesta);
        if (respuesta.habitat != null) {
          getHabitat(respuesta.habitat.url);
        } else {
          setHabitat('Desconocido');
        }
        await getDescripcion(respuesta.flavor_text_entries);
        await getEvoluciones(respuesta.evolution_chain.url);
      });
    } catch (error) {
      console.error('Error al obtener datos de la especie:', error)
    }
  }

  const getHabitat = async (hab) => {
    try {
      axios.get(hab).then( async (response) => {
        const respuesta = response.data;
        setHabitat(respuesta.names[1].name);
      });
    } catch (error) {
      console.error('Error al obtener datos del habitat:', error)
    }
  }

  const getDescripcion = async (desc) => {
    try {
      let texto = '';
      desc.forEach( (des) => {
        if (des.language.name == 'es') {
          texto = des.flavor_text;
        }
      })
      if (texto == '' && desc.length > 0) {
        texto = desc[0].flavor_text;
      }
      setDescripcion(texto);
    }
    catch (error) {
      console.error('Error al obtener descripcion del pokemon:', error)
    }
  }

  const getEvoluciones = async (ev) => {
    try {
      axios.get(ev).then( async (response) => {
        const respuesta = response.data;
        let lista = respuesta.chain.species.url.replace('-species', '');
        console.log('Inicio de cadena evolutiva:', lista);
        lista += procesaEvoluciones(respuesta.chain);
        setEvoluciones(lista);
        console.log('Cadena evolutiva procesada:', lista);
        let apoyo = lista.split(',');
        let list = [];
        apoyo.forEach( (a) => {
          if (a != '') {
            list.push({url: a});
          }
        });
        setListaEvoluciones(list);
        console.log('Lista de evoluciones:', list);
      });
    } catch (error) {
      console.error('Error al obtener datos de la línea evolutiva:', error)
    }
  }

  const procesaEvoluciones = (info) => {
    let res = ',';
    if (info.evolves_to.length > 0) {
      res += info.evolves_to[0].species.url.replace('-species', '');
      console.log('Evolución encontrada:', res);
      return res+''+procesaEvoluciones(info.evolves_to[0]);
    } else {
      return res;
    }
  }

  return (
    <Container className="shadow">
      <Row>
        <Col>
          <Card className='shadow mt-3 mb-3'>
            <CardBody className='mt-3'>
              <Row>
                <Col className='text-end'>
                  <Link to={'/'} className='btn btn-danger'>
                    <i className='fa-solid fa-home'></i>  Inicio
                  </Link>
                </Col>
              </Row>
              <Row className={loadClass}>
                <Col md='12'>
                  <img src='/img/Loading2.gif' className='w-100'></img>
                </Col>
              </Row>
              <Row className={cardClass}>
                <Col md='6'>
                  <CardText className='h1 text-capitalize'>{pokemon.name}</CardText>
                  <CardText className='fs-3'>{descripcion}</CardText>
                  <CardText className='fs-5'>
                    Altura: <b>{(pokemon.height)/10}m</b>
                  </CardText>
                  <CardText className='fs-5'>
                    Peso: <b>{(pokemon.weight)/10}kg</b>  
                  </CardText>
                  <CardText className='fs-5'>
                    Tipo(s): {tipos.map( (tipo, i) => (
                      <Badge 
                        key={i} 
                        pill 
                        color='danger' 
                        className='me-2 text-capitalize'
                      >
                        {tipo}
                      </Badge>
                    ))}
                  </CardText>
                  <CardText className='fs-5'>
                    Habilidades: {habilidades.map( (hab, i) => (
                      <Badge 
                        key={i} 
                        pill 
                        color='dark' 
                        className='me-2 text-capitalize'
                      >
                        {hab}
                      </Badge>
                    ))}
                  </CardText>
                  <CardText className='fs-5 text-capitalize'>
                    Habitat: <b>{habitat}</b>
                  </CardText>
                </Col>
                <Col md='6'>
                  <img src={imagen} height="200" className='animate__animated animate__bounceInRight'></img>
                </Col>
                <Col md='12' className='mt-3'>
                  <CardText className='fs-4 text-center'><b>Estadísticas Base</b></CardText>
                  {estadisticas.map( (est, i) => (
                    <Row key={i} className='mb-2'>
                      <Col xs='6' md='3'
                        ><b>{est.nombre}</b>
                      </Col>
                      <Col xs='6' md='9'>
                        <Progress className='my-2' value={est.valor}>{est.valor}</Progress>
                      </Col>
                    </Row>
                  ))}
                </Col>
                <Col md='12' className='mt-3'>
                  <CardText className='fs-4 text-center'><b>Cadena de evolución</b></CardText>
                </Col>
                {listaEvoluciones.map((pok, i) => (
                  <PokeTarjeta poke={pok} key={i} />
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Detalle
