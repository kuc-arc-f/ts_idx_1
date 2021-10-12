
import  {Component} from 'react';
import { Link ,RouteComponentProps } from 'react-router-dom';
import Dexie from 'dexie';
import marked from  'marked'
import LibTodo from '../../lib/LibTodo';
import LibCommon from '../../lib/LibCommon';
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
  id: number,
}
//
class Show extends Component<PageProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any) {
    super(props);
    this.state = {
      title: '', content: '',
      type :0 , created_at: '',
      id: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    const id  = Number(this.props.match.params.id)
    this.db = new Dexie( CONFIG.DB_NAME );
    this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );         
//console.log( this.id);
    this.get_item( id )
  }
  async get_item(id: number){
    const item = await this.db.todos.get(id);
    item.content = marked(item.content)
    item.created_at = LibCommon.formatDate(item.created_at, 'YYYY-MM-DD hh:mm')
    this.setState({ 
      title: item.title, 
      content: item.content,
      type: item.complete,
      created_at: item.created_at,
    });        
    console.log(item);                          
  }
  handleClick(){
    console.log("#-handleClick")
//        console.log( this.state )
  }        
  render(){
    return (
    <div className="container">
      <Link to="/todo" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />            
      <h1>{this.state.title}</h1>
      Date : {this.state.created_at}
      <hr />
      <div id="post_item" 
      dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
    </div>
    )
  }
}
export default Show;