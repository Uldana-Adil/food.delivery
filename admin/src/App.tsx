import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Aside from './components/aside/Index';
import { useStores } from './store/MobXProvider';
import LoginPage from './pages/auth/Index';
import { observer } from 'mobx-react-lite';

function App() {

  const { authStore } = useStores()

  return (
    <div className='body-container'>


      <BrowserRouter>
        {
          authStore.isAuth ? <>
            <Aside />
            <main>
              <Container className='ms-0 py-4'>
                <Router />
              </Container>
            </main>
          </> :
            <LoginPage />
        }
      </BrowserRouter>

    </div>
  );
}

export default observer(App);
