import {
  Menu,
  Image,
  Search,
  Header,
  Icon,
  Button,
  Modal,
  Statistic,
  Popup,
  Grid,
  Segment,
  Message,
  List,
} from 'semantic-ui-react';
import { getTitle, getUsers } from '../utils';
import { connect } from 'react-redux';
import React from 'react';
import dayjs from 'dayjs';
import { AddTicketView } from '.';
import routes from '../localization/routes';

const MainNavView = props => {
  const hitBoardLimit = props.userProjects.length > 9;
  const pathname = window.location.pathname;
  const userList = getUsers(props?.users);
  const userCount = userList?.length;
  return (
    <Menu stackable icon borderless className='no-bottom-margin'>
      <Menu.Item>
        <Image href={routes.HOME_PATH} src='logo192.png' alt='bug-tracker-icon' size='mini' />
      </Menu.Item>
      <Menu.Menu>
        <div className='ui right aligned category search item'>
          <div className='ui transparent icon input'>
            {pathname !== routes.BOARD_PATH && pathname !== routes.ABOUT_PATH && (
              <Search
                loading={props.loading}
                error={props.error}
                results={props.searchResult}
                onSearchChange={e => props.search(e.target.value)}
                onResultSelect={(e, data) => {
                  props.setSelectedSearchResult(data.result);
                  props.setCheckProject(true);
                }}
              />
            )}
            <Modal
              onClose={() => props.setCheckProject(false)}
              onOpen={() => props.setCheckProject(true)}
              open={props.openProject}
            >
              <Header as='h1' textAlign='center'>
                {getTitle(props.selectedSearchResult?.title)}
              </Header>
              <Modal.Content>
                <Grid width={12} stackable>
                  <Grid.Column width={2}>
                    <Image size='medium' src={props.selectedSearchResult?.image} wrapped />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Segment basic>
                      <Header
                        floated='right'
                        icon='calendar alternate outline'
                        size='small'
                        content={dayjs(new Date(props.selectedSearchResult?.created_at?.slice(0, -10))).format(
                          'DD/MM/YYYY'
                        )}
                      />
                      <Header floated='left' as='h3'>
                        Description
                      </Header>
                    </Segment>
                    <Segment basic as='p'>
                      {props.selectedSearchResult?.description
                        ? props.selectedSearchResult?.description
                        : 'No description was found'}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Segment textAlign='right'>
                      <Header as='h5'>
                        {props.selectedSearchResult?.language} <Icon name='language' />
                      </Header>
                      <Header as='h5'>
                        {props.selectedSearchResult?.issue_count > 0
                          ? props.selectedSearchResult?.issue_count + ' Issues '
                          : 'No open issues'}
                        <Icon name='folder open outline' flipped='horizontally' />
                      </Header>
                      <Statistic size='mini' className='main-nav-statistic'>
                        <Statistic.Value size='tiny'>
                          {props.selectedSearchResult?.forks}
                          <Icon name='fork' flipped='horizontally' />
                        </Statistic.Value>
                        <Statistic.Label size='small'>Forks</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </Grid.Column>
                </Grid>
                {hitBoardLimit && (
                  <Message
                    warning
                    icon='warning sign'
                    size='small'
                    header='You have reached maximum amount of boards'
                    content='Remove a board.'
                  />
                )}
              </Modal.Content>
              <Modal.Actions>
                <Button color='black' onClick={() => props.setCheckProject(false)}>
                  Cancel
                </Button>
                <Button
                  content='Add Project'
                  labelPosition='right'
                  icon='add'
                  disabled={hitBoardLimit}
                  onClick={() => {
                    props.setCheckProject(false);
                    props.addBoard(props.selectedSearchResult);
                  }}
                  positive
                />
              </Modal.Actions>
            </Modal>
          </div>
        </div>
      </Menu.Menu>
      <Menu.Item fitted='vertically'>
        <AddTicketView {...props} />
      </Menu.Item>

      {pathname === routes.BOARD_PATH && (
        <Menu.Item>
          <Popup
            item
            on='click'
            hoverable
            mouseLeaveDelay={1000}
            trigger={<Button size='big' circular icon='users' content={userCount} />}
          >
            <Popup.Header>
              <Segment vertical>Users in this project</Segment>
            </Popup.Header>
            <Popup.Content>
              {userList ? <List divided items={userList.map(u => u?.value)} /> : 'Where did eveyone go?'}
            </Popup.Content>
          </Popup>
        </Menu.Item>
      )}
      {pathname === routes.BOARD_PATH && (
        <Menu.Item header as='h3' size content={props.boardName || ''} className='main-nav-item-center' />
      )}
      <Menu.Item position='right'>
        <Popup
          className='popup-menu'
          item
          hoverable
          on='hover'
          mouseLeaveDelay={1000}
          trigger={
            <Button circular basic>
              <Icon name='user' />
              <strong>{props.user?.name}</strong>
            </Button>
          }
        >
          <Popup.Content>
            <Menu vertical>
              <Menu.Item
                className='sign-out-menu-item'
                content={
                  <span>
                    Signed in as <strong>{props.user?.email}</strong>
                  </span>
                }
                disabled
              />
              <Menu.Item className='sign-out-menu-item'>
                <Button onClick={props.signOut}>
                  <Icon name='sign out' />
                  <strong>Sign Out</strong>
                </Button>
              </Menu.Item>
            </Menu>
          </Popup.Content>
        </Popup>
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    user: state.userState.user,
    users: state.boardState.board.members,
    boardName: state.boardState.board.boardName,
    userProjects: state.userProjectsState.userProjects,
  };
};

export default connect(mapStateToProps)(MainNavView);
