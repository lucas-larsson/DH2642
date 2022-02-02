function SidebarView(props){
    return(
        <div>
            <button onClick={ event=> props.setGuests(props.guests-1)} disabled={props.guests <=  1}>-</button>
            {props.guests}
            <button onClick={ event=> props.setGuests(props.guests+1)}>+</button>
        </div>
    );
}