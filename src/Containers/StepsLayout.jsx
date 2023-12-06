import './StepsLayout.css';
import { Welcome } from '../Components/Welcome';
import { Tickets } from '../Components/Tickets';
import { Passengers } from '../Components/Passengers';
import { Search } from '../Components/Search';

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if (state.matches('initial')) return <Welcome send={send}/>
    if (state.matches('search')) return <Search send={send} state={state}/>
    if (state.matches('passengers')) return <Passengers send={send} state={state} />   
    if (state.matches('tickets')) return <Tickets send={send} context={state.context}/>   
    return null;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}; 