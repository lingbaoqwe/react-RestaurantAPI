import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
function Restaurants(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  let location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  let borough = urlParams.get("borough");
  const url = borough
    ? `https://pure-lowlands-34974.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${borough}`
    : `https://pure-lowlands-34974.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((returnData) => {
        setRestaurants(returnData);
      });
  }, [location, page]);

  const previousPage = () => {
    if (page > 1) {
      setPage((prevpage) => prevpage - 1);
    }
  };
  const nextPage = () => {
    setPage((prevpage) => prevpage + 1);
  };

  if (restaurants && restaurants.length > 0) {
    return (
      <div>
        <Card className="mt-2">
          <Card.Body className="p-2">
            <Card.Title>Restaurant List</Card.Title>
            <Card.Text>
              Full list of restaurants. Optionally sorted by borough
            </Card.Text>
          </Card.Body>
        </Card>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>name</th>
              <th>address</th>
              <th>borough</th>
              <th>cuisine</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr
                key={restaurant._id}
                onClick={() => {
                  navigate(`/restaurant/${restaurant._id}`);
                }}
              >
                <td>{restaurant.name}</td>
                <td>
                  {restaurant.address.street}{restaurant.address.building} 
                </td>
                <td>{restaurant.borough}</td>
                <td>{restaurant.cuisine}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev onClick={previousPage} />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>

      </div>
    );
  }
  else if (restaurants.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>Loading Restaurants...</Card.Text>
        </Card.Body>
      </Card>
    );
  }
    else
    {
      return (
        <Card>
          <Card.Body>
          <Card.Text>No Restaurants Found</Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }


export default Restaurants;
