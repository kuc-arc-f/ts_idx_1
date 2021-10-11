import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
//import './App.css';

import Home from './component/Home';
import Test from './component/Test';
import Navbar from './component/Navbar';
/* tasks */
import TaskIndex from './component/Task/Index';
import TaskShow from './component/Task/Show';
import TaskCreate from './component/Task/Create';
import TaskEdit from './component/Task/Edit';
import TaskImportTask from './component/Task/ImportTask';
//
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route path='/test' component={Test} />
          {/* tasks */}
          <Route exact path='/tasks' component={TaskIndex}/>
          <Route exact path='/task_create' component={TaskCreate}/>
          <Route path='/task_show/:id' component={TaskShow}/>
          <Route path='/task_edit/:id' component={TaskEdit}/>
          <Route exact path='/task_import' component={TaskImportTask}/>
        </div>
      </Router>
    </div>
  );
}
export default App;
