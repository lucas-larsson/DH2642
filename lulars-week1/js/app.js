function RenderTest(){ console.log("Vue sub-component render test"); return false; }
function App(props){
    return  (
        <div>
            <SidebarPresenter model={props.model}  />
            <SummaryPresenter model={props.model}  />
            <RenderTest />
        </div>
    );
}
