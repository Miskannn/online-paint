import Main from './pages/MainPage';
import './styles/App.scss'
import {BrowserRouter,Switch,Route,Redirect} from "react-router-dom"



const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = '/:id'>
          <Main id = "/:id"/>
        </Route>
        <Redirect to={`f${(+new Date).toString(16)}`}/>
      </Switch>  
    </BrowserRouter>
  )
}

export default App;
