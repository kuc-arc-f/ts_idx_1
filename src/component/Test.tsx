import React from 'react';
/*
interface Person {
  name: string;
  age: number;
}
export function test2(): void{
let foo<Person> = {};
foo.name = "Yamada";
}
*/
export function test1(a1: number): string{
//  const p1:string = 'aa'; 
  const p1 = 'aa' + String(a1);
  console.log("#test1:" + p1);
  return p1;
}
export function renderSquare(num: number){
  console.log(num);
}
//
export default class Test extends React.Component {
  async componentDidMount(){
//    const d = test1(1);
  }
  render(){
    return (
    <div className="container">
      <h3>Test111</h3>
      <hr />
    </div>
    );
  }
}

