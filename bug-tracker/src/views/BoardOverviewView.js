import { Card, Image, Icon, Button, Form, Popup } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';

import { getDescription, getTitle } from '../utils';

const BoardOverviewView = ({ onBoardClicked, image, board, index, removeBoard }) => {
  return (
    <Card
      fluid
      onClick={e => {
        const tagName = e.target.tagName;
        if (tagName !== 'BUTTON') {
          onBoardClicked(board);
        }
      }}
      className='home-card'
    >
      <Image src={image[index]} className='card-image' />
      {board[1].meta && (
        <Card.Content>
          <Card.Header className='card-header'>
            {getTitle(board[1].boardName)}{' '}
            <Card.Content extra>
              <Form>
                <Popup
                  content={'Copied!'}
                  trigger={
                    <Button
                      content='Copy SSH'
                      icon='terminal'
                      size='mini'
                      onClick={() => copy(board[1].meta.ssh_url)}
                    />
                  }
                  on='click'
                  hideOnScroll
                  closeOnTriggerMouseLeave
                  mouseLeaveDelay={1000}
                  inverted
                />
              </Form>
            </Card.Content>
          </Card.Header>
          <Card.Meta className='card-header'>
            <Card.Content>
              <Icon name='calendar alternate outline' />{' '}
              {dayjs(new Date(board[1]?.meta?.created_at?.slice(0, -10))).format('DD/MM/YYYY')}
            </Card.Content>
            <Popup
              content={'Copied!'}
              trigger={
                <Button content='Copy HTTP' icon='terminal' size='mini' onClick={() => copy(board[1]?.meta?.html_url)}/>
              }
              on='click'
              hideOnScroll
              closeOnTriggerMouseLeave
              mouseLeaveDelay={1000}
              inverted
            />
          </Card.Meta>
          <Card.Meta className='card-header'>
            <Card.Content>
              <Icon name='fork' />
              {board[1].meta.forks ? board[1]?.meta?.forks : ' No forks created'}
            </Card.Content>
            <Card.Content>
              {board[1]?.meta?.issue_count ? board[1]?.meta?.issue_count + ' Issues ' : ' No open issues'}
              <Icon name='folder open outline' />
            </Card.Content>
          </Card.Meta>
          <Card.Description>{getDescription(board[1]?.meta?.description)}</Card.Description>
        </Card.Content>
      )}
      <Button
        icon='trash alternate outline'
        onClick={() => {
          removeBoard(board[0]);
        }}
      />
    </Card>
  );
};

export default BoardOverviewView;
