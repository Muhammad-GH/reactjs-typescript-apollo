import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Table } from 'reactstrap';

const GET_ALL_COMPANIES = gql`
  query {
    companies {
      id 
      name
      stations {
        id 
        name
      }
      children {
        id 
        name
      }
      parent {
        id 
        name
      }
    }
  }
`;

function Companies() {
  const { loading, error, data } = useQuery(GET_ALL_COMPANIES);

  if (loading) return <p>Loading Companies...</p>
  if (error) return <p>Error! ${error.message}</p>

  return <>
    <h2>Companies</h2>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Parent Comapny</th>
          <th>Child Companies</th>
          <th>Stations <small>Including child companies'</small></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.companies.map((company: any, i: number) => (
          <tr key={company.id}>
            <td>{company.id}</td>
            <td>{company.name}</td>
            <td>{company.parent ? company.parent.name : '--'}</td>
            <td>{!company.children.length ? '--' : <ul>
              {
                company.children.map((c: any, j: number) => {
                  return <li>{c.name}</li>
                })
              }
            </ul>
            }</td>
            <td>{company.stations ? company.stations.length : 0}</td>
            <td>{''}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
}

export default Companies;