import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    obj: any,
    key: number,
}
//
class IndexRow extends Component<IProps> {
  render() {
    return (
    <tr>
      <td>
        <Link to={`/todo_show/${this.props.obj.id}`} >
            <h3>{this.props.obj.title}</h3>
        </Link>                 
        {this.props.obj.created_at} , ID : {this.props.obj.id}
      </td>
      <td>
        <Link to={`/todo_edit/${this.props.obj.id}`}
          className="btn btn-sm btn-outline-primary">Edit
        </Link>                  
      </td>
      <td> 
      </td>
    </tr>
    )
  }
}
export default IndexRow;
