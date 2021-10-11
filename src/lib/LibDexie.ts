//import Dexie from 'dexie';
import LibCommon from '../lib/LibCommon';

interface ITask {
  id: number,
  title: string
}
//
const LibDexie = {
  get_item: function(items: Array<ITask>, pos: number){
    let ret: ITask = null;
    items.forEach(function(item: ITask){
//            console.log(item.id );
      if(item.id === pos){
        ret = item
      }
    });
    return ret
  },    
  get_reverse_items: function(items: Array<any>){
    const data: Array<any> =[]
    items.forEach(function(item){
      let date = item.created_at
      date = LibCommon.formatDate(date, 'YYYY-MM-DD hh:mm')
      item.created_at = date
      data.unshift(item)                        
    });        
    return data
  },
}
export default LibDexie;