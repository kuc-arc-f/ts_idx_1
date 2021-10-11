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
            {this.props.obj.id}
        </td>
        <td>
            {this.props.obj.title}
        </td>
        <td>
            {this.props.obj.content}
        </td>
        <td>
            <Link to={`/task_show/${this.props.obj.id}`}
              className="btn btn-sm btn-outline-primary">Show
            </Link>                  

            <Link to={`/task_edit/${this.props.obj.id}`}
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