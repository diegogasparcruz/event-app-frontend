import React from 'react';
import { Table, Button } from 'semantic-ui-react';

export default props =>{

  const renderRow = () => {

    return props.events.map(event => (
      <Table.Row key={ event.id }>
        <Table.Cell> { event.title } </Table.Cell>
        <Table.Cell> { event.location } </Table.Cell>
        <Table.Cell> { new Date (event.date).toLocaleDateString() } </Table.Cell>
        <Table.Cell> { event.time } </Table.Cell>
        <Table.Cell> <Button negative content="Delete" onClick={ () => props.deleteEvent(event.id) } /> </Table.Cell>
      </Table.Row>
    ));

  };

  return(

    <Table textAlign="center" celled>

      <Table.Header>
        <Table.Row>
          <Table.HeaderCell> Title </Table.HeaderCell>
          <Table.HeaderCell> Location </Table.HeaderCell>
          <Table.HeaderCell> Date </Table.HeaderCell>
          <Table.HeaderCell> Time </Table.HeaderCell>
          <Table.HeaderCell> Actions </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { props.events.length === 0 ? (<Table.Row verticalAlign="middle"> <Table.Cell> Não há eventos cadastrados </Table.Cell> </Table.Row>) : renderRow() }
      </Table.Body>

    </Table>

  );

}
