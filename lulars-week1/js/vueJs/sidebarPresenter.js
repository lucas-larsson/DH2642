function SidebarPresenter(props){   // assume a model prop
    return <SidebarView guests={props.model.numberOfGuests}
                        setGuests= { x=>props.model.numberOfGuests = x }
    />
}