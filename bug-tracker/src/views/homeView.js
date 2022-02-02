import { connect } from 'react-redux';
import { Grid, Container, Message } from 'semantic-ui-react';
import { BoardOverviewView } from '.';

import image0 from '../images/Background_0.png';
import image1 from '../images/Background_1.png';
import image2 from '../images/Background_2.png';
import image3 from '../images/Background_3.png';
import image4 from '../images/Background_4.png';
import image5 from '../images/Background_5.png';
import image6 from '../images/Background_6.png';
import image7 from '../images/Background_7.png';
import image8 from '../images/Background_8.png';
import image9 from '../images/Background_9.png';

const HomeView = ({ boards, onBoardClicked, removeBoard }) => {
  // Modal state
  let image = [image0, image1, image2, image3, image4, image5, image6, image7, image8, image9];


  const getWidth = index => {
    if (boards.length === 1) return 16;
    else if (boards.length % 2 === 1 && index === boards.length - 1) return 16;
    else return 8;
  };

  return (
    <Container className='home-container'>
      
      {boards.length > 0 ? (
        <Grid className='home-grid' stackable>
          {boards.map((board, index) => {
            return (
              <Grid.Column width={getWidth(index)} key={`board-${board[0]}`} className='home-board-column'>
                <BoardOverviewView
                  onBoardClicked={onBoardClicked}
                  image={image}
                  board={board}
                  index={index}
                  removeBoard={removeBoard}
                />
              </Grid.Column>
            );
          })}
        </Grid>
      ) : (
        <div className='message-container'>
          <Message
            warning
            header="You don't have any boards!"
            content='Add a new board by searching for a repository on GitHub in searchbar.'
          />
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    boards: state.userProjectsState.userProjects,
  };
};

export default connect(mapStateToProps)(HomeView);
