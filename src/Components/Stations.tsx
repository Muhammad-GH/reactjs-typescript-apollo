import React, {useState} from 'react'
import { gql, useQuery } from '@apollo/client'
import { Table, Input, Row, Col, Button } from 'reactstrap';

const GET_ALL_STATIONS = gql`
  query ($radius: Int, $lat: Float, $lng: Float) {
    stations (radius: $radius, lat: $lat, lng: $lng) {
      id 
      name
      lat 
      lng
      distance
      company {
        id 
        name
      }
    }
  }
`;

function Stations() {
  const [radius, setRadius] = useState(0);
  const [lat, setLat] = useState(37.50162296358696);
  const [lng, setLng] = useState(-120.81869417649496);

  const { loading, error, data } = useQuery(GET_ALL_STATIONS, {
    variables: {
      radius: radius,
      lat: lat, 
      lng: lng
    }
  }); 

  if (error) return <p>Error! ${error.message}</p>

  return <>
    <h2>Stations </h2>
    <p>
      <strong>Base Location</strong>
      <Row >
        <Col >
          <Input placeholder="Latitude" value={lat} onChange={(e)=> setLat(Number(e.target.value))} />
          <small>Latitude</small>
        </Col>
        <Col >
          <Input placeholder="Longitude" value={lng} onChange={(e)=> setLng(Number(e.target.value))} />
          <small>Longitude</small>
        </Col>
        <Col >
          <Input placeholder="Radius (mi)" value={radius} onChange={(e)=> setRadius(Number(e.target.value))} />
          <small>Radius (mi) to filter stations within</small>
        </Col> 
      </Row>
    </p>
    {loading ? <small>Loading...</small> : '' }
    {
      data && <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>Parent Comapny</th>
          <th>Lat</th>
          <th>Lng</th>
          {radius ? <th>Distance (mi)</th>: ''}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.stations.map((station: any, i: number) => (
          <tr key={station.id}>
            <td>{station.id}</td>
            <td>{station.name}</td>
            <td>{station.company ? station.company.name : ''}</td>
            <td>{station.lat}</td>
            <td>{station.lng}</td>
            {radius ? <td>{station.distance} (mi)</td>: ''}
          </tr>
        ))}
      </tbody>
    </Table>
    }
    
  </>
}

export default Stations;