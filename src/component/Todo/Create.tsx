
import  {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTodo from '../../lib/LibTodo';
const CONFIG = LibTodo.get_const();

interface IProps {
  history:string[],
}
interface IState {
  title: string,
  content: string,
}
//
class Create extends Component<IProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any){
    super(props)
    this.state = {title: '', content: ''}
  }
  componentDidMount(){
    this.db.version(CONFIG.DB_VERSION).stores(CONFIG.DB_STORE);
  }
  add_item(){
    const title = document.querySelector<HTMLInputElement>('#title');
    const content = document.querySelector<HTMLInputElement>('#content');    
    const item = {
      title: title.value,
      content: content.value,
      complete: 0,
      created_at: new Date(),
    }
    this.db.todos.add( item )
//        console.log( task )
    this.props.history.push("/todos");
  }
  handleClick(){
    console.log("#-handleClick")
    this.add_item()
  }
  render() {
    return (
    <div className="container">
      <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />
      <h1 className="mt-2">Todo - Create</h1>
      <div className="form-group">
        <label>Title:</label>
        <div className="col-sm-6">
          <input type="text" className="form-control" name="title" id="title"
          />                    
        </div>
      </div>
      <div className="form-group">
        <label>Content:</label>
        <div className="col-sm-10">
          <textarea className="form-control" rows={10} name="content" id="content"
          ></textarea>
        </div>
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={() => this.handleClick()}>Create
        </button>
      </div>
    </div>
    )
  }
}
export default Create;

