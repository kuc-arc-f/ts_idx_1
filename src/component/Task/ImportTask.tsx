
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../lib/LibTask';

const CONFIG = LibTask.get_const()
interface IProps {
  history:string[],
}
interface IState {
  title: string,
  content: string,
  id: number,
}
//
class ImportTask extends Component<IProps, IState> {
  db: any = new Dexie( CONFIG.DB_NAME );
  constructor(props: any){
    super(props)
    this.state = {title: '', content: '', id: 0}
  }
  componentDidMount(){
    this.db.version(CONFIG.DB_VERSION).stores( CONFIG.DB_STORE );
    const self = this;
    window.addEventListener("load", function() {
      const file1 = document.querySelector<HTMLInputElement>('#file1');
      file1.addEventListener("change", function() {
          //console.log("#-change")
          self.change_proc()
      });
    });        
  }
  change_proc(){
    console.log("#-change_proc")
    const self = this
    const files = document.querySelector<HTMLInputElement>('#file1').files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      console.log("i: " + i );                
      console.log("Name: " + file.name);
      console.log("Size: " + file.size);
      console.log("Type: " + file.type);
      console.log("Date: " + file.lastModified);
//      console.log("Date: " + file.lastModifiedDate);
      let reader = new FileReader();
      reader.onload = async function(evt: any) {
        console.log("State: " + evt.target.readyState);
        let result = evt.target.result;
        let dat = JSON.parse(result || '[]')
//console.log( dat )
        await self.add_item(dat)
      };
      reader.onerror = function(evt) {
          console.log(evt.target.error.name);
      };
      reader.readAsText(file, "utf-8");             
    }                
  }
  async add_item(items: Array<any>){
      const self = this
      this.db.tasks.clear()
      await items.forEach(function(item){
        const task = {
          title: item.title,
          content: item.content,
          created_at: new Date(item.created_at),
        }
        self.db.tasks.add( task)
      });
      setTimeout(function () {
        alert("Complete ,import data success.");
        console.log("# timer.cb")
        window.location.href = "/tasks"
      }, 1000)        
  }    
  render() {
    return (
    <div className="container">
      <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
      <hr className="mt-2 mb-2" />
      <h3 className="mt-2">Tasks- import:</h3>
      <hr />
      <p>select , json file</p>            
      <div>
          <input type="file" id="file1" className="btn btn-outline-primary" />
      </div>
      <br /> 
      <p>※連続でファイルを読み込む場合、再読み込みして下さい。</p>               
    </div>
    )
  }
}
export default ImportTask;

