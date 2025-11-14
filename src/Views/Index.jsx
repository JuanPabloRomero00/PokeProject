import { useState, useEffect } from "react";
import axios from "axios";
import fondoImg from "../assets/Fondo.jpg";
import { Container, InputGroup, InputGroupText, Row, Col, Input } from "reactstrap";
import PokeTarjeta from "../Components/PokeTarjeta";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Index = () => {
  console.log('Componente Index montado');
  const [pokemones, setPokemones] = useState([]);
  const [allPokemones, setAllPokemones] = useState([]);
  const [listado, setListado] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    getPokemones(offset);
    getAllPokemones();
  }, []);

  useEffect(() => {
    console.log('Pokemones actualizados:', pokemones);
  }, [pokemones]);

  const getPokemones = async (o) => {
    try {
      const liga = 'https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + o;
      console.log('Llamando a la API:', liga);
      axios.get(liga).then( async (response) => {
        const respuesta = response.data;
        console.log('Respuesta de la API:', respuesta);
        setPokemones(respuesta.results);
        setListado(respuesta.results);
        setTotal(respuesta.count);
      });
    } catch (error) {
      console.error('Error al obtener pokemones:', error);
    }
  };

  const getAllPokemones = async (o) => {
    try {
      const liga = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0';
      axios.get(liga).then( async (response) => {
        const respuesta = response.data;
        setAllPokemones(respuesta.results);
      });
    } catch (error) {
      console.error('Error al obtener todos los pokemones:', error);
    }
  };

  const buscar = async (e) => { 
    if (e.keyCode == 13) {
      if (filtro.trim() != '') {
        setListado([]);
        setTimeout( () => {
          setListado(allPokemones.filter( pok => pok.name.includes(filtro) ));
        }, 100);
      } 
    } else if (filtro.trim() == '') {
      setListado([]);
      setTimeout( () => {
        setListado(pokemones);
      }, 100);
    }
  }

  const goPage = async (page) => {
    setListado([]);
    await getPokemones( (page == 1) ? 0 : (page - 1) * limit );
    setOffset(page);
  }

  return (
    <div className="background">
     <Container className="shadow">  
       <Row className="animate__animated animate__backInDown">
         <Col> 
            <InputGroup className="mb-3 mt-3 shadow">
              <InputGroupText>
                <i className="fa-solid fa-search"></i></InputGroupText>
                <Input 
                  value={filtro} 
                  onChange={(e) => {setFiltro(e.target.value.toLowerCase())}} 
                  onKeyUpCapture={buscar} 
                  placeholder="Buscar Pokemon"
                />
            </InputGroup>        
          </Col>
        </Row>
        <Row className="mt-3">
          {listado.map((pok, i) => (
            <PokeTarjeta poke={pok} key={i} />
          ))}
          { listado.length == 0 ? <Col className="text-center fs-2 mb-3">
            <h3 style={{color: 'white'}}>No se encontraron pokemones</h3>
          </Col> : '' }
        </Row>
        <Row className="mt-3 mb-3">
          <PaginationControl 
            last={true}
            limit={limit}
            total={total}
            page={offset}
            changePage={page => goPage(page)}
          />
        </Row>
     </Container>
    </div>     
  );
};

export default Index;
