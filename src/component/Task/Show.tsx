
import React, {Component} from 'react';
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
export default class TaskShow extends Component<PageProps, IState> {
    db: any = new Dexie( CONFIG.DB_NAME );
    constructor(props: any) {
        super(props);
        this.state = {title: '', content: '', id: 0};
    }
    componentDidMount(){
      const id  = Number(this.props.match.params.id)
      this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );
      this.get_item(id);
    }
    async get_item(id: number){
      const item = await this.db.tasks.get(id);
      this.setState({ 
        title: item.title, 
        content: item.content
      });        
//      console.log(item);                          
    }
    render(){
      return (
      <div className="container">
        <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
        <hr className="mt-2 mb-2" />            
        <h1>Edit - task</h1>
        <div className="form-group col-md-6">
          <label>Title :</label><br />
          {this.state.title}
        </div>
        <div className="form-group col-md-6">
          <label>content :</label><br />
          {this.state.content}
        </div>
      </div>
      )
    }
}
