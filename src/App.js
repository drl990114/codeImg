import { Header } from './components/header'
import { Edit } from './components/edit'
import { Banner } from './components/banner'

function App() {
  return (
    <>
      <Header />
      <div style={{
        minWidth: '600px',
        padding: '0 50px 30px 50px',
        border: '1px solid white',
        minHeight:'300px'
      }}><Edit /></div>
      <Banner />
    </>

  );
}

export default App;
