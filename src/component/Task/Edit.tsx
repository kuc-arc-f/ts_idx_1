
import  {Component} from 'react';
import { Link , RouteComponentProps} from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../lib/LibTask';
const CONFIG = LibTask.get_const()
//
interface IProps {
  history:string[],
}
type PageProps = IProps & RouteComponentProps<{id: string}>;
interface IState {
  title: string,
  content: string,
  id: number,
}
//
class TaskEdit extends Component<PageProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any) {
    super(props);
    this.state = {title: '', content: '', id: 0};
  }
  componentDidMount(){
    const id  = Number(this.props.match.params.id)
    this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );
    this.get_item(id);
    this.setState({ id: id });          
  }
  async get_item(id: number){
    const item = await this.db.tasks.get(id);
    this.setState({ 
        title: item.title, 
        content: item.content
    });        
console.log(item);                          
  }
  update_item(){
    const title = document.querySelector<HTMLInputElement>('#title');
    const content = document.querySelector<HTMLInputElement>('#content');
    const item = {
      title: title.value,
      content: content.value,
    }
console.log( item )
    this.db.tasks.update(this.state.id , item);
    this.props.history.push("/tasks");
  }    
  handleClickDelete(){
//        console.log("#-handleClickDelete")
    this.db.tasks.delete(this.state.id);
    this.props.history.push("/tasks");
  }
  handleClick(){
    console.log("#-handleClick")
    this.update_item()
//        console.log( this.state )
  }        
  render(){
    return (
    <div className="container">
      <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />            
      <h1>Edit - task</h1>
      <div className="form-group col-md-6">
        <label>Title</label>
        <input type="text" name="title" id="title"
        className="form-control" defaultValue={this.state.title}/>
      </div>
      <div className="form-group col-md-6">
        <label>Content</label>
        <input type="text" className="form-control" name="content" id="content"
        defaultValue={this.state.content} />
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={() => this.handleClick()}>Save
        </button>
      </div>
      <hr />
      <div className="form-group">
        <button className="btn btn-outline-danger btn-sm mt-2"
        onClick={() => this.handleClickDelete()}>Delete
        </button>
      </div>
    </div>
    )
  }
}
export default TaskEdit;