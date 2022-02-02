import { groupInfo } from '../localization/groupInfo';
import { Button, Grid, Segment, Container, Image, Header, List, Tab } from 'semantic-ui-react';
import routes from '../localization/routes';

// constant containing the semantic-ui Tab items
const panes = groupInfo.map(p => {
  const obj = {};
  obj.menuItem = p.name;

  // Make border none for the tabs
  obj.render = () => {
    return (
      <Tab.Pane inverted className='tab-pane'>
        <List link inverted>
          <div>
            <span>
              <List.Item href={'tel:+' + p.tel}>{p.telTxt}</List.Item>
              <List.Item href={p.gitHub} target='_blank'>
                {' '}
                <Button className='asfasf' inverted circular floated='right' icon='github' />
              </List.Item>
            </span>
          </div>
          <div>
            <span>
              <List.Item href={'mailto:' + p.mail}>{p.mail}</List.Item>
              <List.Item href={p.linkdin} target='_blank'>
                {' '}
                <Button inverted circular floated='right' icon='linkedin' />
              </List.Item>
            </span>
          </div>
        </List>
      </Tab.Pane>
    );
  };
  return obj;
});

const FooterView = () => {
  return (
    <Segment className='board-footer' vertical inverted>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={6}>
              <Segment inverted size='mini'>
                <Header inverted as='h2' className='logo-header'>
                  <Image centered size='large' src='logo192.png' /> Bug Tracker
                </Header>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Container as='div'>
                <Button color='black' href={routes.ABOUT_PATH} size='large'>
                  About
                </Button>
                <Button color='black' href='https://gits-15.sys.kth.se/denhad/bug-tracker' target='_blank' size='large'>
                  Github
                </Button>
              </Container>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment inverted>
                <Header inverted as='h4' content='Contact' />
                <Tab menu={{ inverted: true, secondary: true, pointing: true }} panes={panes} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <p className='copyright'>Group 12 © 2021 - all rights reserved</p>
        </Grid>
      </Container>
    </Segment>
  );
};

export default FooterView;
