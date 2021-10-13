
import {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import moment from 'moment';
import LibBook from '../../lib/LibBook';
const CONFIG = LibBook.get_const();

interface IProps {
  history:string[],
}
interface IState {
  title: string,
  content: string,
  type: number,
  radio_1: number,
  check_1: boolean,
  check_2: boolean,
  date_1 : string,  
//  id: number,
}
//
class Create extends Component<IProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any){
    super(props)
    this.state = {
      title: '', 
      content: '',
      type: 0,
      radio_1: 1,
      check_1: false,
      check_2: false,
      date_1 : null,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    this.db = new Dexie( CONFIG.DB_NAME );
    this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );
    const dt = moment().format('YYYY-MM-DD')
console.log(dt);
    const date_1 = document.querySelector<HTMLInputElement>('#date_1');
    date_1.value= dt;
    this.setState({date_1: dt })        
  }
  add_item(){
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
//console.log(check_1.checked)
    const item = {
        title: title.value,
        content: content.value,
        type: type_1.value,
        date_1: new Date( date_str ),
        radio_1: radio_1_val,
        check_1: check_1.checked,
        check_2: check_2.checked,
        created_at: new Date(),
    }
    this.db.books.add( item )
console.log( item )
    this.props.history.push("/books");
  }
  handleClick(){
    console.log("#-handleClick")
    this.add_item()
//        console.log( this.state )
  }
  render() {
    return (
    <div className="container pb-4">
      <Link to="/book" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />
      <h3 className="mt-2">Book - Create</h3>
      <hr className="mt-2 mb-2" />
      <div className="form-group">
        <label>Title:</label>
        <div className="col-sm-6">
          <input type="text" name="title" id="title" className="form-control"
          />                    
        </div>
      </div>            
      <div className="form-group">
        <label>Content:</label>
        <div className="col-sm-8">
          <textarea  name="content" id="content" className="form-control" rows={3}
          ></textarea>
        </div>
      </div>
      <div className="form-group">
        <label>Type:</label>
        <div className="col-sm-6">
          <select name="type_1" id="type_1" defaultValue={this.state.type} 
          className="form-select">
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
           />
        </div>
      </div>
      <div className="form-group">
        <label>Radio:</label>
        <div className="col-sm-6">
          <input type="radio" name="radio_1" value="1"
          defaultChecked={true} /> radio-1
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
      <hr />
      <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick}>Create
          </button>
      </div>
      <hr className="mb-4" />
    </div>
    )
  }
}
export default Create;

