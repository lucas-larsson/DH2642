import { Header, Button, Form, Modal } from 'semantic-ui-react';
import { getUsers } from '../utils';
import React from 'react';
import routes from '../localization/routes';

const AddTicketView = props => {
  const pathname = window.location.pathname;
  const formOptions = getUsers(props.users) || [];

  if (pathname === routes.BOARD_PATH) {
    return (
      <Modal
        onClose={() => {
          props.setEditTicket(false);
          props.resetSetters();
        }}
        onOpen={() => props.setEditTicket(true)}
        open={props.openTicket}
        trigger={
          <Button
            className='add-ticket-button'
            circular
            color='blue'
            content='Add ticket'
            icon='add'
            labelPosition='left'
          />
        }
      >
        <Modal.Header content='Create New Ticket' />
        <Modal.Content>
          <Form size='large'>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Ticket title'
                placeholder='Title'
                onChange={e => props.onSetTitle(e.target.value)}
              />
              <Form.Select
                disabled={!props.users}
                fluid
                label='Assigned user'
                options={formOptions}
                onChange={e => props.onSetAssignedUser(e.target?.textContent)}
                placeholder={props.user.name}
              />
            </Form.Group>
            <Form.Group className='main-nav-priority'>
              <Header as='h5'>Priority</Header>
              <input
                type='range'
                min='1'
                max='3'
                defaultValue='1'
                className='slider'
                id='myRange'
                onChange={e => props.onSetPriority(e.target.value)}
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
              onChange={e => props.onSetContent(e.target.value)}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content='Cancel'
            labelPosition='right'
            icon='close'
            onClick={() => {
              props.setEditTicket(false);
              props.resetSetters();
            }}
          />
          <Button
            content='Add Ticket'
            labelPosition='right'
            icon='add'
            positive
            disabled={!(props.newTicketTitle && props.newTicketContent)}
            onClick={() => {
              props.setEditTicket(false);
              props.onAddTicket();
            }}
          />
        </Modal.Actions>
      </Modal>
    );
  } else return null;
};

export default AddTicketView;
