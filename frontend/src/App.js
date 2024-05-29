import './App.css';
import { Container } from 'reactstrap';
import AppRoutes from './routes';
import { ContextWrapper } from './user-context';

function App() {
  return (
    <ContextWrapper>
      <Container>
          
          <h1>Purchase Planner</h1>
          <div className='content'>
            <AppRoutes />
          </div>

      </Container>
    </ContextWrapper>
  );
}

export default App;
