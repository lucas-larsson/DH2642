import { Message, Icon, Segment, Placeholder, Dimmer, Loader } from 'semantic-ui-react';
import { range } from 'lodash';

const AsyncDataWrapper = ({ data, error, children }) => {
  if (data === null) {
    return (
      <Segment className='async-data-wrapper-loading'>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Placeholder>
          {range(0, 14).map(i => {
            return i % 2 === 0 ? (
              <Placeholder.Header key={i}>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            ) : (
              <Placeholder.Paragraph key={i}>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            );
          })}
        </Placeholder>
      </Segment>
    );
  }

  if (error) {
    return (
      <Segment className='async-data-wrapper-error'>
        <Message color='red'>
          <Icon name='exclamation circle' />
          Gick ej att hämta data
        </Message>
      </Segment>
    );
  }

  return children;
};

export default AsyncDataWrapper;
