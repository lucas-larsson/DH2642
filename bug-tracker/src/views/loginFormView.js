import { Segment, Button, Form, Grid, Header, Image, Message } from 'semantic-ui-react'
import ROUTES from '../localization/routes'
const LoginFormView = ({ login, setEmail, setPassword, loading, error }) => {
  return (
    <Segment>
      <Grid textAlign='center' className='login-grid' verticalAlign='middle'>
        <Grid.Column className='login-column'>
          <Header as='h2' color='black' textAlign='center'>
            <Image src='logo192.png' alt='bug-tracker-icon' />
            Login to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                onChange={(e) => setEmail(e.target.value)}
                error={error}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                error={error}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Message negative size='mini'>
                  <Message.Header>Could not sign in</Message.Header>
                  <p>Try a different email/password</p>
                </Message>
              )}

              <Button color='green' fluid size='large' onClick={login} loading={loading}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account? <a href={ROUTES.SIGNUP_PATH}>Sign up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default LoginFormView
