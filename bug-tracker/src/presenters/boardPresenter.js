import { useState, useEffect } from 'react';
import { BoardView } from '../views';
import { useBoardState, usePromise } from '../hooks';
import { getBoard } from '../api/firebase';
import { AsyncDataWrapper } from '.';
import { Ticket } from '../core';

const BoardPresenter = () => {
  // State
  const { board } = useBoardState();
  const [promise, setPromise] = useState(null);
  const boardId = JSON.parse(localStorage.getItem('boardId'));
  const [data, err] = usePromise(promise);

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketContent, setTicketContent] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');
  const [ticketPriority, setTicketPriority] = useState('');
  const [ticketAssignedUser, setAssignedUser] = useState('');
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  useEffect(() => {
    if (data) board.setBoard(data);
  }, [data]);

  useEffect(() => {
    setPromise(getBoard(boardId));
  }, []);

  const editTicket = () => {
    if (!selectedTicket) return;
    const updatedTicket = new Ticket(
      ticketTitle ? ticketTitle : selectedTicket.title,
      ticketContent ? ticketContent : selectedTicket.content,
      (ticketStatus !== null && ticketStatus !== '') ? ticketStatus : selectedTicket.status,
      ticketPriority ? ticketPriority : selectedTicket.priority,
      ticketAssignedUser ? ticketAssignedUser : selectedTicket.userId,
      selectedTicket.createdAt,
      new Date(),
      selectedTicket.id
    );
    board.addTicket(updatedTicket);
    setSelectedTicket(null);
    setTicketTitle('');
    setTicketContent('');
    setTicketStatus('');
    setTicketPriority('');
  };

  const removeTicket = ticketId => {
    board.removeTicket(ticketId);
  };

  return (
    <AsyncDataWrapper data={data} error={err}>
      <BoardView
        selectedTicket={selectedTicket}
        ticketStatus={ticketStatus}
        onSetSelectedTicket={setSelectedTicket}
        onSetTicketContent={setTicketContent}
        onSetTicketStatus={setTicketStatus}
        onSetTicketPriority={setTicketPriority}
        onSetTicketTitle={setTicketTitle}
        onSetAssignedUser={setAssignedUser}
        onConfirmEdit={editTicket}
        removeTicket={removeTicket}
        firstOpen={firstOpen}
        setFirstOpen={setFirstOpen}
        secondOpen={secondOpen}
        setSecondOpen={setSecondOpen}
      />
    </AsyncDataWrapper>
  );
};

export default BoardPresenter;
