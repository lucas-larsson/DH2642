import dayjs from 'dayjs';
import { Card, Button, Icon, Divider } from 'semantic-ui-react';
import { TicketEditorView } from '.';

const TicketView = props => {
  const getTitle = title => {
    if (title.length === 0) return '(No title for this ticket)';
    else if (title.length > 50) {
      return `${title.slice(0, 46)} ...`;
    } else return title;
  };
  return (
    <Card className='card-style'>
      <Card.Content header={getTitle(props.ticket.title)} />
      <Card.Content extra>
        <Card.Meta>
          <Icon name='calendar alternate outline' /> {dayjs(new Date(props.ticket?.createdAt)).format('DD/MM/YYYY')}
          <br />
          <Icon name='user' /> {props.ticket.userId} <br />
          <Icon name='exclamation circle' /> {props.ticket.priority || ''} <br />
        </Card.Meta>
        <Divider fitted={true} className='board-ticket-space' />
        <Card.Description className='btvDescription'></Card.Description>
        <div className='ui two buttons'>
          <Button
            onClick={() => {
              props.setFirstOpen(true);
              props.onSetSelectedTicket(props.ticket);
              props.onSetTicketStatus(props.ticket?.status)
            }}
            color='blue'
            icon='external alternate'
            content='View / Edit'
          />
          <Button
            onClick={() => {
              props.removeTicket(props.ticket.id);
            }}
            color='red'
            icon='trash alternate'
            content='Delete'
          />
        </div>
      </Card.Content>
      <TicketEditorView {...props} />
    </Card>
  );
};

export default TicketView;
