import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Header, Icon, Step, Form, Card } from 'semantic-ui-react';
import dayjs from 'dayjs';
import { getUsers } from '../utils';

const TicketEditorView = props => {
  const getColor = step => {
    // A function to change the colors of our ticket edit status icons
    if (props.ticketStatus > step) return 'green';
    else if (props.ticketStatus === step) return 'yellow';
    else return 'black';
  };

  const status = { 0: 'On Hold', 1: 'Todo', 2: 'In Progress', 3: 'Done' };

  return (
    props.ticket && (
      <>
        <Modal
          className='ticket-edit'
          onClose={() => props.setFirstOpen(false)}
          onOpen={() => {
            props.setFirstOpen(true);
          }}
          open={props.firstOpen}
        >
          <Card.Header className='ticket-edit-header'>
            <Step.Group className='stepStyle' size='mini'>
              <Step
                disabled={props.ticketStatus === 0}
                onClick={() => {
                  props.onSetTicketStatus(0);
                }}
              >
                <Icon
                  name={props.ticketStatus > 2 ? 'undo alternate' : 'coffee'}
                  color={props.ticketStatus === 0 ? 'yellow' : 'black'}
                />
                <Step.Content>
                  <Step.Title>{props.ticketStatus > 2 ? 'Bug not fixed' : status[0]}</Step.Title>
                </Step.Content>
              </Step>

              <Step
                disabled={props.ticketStatus === 1}
                onClick={() => {
                  props.onSetTicketStatus(1);
                }}
              >
                <Icon name='bug' color={getColor(1)} />
                <Step.Content>
                  <Step.Title>{status[1]}</Step.Title>
                </Step.Content>
              </Step>
              <Step
                disabled={props.ticketStatus === 2}
                onClick={() => {
                  props.onSetTicketStatus(2);
                }}
              >
                <Icon name='cogs' color={getColor(2)} />
                <Step.Content>
                  <Step.Title>{status[2]}</Step.Title>
                </Step.Content>
              </Step>

              <Step
                disabled={props.ticketStatus !== 2 && props.ticketStatus !== 0}
                onClick={() => {
                  props.onSetTicketStatus(3);
                }}
              >
                <Icon name='check' color={props.ticketStatus === 3 ? 'green' : 'black'} />
                <Step.Content>
                  <Step.Title>{status[3]}</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </Card.Header>

          <Card className='ticket-edit-card'>
            <Card.Content extra>
              <Card.Meta className='ticket-edit-content'>
                <Header>{props.ticket.title}</Header>
                <div>
                  <Icon name='user' fitted /> {props.ticket.userId}
                </div>
              </Card.Meta>
              <Card.Meta className='ticket-edit-content'>
                <div>
                  <Icon name='exclamation circle' fitted /> {props.ticket.priority}
                </div>
                <div>
                  <Icon name='calendar alternate outline' fitted />{' '}
                  {dayjs(new Date(props.ticket?.createdAt)).format('DD/MM/YYYY')}
                </div>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra className='ticket-edit-content'>
              <Card.Description>
                <Header as='h5' content='Description:' />
                <p>{props.ticket.content}</p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra textAlign='right'>
              <Modal.Actions>
                <Button
                  onClick={() => {
                    if (props.firstOpen) {
                      props.setSecondOpen(true);
                      props.setFirstOpen(false);
                    }
                  }}
                  content='Edit'
                  icon='edit outline'
                  labelPosition='right'
                  color='blue'
                />
                <Button
                  onClick={() => {
                    props.setFirstOpen(false);
                    props.onConfirmEdit(); // This deletes meta data from the userProjects in the database
                  }}
                  content='Done'
                  labelPosition='right'
                  icon='checkmark'
                  color='green'
                />
              </Modal.Actions>
            </Card.Content>
          </Card>
        </Modal>
        <Modal onClose={() => props.setSecondOpen(false)} className='ticket-edit-modal' open={props.secondOpen}>
          <Modal.Header textAlign='left' content='Edit Ticket' />
          <Modal.Content>
            <Form size='large'>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Ticket title'
                  placeholder='Title'
                  defaultValue={props.ticket?.title !== null ? props.ticket?.title : 'Ticket Title'}
                  onChange={input => props.onSetTicketTitle(input.target.value)}
                />
                <Form.Select
                  disabled={!props.users}
                  fluid
                  label='Assigned user'
                  options={getUsers(props.users)}
                  onChange={e => props.onSetAssignedUser(e.target?.textContent)}
                  placeholder={props.selectedTicket?.userId}
                />
              </Form.Group>
              <Form.Group className='ticket-edit-priority'>
                <Header as='h5' className='ticket-edit-priority-header'>
                  Priority:
                </Header>
                <input
                  type='range'
                  min='1'
                  max='3'
                  defaultValue={props.ticket.priority}
                  className='slider'
                  id='myRange'
                  onChange={input => props.onSetTicketPriority(input.target.value)}
                  className='priority-slider'
                />
                <div className='priority-numbers'>
                  <Header as='h5' className='priority-number' content='1' />
                  <Header as='h5' className='priority-number' content='2' />
                  <Header as='h5' className='priority-number' content='3' />
                </div>
              </Form.Group>
              <Form.TextArea
                label='Description'
                placeholder='Describe the problem in detail...'
                defaultValue={props.ticket.content !== null ? props.ticket.content : 'Ticket Content'}
                onChange={input => props.onSetTicketContent(input.target.value)}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content='Cancel'
              labelPosition='right'
              icon='close'
              onClick={() => {
                props.setSecondOpen(false);
                props.onSetTicketTitle('');
                props.onSetTicketPriority('');
                props.onSetTicketContent('');
                props.onSetAssignedUser('');
              }}
            />
            <Button
              color='green'
              icon='check'
              content='All Done'
              onClick={() => {
                props.setSecondOpen(false);
                props.onConfirmEdit();
              }}
            />
          </Modal.Actions>
        </Modal>
      </>
    )
  );
};

const mapStateToProps = (state, props) => {
  return { ...props, user: state.userState.user, users: state.boardState.board.members };
};

export default connect(mapStateToProps)(TicketEditorView);
