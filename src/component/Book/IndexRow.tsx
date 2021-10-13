import  { Component } from 'react';
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
        <Link to={`/book_edit/${this.props.obj.id}`}
          className="btn btn-sm btn-outline-primary">Edit
        </Link>                  
      </td>
    </tr>
    )
  }
}

export default IndexRow;