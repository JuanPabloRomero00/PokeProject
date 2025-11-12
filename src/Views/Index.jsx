import { useState, useEffect } from "react";
import axios from "axios";
import fondoImg from "../assets/Fondo.jpg";
import { Container, InputGroup, InputGroupText, Row, Col, Input } from "reactstrap";
import PokeTarjeta from "../Components/PokeTarjeta";

const Index = () => {
  console.log('Componente Index montado');
  const [pokemones, setPokemones] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151);
  
  useEffect(() => {
    getPokemones(offset);
  }, []);

  useEffect(() => {
    console.log('Pokemones actualizados:', pokemones);
  }, [pokemones]);

  const getPokemones = async (o) => {
    try {
      const liga = 'https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + o;
      console.log('Llamando a la API:', liga);
      const response = await axios.get(liga);
      const respuesta = response.data;
      console.log('Respuesta de la API:', respuesta);
      setPokemones(respuesta.results);
    } catch (error) {
      console.error('Error al obtener pokemones:', error);
    }
  };

  return (
    <div className="background">
     <Container className="shadow">  
       <Row>
         <Col> 
            <InputGroup className="mb-3 mt-3 shadow">
              <InputGroupText>
                <i className="fa-solid fa-search"></i></InputGroupText>
              <Input placeholder="Buscar Pokemon" />
            </InputGroup>        
          </Col>
        </Row>
        <Row>
          {pokemones.map((pok, i) => (
            <PokeTarjeta poke={pok} key={i} />
          ))}    
        </Row>
     </Container>
    </div>     
  );
};

export default Index;
