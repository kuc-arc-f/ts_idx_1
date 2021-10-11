import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import Dexie from 'dexie';
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
const CONFIG = LibTask.get_const()

interface IProps {
  history:string[],
}
interface IState {
  data: Array<any>
}
//
class Index extends Component<IProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any) {
      super(props);
      this.state = {data: [] }
  }
  componentDidMount(){
console.log(CONFIG.DB_NAME);
    this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );
    this.get_items()        
  }
  get_items(){
    const self = this
    this.db.tasks.toArray().then(function (items : any[]) {
        const tasks = LibDexie.get_reverse_items(items)
        self.setState({ data: tasks })
console.log( tasks )
    });
  }
  tabRow(){
      if(this.state.data instanceof Array){
          return this.state.data.map(function(object: any, i: number){
          return <IndexRow obj={object} key={i} />
          })
      }
  }
  handleClickExport(){
    console.log("handleClickExport");
    const content = JSON.stringify( this.state.data );
// console.log(content)
    const blob = new Blob([ content ], { "type" : "application/json" });
    const fname = "tasks.json"
    const navi: any = window.navigator;
    if (navi.msSaveBlob) { 
      console.log("#-msSaveBlob")
      navi.msSaveBlob(blob, fname ); 
      navi.msSaveOrOpenBlob(blob, fname ); 
    } else {
      console.log("#-msSaveBlob-false")
      const element = document.querySelector<HTMLAnchorElement>('#download');
      element.href = window.URL.createObjectURL(blob);
    }    
  }
  render(){
    return (
    <div className="container">
      <h3>Task - index</h3>
      <div className="row">
        <div className="col-md-6">
          <Link to="/task_create"
            className="btn btn-sm btn-primary">+ Create
          </Link>
        </div>
        <div className="col-md-6">
          <a id="download" href="" download="tasks.json" onClick={() => this.handleClickExport()}
            className="btn btn-outline-primary btn-sm">Export
          </a> 
          <Link to="/task_import" target="_blank"
            className="btn btn-sm btn-outline-primary ml-2">Import
          </Link>
        </div>
      </div><br />
      <table className="table table-hover">
          <thead>
          <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Conent</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
              {this.tabRow()}
          </tbody>
      </table>
    </div>
    )
  }
}

export default Index;

