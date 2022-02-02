import React from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { TicketView } from '.';

const BoardView = props => {
  const onHoldTickets = props.tickets.filter(ticket => ticket.status === 0);
  const todoTickets = props.tickets.filter(ticket => ticket.status === 1);
  const inProgressTickets = props.tickets.filter(ticket => ticket.status === 2);
  const doneTickets = props.tickets.filter(ticket => ticket.status === 3);

  return (
    <Grid columns={4} className='board-grid' divided stackable doubling>
      <Grid.Column>
        <Segment>
          <Header as='h3' icon='coffee' textAlign='center' content='On Hold' />
        </Segment>
        {onHoldTickets.map((ticket, index) => (
          <Grid.Row key={`inProgressTicket-${index}`}>
            <TicketView {...props} ticket={ticket} />
          </Grid.Row>
        ))}
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Header as='h3' icon='bug' content='To do' />
        </Segment>
        {todoTickets.map((ticket, index) => (
          <Grid.Row key={`todoTicket-${index}`}>
            <TicketView {...props} ticket={ticket} />
          </Grid.Row>
        ))}
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Header as='h3' icon='cogs' textAlign='center' content='In Progress' />
        </Segment>
        {inProgressTickets.map((ticket, index) => (
          <Grid.Row key={`doneTicket-${index}`}>
            <TicketView {...props} ticket={ticket} />
          </Grid.Row>
        ))}
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Header icon='check' as='h3' textAlign='center' content='Done' />
        </Segment>
        {doneTickets.map((ticket, index) => (
          <Grid.Row key={`onHoldTicket-${index}`}>
            <TicketView {...props} ticket={ticket} />
          </Grid.Row>
        ))}
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    tickets: state.boardState.board.tickets ? Object.values(state.boardState.board.tickets) : [],
    members: state.boardState.board.members,
    board: state.boardState.board,
  };
};

export default connect(mapStateToProps)(BoardView);
