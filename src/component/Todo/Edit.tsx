
import  {Component} from 'react';
import { Link ,RouteComponentProps } from 'react-router-dom';
import Dexie from 'dexie';
import LibTodo from '../../lib/LibTodo';
const CONFIG = LibTodo.get_const()

interface IProps {
    history:string[],
  }
type PageProps = IProps & RouteComponentProps<{id: string}>;
interface IState {
  title: string,
  content: string,
  type: number,
  created_at: string,
  complete_btn_name: string,
  id: number,
}
//
class Edit extends Component<PageProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any) {
    super(props);
    this.state = {
      title: '', content: '',
      type: 0, complete_btn_name: "完了登録",
      id: 0, created_at: ''
    };
  }
  componentDidMount(){
      const id  = parseInt(this.props.match.params.id)
      this.setState({ id: id });
      this.db = new Dexie( CONFIG.DB_NAME );
      this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );         
      this.get_item(id);
  }
  async get_item(id: number){
    const item = await this.db.todos.get(id);
    let btn_name = "完了登録"
    let complete_type = 0
    if(item.complete === 1){
      btn_name = "未完に戻す"
      complete_type = 1
    }
    this.setState({ 
      title: item.title, 
      content: item.content,
      complete_btn_name: btn_name,
      type: complete_type
    });        
console.log(item);                          
  }
  update_item(){
    const title = document.querySelector<HTMLInputElement>('#title');
    const content = document.querySelector<HTMLInputElement>('#content');    
    this.db.todos.update(this.state.id , {
      title: title.value,
      content: content.value,
    });
    this.props.history.push("/todos");
  }    
  handleClickComplete(){
//console.log( this.state.type )
    let value= 0
    if(this.state.type === 0){
        value = 1
    }
    this.db.todos.update(this.state.id , {
      complete: value,
    });
    this.props.history.push("/todos");
  }
  handleClickDelete(){
//        console.log("#-handleClickDelete")
    this.db.todos.delete(this.state.id);
    this.props.history.push("/todos");
  }
  handleClick(){
    console.log("#-handleClick")
    this.update_item()
//        console.log( this.state )
  }        
  render(){
    return (
    <div className="container pb-4">
      <Link to="/todo" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />            
      <h1>Todo - Edit</h1>
      <div className="row">
        <div className="col-md-10"></div>
        <div className="col-md-2"></div>
      </div>
      <div className="form-group">
        <label>Title</label>
        <div className="col-sm-6">
          <input type="text" className="form-control" name="title" id="title"
           defaultValue={this.state.title}
            />
        </div>
      </div>
      <div className="form-group">
        <label>Content:</label>
        <div className="col-sm-10">
          <textarea className="form-control" defaultValue={this.state.content}
          rows={10} name="content" id="content"
          ></textarea>
        </div>
      </div>
      <div className="form-group">
          <button className="btn btn-primary" onClick={() => this.handleClick()}>Save
          </button>
      </div>
      <hr />
      <button className="btn btn-outline-success btn-sm mt-2"
      onClick={() => this.handleClickComplete()}> {this.state.complete_btn_name}
      </button>
      <hr />
      <div className="form-group">
        <button className="btn btn-outline-danger btn-sm mt-2"
        onClick={() => this.handleClickDelete()}>Delete
        </button>
      </div>
      <hr className="mb-4" />
    </div>
    )
  }
}
export default Edit;