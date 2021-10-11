
import  {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../lib/LibTask';
const CONFIG = LibTask.get_const();

interface IProps {
  history:string[],
}
interface IState {
  title: string,
  content: string,
  id: number,
}
class TaskCreate extends Component<IProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any){
    super(props)
    this.state = {title: '', content: '', id: 0};
  }
  componentDidMount(){
    this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );
  }
  handleClick(){
    console.log("#-handleClick");
    this.add_item();
//        console.log( this.state )
  }
  add_item(){
    console.log("addItem");
    const title = document.querySelector<HTMLInputElement>('#title');
    const content = document.querySelector<HTMLInputElement>('#content');
    const task = {
      title: title.value,
      content: content.value,
      created_at: new Date(),
    }
    this.db.tasks.add( task);
    console.log( task );
    this.props.history.push("/tasks");
  }
  render() {
    return (
    <div className="container">
      <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />
      <h1 className="mt-2">Create - Task</h1>
      <div className="row">
        <div className="col-md-6">
          <label>Title:</label>
          <input type="text" className="form-control" name="title" id="title"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>Content:</label>
          <input type="text" className="form-control" name="content" id="content"
            />
        </div>
      </div>
      <div className="form-group mt-2">
        <button className="btn btn-primary" onClick={() => this.handleClick()}>
          Create
        </button>
      </div>
    </div>
    )
  }
}
export default TaskCreate;
