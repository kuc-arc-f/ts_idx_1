import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import Dexie from 'dexie';
import LibBook from '../../lib/LibBook';
import LibDexie from '../../lib/LibDexie';

const CONFIG = LibBook.get_const()
interface IProps {
  history:string[],
}
interface IState {
  data: Array<any>
}
//
class BookIndex extends Component<IProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any) {
    super(props);
    this.state = {data: []}
  }
  componentDidMount(){
    this.db = new Dexie( CONFIG.DB_NAME );
    this.db.version(CONFIG.DB_VERSION).stores(CONFIG.DB_STORE );
    this.get_items()        
  }
  get_items(){
    const self = this
    this.db.books.toArray().then(function (items: Array<any> ) {
      const tasks = LibDexie.get_reverse_items(items)
      self.setState({ data: tasks })
//console.log( tasks )
    });
  }
  tabRow(){
    if(this.state.data instanceof Array){
      return this.state.data.map(function(object, i){
        return <IndexRow obj={object} key={i} />
      })
    }
  }
  render(){
    return (
    <div className="container">
      <h3>Book - index</h3>
      <hr className="mt-2 mb-2" />
      <div className="row mb-2">
        <div className="col-md-6">
          <Link to="/book_create"
            className="btn btn-sm btn-primary">+ Create
          </Link>
        </div>
        <div className="col-md-6">
        </div>
      </div>
      <table className="table table-hover">
        <thead>
        <tr>
          <th>ID</th>
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
export default BookIndex;

