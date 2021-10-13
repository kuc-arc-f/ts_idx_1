
import  {Component} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Dexie from 'dexie';
import moment from 'moment';
import LibBook from '../../lib/LibBook';
const CONFIG = LibBook.get_const();

interface IProps {
  history:string[],
}
type PageProps = IProps & RouteComponentProps<{id: string}>;
interface IState {
  title: string,
  content: string,
  type: number,
  radio_1: number,
  check_1: boolean,
  check_2: boolean,
  date_1 : string,  
 id: number,
}
//
class Edit extends Component<PageProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any) {
    super(props);
    this.state = {
      title: '', 
      content: '',
      type: 0,
      radio_1: 1,
      check_1: false,
      check_2: false,
      date_1 : null,
      id: 0,
    }        
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  componentDidMount(){
    const id  = Number(this.props.match.params.id)
    this.db = new Dexie( CONFIG.DB_NAME );
    this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );         
//console.log( this.id);
    this.get_item(id )
  }
  async get_item(id: number){
    const item = await this.db.books.get(id);
    this.setState({ 
      id: id,
      title: item.title, 
      content: item.content,
      type: item.type,
      radio_1: item.radio_1,
      check_1: item.check_1,
      check_2: item.check_2,
      date_1: moment(item.date_1).format('YYYY-MM-DD'),
    });
    const type_1 = document.querySelector<HTMLInputElement>('#type_1');
    type_1.value = item.type;
    const radio_1: any = document.querySelectorAll<HTMLInputElement>('input[name="radio_1"]');
//console.log("radio_1=", item.radio_1)
    for(let elem of radio_1) {
//console.log(elem.value)
      if(elem.value === item.radio_1){
        elem.checked = true;
      }
    }
    const check_1 = document.querySelector<HTMLInputElement>('#check_1');
    check_1.checked = item.check_1;
    const check_2 = document.querySelector<HTMLInputElement>('#check_2');
    check_2.checked = item.check_2;
//console.log(item );
  }
  update_item(){
    const title = document.querySelector<HTMLInputElement>('#title');
    const content = document.querySelector<HTMLInputElement>('#content');
    const type_1 = document.querySelector<HTMLInputElement>('#type_1');
    const date_1 = document.querySelector<HTMLInputElement>('#date_1');
    const date_str = date_1.value + "T00:00:00.000Z"; 
    const radio_1: any = document.querySelectorAll<HTMLInputElement>('input[name="radio_1"]');
    let radio_1_val = "";
    for(let elem of radio_1) {
//console.log(elem.checked)
      if(elem.checked){
        radio_1_val = elem.value;
      }
    }
    const check_1 = document.querySelector<HTMLInputElement>('#check_1');
    const check_2 = document.querySelector<HTMLInputElement>('#check_2');
    const item = {
      title: title.value,
      content: content.value,
      type: type_1.value,
      date_1: new Date( date_str ),
      radio_1: radio_1_val,
      check_1: check_1.checked,
      check_2: check_2.checked,
    };
console.log(item)
    this.db.books.update(this.state.id , item);
    this.props.history.push("/books");
  }    
  handleClickDelete(){
//        console.log("#-handleClickDelete")
    this.db.books.delete(this.state.id);
    this.props.history.push("/books");
  }
  handleClick(){
    console.log("#-handleClick")
    this.update_item();
  }
  render(){
console.log( this.state )
    return (
    <div className="container pb-4">
      <Link to="/book" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />            
      <h3>Book - Edit</h3>
      <hr className="mt-2 mb-2" />
      <div className="form-group">
        <label>Title:</label>
        <div className="col-sm-6">
          <input type="text" className="form-control"
          defaultValue={this.state.title} name="title" id="title"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Content:</label>
        <div className="col-sm-8">
          <textarea  name="content" id="content" className="form-control" rows={3}
          defaultValue={this.state.content} ></textarea>
        </div>
      </div>
      <div className="form-group">
        <label>Type:</label>
        <div className="col-sm-6">
          <select className="form-select" id="type_1">
            <option value="0">select please</option>
            <option value="1">option-1</option>
            <option value="2">option-2</option>
            <option value="3">option-3</option>
          </select>
        </div>
      </div>
        <div className="form-group">
          <label>Date:</label>
          <div className="col-sm-6">
            <input type="date" name="date_1" id="date_1" className="form-control" 
            defaultValue={this.state.date_1}
            />
          </div>
        </div>      
        <hr />      
        <div className="form-group">
          <label>Radio:</label>
          <div className="col-sm-6">
            <input type="radio" name="radio_1" value="1"
              /> radio-1
            <br />
            <input type="radio" name="radio_1" value="2"
              /> radio-2
            <br />
            <input type="radio" name="radio_1" value="3" 
              /> radio-3
            <br />
          </div>
        </div>
        <hr />
        <div className="form-group">
          <label>Checkbox:</label>
          <div className="col-sm-6">
          <input type="checkbox" name="check_1" id="check_1" defaultChecked={this.state.check_1}
           /> check_1  <br />
          <input type="checkbox" name="check_2" id="check_2" defaultChecked={this.state.check_2}
           /> check_2  <br />
          </div>
        </div>            
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick}>Save
          </button>
        </div>
        <hr />
        <div className="form-group">
          <button className="btn btn-outline-danger btn-sm mt-2"
          onClick={this.handleClickDelete}>Delete
          </button>
        </div>
        <hr className="mb-4"/>
    </div>
    )
  }
}
export default Edit;