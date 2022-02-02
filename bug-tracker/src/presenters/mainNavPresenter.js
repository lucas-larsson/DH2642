import { useState } from 'react';
import _ from 'lodash';
import { transformSearchResult } from '../utils';
import { searchRepositories } from '../api/github';
import { signOutUser } from '../api/firebase';
import { MainNavView } from '../views';
import { useUserState, useBoardState } from '../hooks';
import { Ticket } from '../core';
import { useNavigate } from 'react-router-dom';
import routes from '../localization/routes';

const MainNavPresenter = () => {
  // Searching for github projects
  const { user } = useUserState();
  const { board } = useBoardState();
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticketTitle, setTitle] = useState('');
  const [ticketPriority, setPriority] = useState('');
  const [ticketContent, setContent] = useState('');
  const [ticketAssignedUser, setAssignedUser] = useState('');
  const [selectedSearchResult, setSelectedSearchResult] = useState(null);
  const [openTicket, setEditTicket] = useState(false);
  const [openProject, setCheckProject] = useState(false);

  //only do a search if the user has stopped typing for 0.25 second and has more than 1 character
  const debouncedSearch = _.debounce(async query => {
    if (query.length < 2) return;
    setLoading(true);
    try {
      const result = await searchRepositories(query);
      setSearchResult(transformSearchResult(result));
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }, 250);

  // Log out
  const signOut = async () => {
    try {
      signOutUser();
    } catch (error) {
      console.error(error);
    }
  };

  const resetSetters = () => {
    setTitle('');
    setContent('');
    setPriority('');
    setAssignedUser('');
  }

  const addTicket = () => {
    if (ticketTitle && ticketContent) {
      let newTicket = new Ticket(
        ticketTitle,
        ticketContent,
        1,
        ticketPriority ? ticketPriority : 1,
        ticketAssignedUser ? ticketAssignedUser : user.activeUser.name,
        new Date(),
        new Date()
      );
      board.addTicket(newTicket);
      resetSetters();
    }
  };

  const addBoard = meta => {
    board.setBoardMeta(meta);
  };

  return (
    <MainNavView
      search={debouncedSearch}
      searchResult={searchResult}
      user={user}
      error={error}
      loading={loading}
      returnToHome={() => navigate(routes.HOME_PATH, { replace: true })}
      signOut={signOut}
      addBoard={addBoard}
      selectedSearchResult={selectedSearchResult}
      setSelectedSearchResult={setSelectedSearchResult}
      openTicket={openTicket}
      setEditTicket={setEditTicket}
      openProject={openProject}
      setCheckProject={setCheckProject}
      // Adding tickets
      onSetAssignedUser={setAssignedUser}
      onSetTitle={setTitle}
      onSetPriority={setPriority}
      onSetContent={setContent}
      onAddTicket={addTicket}
      resetSetters={resetSetters}
      newTicketTitle={ticketTitle}
      newTicketContent={ticketContent}
    />
  );
};

export default MainNavPresenter;
