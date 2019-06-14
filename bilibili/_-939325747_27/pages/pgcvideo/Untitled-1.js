function Student(props) {
  this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
  alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
  // 调用Student构造函数，绑定this变量:
  Student.call(this, props);
  this.grade = props.grade || 1;
}

let a=new PrimaryStudent({
  name: '小明',
  grade: 2
})
console.log(a)