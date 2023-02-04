import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getFetch } from "../../utils/getFetch";
import "./ItemListContainer.css";
import { NavLink, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemList from "../../ItemList/ItemList";
import Loader from "../../../Loader/Loader";


function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const { categoryId } = useParams();

  console.log({ categoryId });

  useEffect(() => {
    if (categoryId) {
      getFetch()
        .then((respuestaPromesa) => {
          setProductos(
            respuestaPromesa.filter((items) => items.genero === categoryId)
          );
        })
        .catch((err) => console.log("error"))
        .finally(() => setLoadings(false));
    } else {
      getFetch()
        .then((respuestaPromesa) => {
          setProductos(respuestaPromesa);
        })
        .catch((err) => console.log("error"))
        .finally(() => setLoadings(false));
    }
  }, [categoryId]);

  console.log(categoryId);

  return (
   
    <>
    <div className="producto-cards">
      <Container fluid="md">
        <Row md="auto">
          
          {loadings ? (
            <div className="div-loader">
            <h3 className="loader text-center"><Loader/></h3></div>
          ) : (

            <Col md={"12"}>
           
              

                <ItemList productos={productos}/>
              
                </Col>
             
          )
          }
         
         </Row>
      </Container>
    </div>
  </>
     

    
  );
}

export default ItemListContainer;