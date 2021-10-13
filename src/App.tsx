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
/* todos */
import TodoIndex from './component/Todo/Index';
import TodoCreate from './component/Todo/Create';
import TodoShow from './component/Todo/Show';
import TodoEdit from './component/Todo/Edit';
import TodoImport from './component/Todo/ImportData';
/* book */
import BookIndex from './component/Book/Index';
import BookCreate from './component/Book/Create';
import BookEdit from './component/Book/Edit';
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
          {/* todos */}
          <Route exact path='/todos' component={TodoIndex}/>
          <Route exact path='/todo_create' component={TodoCreate}/>
          <Route path='/todo_show/:id' component={TodoShow}/>
          <Route path='/todo_edit/:id' component={TodoEdit}/>
          <Route path='/todo_import' component={TodoImport}/>
          {/* books */}
          <Route exact path='/books' component={BookIndex}/>
          <Route path='/book_create' component={BookCreate}/>
          <Route path='/book_edit/:id' component={BookEdit}/>
          
        </div>
      </Router>
    </div>
  );
}
export default App;
