import { Card, CardGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import moment from 'moment';

function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(`https://pure-lowlands-34974.herokuapp.com/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
      });
  }, [id]);
  if(loading) {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Text>Loading Restaurant Data...</Card.Text>
        </Card.Body>
      </Card>
    );
  }
else if (!loading && !restaurant) {
      return (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>Unable to find Restaurant with id: {id}</Card.Text>
          </Card.Body>
        </Card>
      );
    } 
    else {
      return (
        <>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>
                {restaurant.address.building} {restaurant.address.street}
              </Card.Text>
            </Card.Body>
          </Card>

          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>

          <h4 >Ratings</h4>

          <CardGroup>
            {restaurant.grades.map((grade) => (
              <Card>
                <Card.Body>
                  <Card.Text>Grade: {grade.grade}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  Completed: {moment(grade.date).format('MM/DD/YYYY')}
                </Card.Footer>
              </Card>
            ))}
          </CardGroup>
        </>
      );
    }
  } 


export default Restaurant;
