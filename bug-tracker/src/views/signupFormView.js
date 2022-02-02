import { Segment, Button, Form, Grid, Header, Image, Message } from 'semantic-ui-react';
import ROUTES from '../localization/routes';
const SignupFormView = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  signup,
  error,
  loading,
}) => {
  const notValidEmail = () => {
    return email.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };
  return (
    <Segment>
      <Grid textAlign='center' className='sign-up-grid' verticalAlign='middle'>
        <Grid.Column className='sign-up-column'>
          <Header as='h2' color='black' textAlign='center'>
            <Image src='logo192.png' alt='bug-tracker-icon' />
            Sign up
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                error={notValidEmail()}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password > 5 characters'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={password.length < 6}
              />
              <Form.Input
                fluid
                icon='repeat'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                error={password !== confirmPassword}
              />
              {error && (
                <Message negative size='mini'>
                  <Message.Header>Could not sign up</Message.Header>
                  <p>Try again!</p>
                </Message>
              )}
              <Button
                color='green'
                fluid
                size='large'
                onClick={signup}
                disabled={password !== confirmPassword || notValidEmail() || password.length < 6}
                loading={loading}
              >
                Sign up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <a href={ROUTES.LOGIN_PATH}>Login</a>
          </Message>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default SignupFormView;
