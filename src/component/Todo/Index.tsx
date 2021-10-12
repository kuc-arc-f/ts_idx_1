import {Component} from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import Dexie from 'dexie';
import LibTodo from '../../lib/LibTodo';
import LibDexie from '../../lib/LibDexie';

const CONFIG = LibTodo.get_const()
//
interface IProps {
  history:string[],
}
interface IState {
  data: Array<any>,
  type: number,
  items_org: Array<any>,
}
class TodoIndex extends Component<IProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any) {
    super(props);
    this.state = {data: [], type: 0, items_org: [] }
  }
  componentDidMount(){
    this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );
    this.get_items(0)                
  }
  handleClickTypeNone(){
    this.setState({ type: 0 })
// console.log(this.state.type )
    this.get_items(0)
    this.change_complete_tab(0)
  }
  handleClickTypeComplete(){
    this.setState({ type: 1 })
// console.log(this.state.type )
    this.get_items(1)
    this.change_complete_tab(1)
  }
  change_complete_tab(type: number){
console.log( type )
    /*
      $('#nav_complete_none_tab').removeClass('active');
      $('#nav_complete_tab').removeClass('active');
      if(type === 1){
          $('#nav_complete_tab').addClass('active');
      }else{
          $('#nav_complete_none_tab').addClass('active');
      }
    */
  }
  async get_items(type: number){
console.log( type )
    let data = await this.db.todos.where({complete: type }).toArray();
console.log( data )
    data = LibDexie.get_reverse_items(data) 
//    this.setState({ data: data})   
    const items = await this.db.todos.toArray();    
    this.setState({
      data: data, items_org: items 
    });
  }
  handleClickExport(){
    console.log("#-handleClickExport")
    const content = JSON.stringify( this.state.items_org );
console.log(content)
    const blob = new Blob([ content ], { "type" : "application/json" });
    const fname = "todos.json"
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
  tabRow(){
    if(this.state.data instanceof Array){
      return this.state.data.map(function(object: any, i){
        return <IndexRow obj={object} key={i} />
      })
    }
  }
  render(){
    return (
    <div className="container">
      <h3>Todo - index</h3>
      <div className="row">
        <div className="col-md-6">
          <Link to="/todo_create"
            className="btn btn-sm btn-primary">+ Create
          </Link>
        </div>
        <div className="col-md-6">
          <a id="download" href="" download="todos.json" onClick={() => this.handleClickExport()}
            className="btn btn-outline-primary btn-sm">Export
          </a> 
          <Link to="/todo_import"  target="_blank"
            className="btn btn-sm btn-outline-primary ml-2">Import
          </Link>
        </div>
      </div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className="nav-link active" id="nav_complete_none_tab"
          onClick={() => this.handleClickTypeNone()} >未完
          </button>                    
        </li>
        <li className="nav-item">
          <button className="nav-link" id="nav_complete_tab"
          onClick={() => this.handleClickTypeComplete()} >完了
          </button>                    
        </li>
      </ul>
      <table className="table table-hover">
        <thead>
        <tr>
          <th>Title</th>
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
export default TodoIndex;
