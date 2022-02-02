function SearchFormView(props) {
    return(
        <div>
            <input onChange={ e=> props.onText(e.target.value) }/>
            <select onChange={ e=> props.onDishType(e.target.value) }>
                <option>Choose:</option>
                {props.options.map(
                    function(opt){return(<option>{opt}</option>)})}
            </select>
            <button onClick={ event=> props.onSearch() } >Search!</button>
        </div>
    )

}