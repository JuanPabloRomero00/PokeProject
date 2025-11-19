import { useState, useEffect } from "react";
import axios from "axios";
import fondoImg from "../assets/Fondo.jpg";
import { Container, InputGroup, InputGroupText, Row, Col, Input, FormGroup, Label, Input as SelectInput } from "reactstrap";
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
  const [selectedType, setSelectedType] = useState('all');
  const [typeList, setTypeList] = useState([]);
  const [showVideo, setShowVideo] = useState(true);
  
  useEffect(() => {
    getPokemones(offset);
    getAllPokemones();
  }, []);

  const buscar = () => {
    if (filtro.trim() !== '') {
      if (selectedType === 'all') {
        setListado(allPokemones.filter(pok => pok.name.toLowerCase().includes(filtro)));
      } else {
        setListado(typeList.filter(pok => pok.name.toLowerCase().includes(filtro)));
      }
    } else {
      if (selectedType === 'all') {
        setListado(pokemones);
      } else {
        setListado(typeList.slice(0, limit));
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      buscar();
    }, 300);
    return () => clearTimeout(timeout);
  }, [filtro, selectedType, allPokemones, typeList, pokemones, limit]);

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
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
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



  const filterByType = async (type) => {
    setSelectedType(type);
    setFiltro('');
    setOffset(1);
    setListado([]); 
    if (type === 'all') {
      setTypeList([]);
      setListado(pokemones);
      setTotal(1281);
    } else {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const typeData = response.data;
        const pokemonList = typeData.pokemon.map(p => p.pokemon);
        setTypeList(pokemonList);
        setListado(pokemonList.slice(0, limit));
        setTotal(pokemonList.length);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      } catch (error) {
        console.error('Error al filtrar por tipo:', error);
      }
    }
  }

  const goPage = async (page) => {
    setListado([]);
    if (selectedType === 'all') {
      await getPokemones( (page == 1) ? 0 : (page - 1) * limit );
    } else {
      const start = (page - 1) * limit;
      setListado(typeList.slice(start, start + limit));
    }
    setOffset(page);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }

  return (
    <div className="background" style={!showVideo ? {backgroundImage: `url(/img/Fondo.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'} : {}}>
      {showVideo && <video className="background-video" autoPlay muted loop onError={() => setShowVideo(false)}>
        <source src="/img/pokeball-animation.mp4" type="video/mp4" />
      </video>}
     <Container className="shadow">  
       <Row className="animate__animated animate__backInDown align-items-end">
         <Col md="10" className="text-center">
            <InputGroup className="mb-3 shadow">
              <InputGroupText>
                <i className="fa-solid fa-search"></i></InputGroupText>
                <Input 
                  value={filtro} 
                  onChange={(e) => {setFiltro(e.target.value.toLowerCase())}} 
                  placeholder="Buscar Pokemon"
                />
            </InputGroup>        
          </Col>
          <Col md="2" className="text-end">
            <FormGroup className="mb-3">
              <SelectInput type="select" name="type" id="typeSelect" value={selectedType} onChange={(e) => filterByType(e.target.value)} className="form-select-sm">
                <option value="all">Todos</option>
                <option value="fire">Fuego</option>
                <option value="water">Agua</option>
                <option value="grass">Planta</option>
                <option value="electric">Eléctrico</option>
                <option value="ice">Hielo</option>
                <option value="fighting">Lucha</option>
                <option value="poison">Veneno</option>
                <option value="ground">Tierra</option>
                <option value="flying">Volador</option>
                <option value="psychic">Psíquico</option>
                <option value="bug">Bicho</option>
                <option value="rock">Roca</option>
                <option value="ghost">Fantasma</option>
                <option value="dragon">Dragón</option>
                <option value="dark">Siniestro</option>
                <option value="steel">Acero</option>
                <option value="fairy">Hada</option>
                <option value="normal">Normal</option>
              </SelectInput>
            </FormGroup>
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
