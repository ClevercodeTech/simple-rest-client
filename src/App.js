import './App.css';
import Requestform from './components/requestform';

import { useState } from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import { Grid } from '@mui/material';
function App() {
 

  return (

    <Grid container>
      <Grid item xs={12} sm={12} md={12} >
        <Header />
      </Grid>
      <Grid item xs={2} sm={3} md={3} >
        <Sidebar />
      </Grid>
      <Grid item xs={10} sm={9} md={9} >
        <Requestform />
      </Grid>
    </Grid>

  );
}

export default App;
