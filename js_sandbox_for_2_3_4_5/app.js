// 44강

// Constructor (생성자)

// 함수를 만들 때 처럼 function을 쓰긴 하지만 함수와는 달리 대문자로 시작.
// Person constructor
function Person(name, dob) {
    this.name = name;
    // this.age = age;
    this.birthday = new Date(dob);
    this.calculateAge = function(){
      const diff =  Date.now() - this.birthday.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}
  
//const brad = new Person('Brad', 36);
//const john = new Person('John', 30);
  
// console.log(john.age);
  
const brad = new Person('Brad', '9-10-1981'); // Person 생성자를 바탕으로 brad 객체 만듦.
console.log(brad.calculateAge()); // brad라는 객체는 calculateAge라는 메소드 가짐.
  
  
// 45강

// Built in constructor


// String

const name1 = 'Jeff';
const name2 = new String('Jeff');

//name2.foo = 'bar';
//console.log(name2);

console.log(typeof name2);

if(name2 === 'Jeff'){
  console.log('YES');
} else {
  console.log('NO');
}

// Number
const num1 = 5;
const num2 = new Number(5);

// Boolean
const bool1 = true;
const bool2 = new Boolean(true);

// Function
const getSum1 = function(x, y){
  return x + y;
}

const getSum2 = new Function('x','y', 'return 1 + 1');

// Object
const john1 = {name: "John"};
const john2 = new Object({name: "John"});
console.log(john2);

// Arrays
const arr1 = [1,2,3,4];
const arr2 = new Array(1,2,3,4);

// Regular Expressions
const re1 = /\w+/;
const re2 = new RegExp('\\w+');

console.log(re2);


// 46강

// Prototype 객체 (원형 객체)

//Object.prototype
//Person.prototype

// Person constructor
function Person(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(dob);
    // this.calculateAge = function(){
    //   const diff =  Date.now() - this.birthday.getTime();
    //   const ageDate = new Date(diff);
    //   return Math.abs(ageDate.getUTCFullYear() - 1970);
    // }
}
  
// Calculate age
Person.prototype.calculateAge = function(){
    const diff =  Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// 다른 건 앞서 했던 생성자 코드와 같으나
// this.calculateAge대신에 Person.prototype에 calculateAge를 넣음.
// 같은 생성자로부터 만들어진 객체들은 모두 이 prototype객체를 공유함.
// 따라서 Person의 prototype객체에 calculateAge라는 메소드를 넣으면 Person 생성자로 만든 모든 객체에 이 메소드 사용가능.
  

// Get full name
Person.prototype.getFullName = function(){
    return `${this.firstName} ${this.lastName}`;
}
// $ -> jQuery 객체라는 의미


// Gets Married
Person.prototype.getsMaried = function(newLastName){
    this.lastName = newLastName;
}
  
const john = new Person('John', 'Doe', '8-12-90');
const mary = new Person('Mary', 'Johnson', 'March 20 1978');
  
console.log(mary);
  
console.log(john.calculateAge());
  
console.log(mary.getFullName());
  
mary.getsMaried('Smith');
  
console.log(mary.getFullName());
  
console.log(mary.hasOwnProperty('firstName'));
console.log(mary.hasOwnProperty('getFullName'));


// 47강

//  Prototypal Inheritance (프로토타입을 이용한 상속)
// : 부모 생성자의 기능을 물려받는 동시에 새로운 기능 추가 가능

// Person constructor
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
  
// Greeting
Person.prototype.greeting = function(){
    return `Hello there ${this.firstName} ${this.lastName}`;
}
  
const person1 = new Person('John', 'Doe');
  
console.log(person1.greeting());
  
// Customer constructor
function Customer(firstName, lastName, phone, membership) {
    Person.call(this, firstName, lastName);
  
    this.phone = phone;
    this.membership = membership;
}
  
// Inherit the Person prototype methods
Customer.prototype = Object.create(Person.prototype);
  
// Make customer.prototype return Customer()
Customer.prototype.constructor = Customer;
// 생성자.prototype.constructor === 생성자  여야함. (오류수정코드에 해당)
// 생성자의 부모의 자식을 찾으라고 하면 원래 생성자가 나오는게 맞으므로.
  

// Create customer
const customer1 = new Customer('Tom', 'Smith', '555-555-5555', 'Standard');
  
console.log(customer1);
  
// Customer greeting
Customer.prototype.greeting = function(){
    return `Hello there ${this.firstName} ${this.lastName} welcome to our company`;
}
  
console.log(customer1.greeting());



// 48강

// Object.create() 메소드
// 상속 방법 중 하나
// : 지정된 프로토타입 객체 및 속성을 갖는 새 객체를 만듦.
// 객체를 만들되 생성자는 실행하지 않음. 즉, 프로토타입만 넣음.

const personPrototypes = {
    greeting: function() {
      return `Hello there ${this.firstName} ${this.lastName}`;
    },
    getsMarried: function(newLastName) {
      this.lastName = newLastName;
    }
}
  
const mary = Object.create(personPrototypes);
mary.firstName = 'Mary';
mary.lastName = 'Williams';
mary.age = 30;
  
mary.getsMarried('Thompson');
  
console.log(mary.greeting());
  
const brad = Object.create(personPrototypes, {
    firstName: {value: 'Brad'},
    lastName: {value: 'Traversy'},
    age: {value: 36}
});
  
console.log(brad);
  
console.log(brad.greeting());



// 49강

// ES6 Classes
// ECMAScript : JavaScript 언어의 표준, ES6라고도 칭함.
// ES5로는 prototype을 이용해서 객체 지향 프로그래밍을 할 수 있었음.
// ES6에서는 java같은 객체 지향 언어에서 사용하는 것처럼 class문법을 제공함.

class Person {
    constructor(firstName, lastName, dob) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthday = new Date(dob);
    }
  
    greeting() {
      return `Hello there ${this.firstName} ${this.lastName}`;
    }

    calculateAge() {
      const diff = Date.now() - this.birthday.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  
    getsMarried(newLastName) {
      this.lastName = newLastName;
    }
  
    static addNumbers(x, y) {
      return x + y;
    }
}
  
const mary = new Person('Mary', 'Williams', '11-13-1980');
  
mary.getsMarried('Thompson');
  
console.log(mary);
  
console.log(Person.addNumbers(1,2));


// 50강

// Sub classes 

class Person {
    constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    greeting() {
      return `Hello there ${this.firstName} ${this.lastName}`;
    }
}
  
class Customer extends Person {
    constructor(firstName, lastName, phone, membership) {
      super(firstName, lastName);
  
      this.phone = phone;
      this.membership = membership;
    }
  
    static getMembershipCost() {
      return 500;
    }
}
  
const john = new Customer('John', 'Doe', '555-555-5555', 'Standard');
  
console.log(john.greeting());
  
console.log(Customer.getMembershipCost());


// 59강

// XHR Objects Methods & Working with Text
// XHR(XMLHttpRequest) : AJAX요청을 생성하는 JavaScripAPI, XHR의 메서드로 브라우저와 서버 간 네트워크 요청 전송 가능.


document.getElementById('button').addEventListener('click', loadData);

function loadData() {
  // Create an XHR Object
  const xhr = new XMLHttpRequest();

  // OPEN
  xhr.open('GET', 'data.txt', true);

  // console.log('READYSTATE', xhr.readyState);

  // Optional - Used for spinners/loaders
  xhr.onprogress = function(){
    console.log('READYSTATE', xhr.readyState);
  }

  xhr.onload = function(){
    console.log('READYSTATE', xhr.readyState);
    if(this.status === 200) {
      // console.log(this.responseText);
      document.getElementById('output').innerHTML = `<h1>${this.responseText}</h1>`;
    }
  }

  // xhr.onreadystatechange = function() {
  //   console.log('READYSTATE', xhr.readyState);
  //   if(this.status === 200 && this.readyState === 4){
  //     console.log(this.responseText);
  //   }
  // }

  xhr.onerror = function() {
    console.log('Request error...');
  }

  xhr.send();


    // readyState Values
    // 0: request not initialized 
    // 1: server connection established
    // 2: request received 
    // 3: processing request 
    // 4: request finished and response is ready


  // HTTP Statuses
  // 200: "OK"
  // 403: "Forbidden"
  // 404: "Not Found"
}


// 60강

// Working with AJAX & JSON

// AJAX(Async Javascript And XML) : 웹페이지에서 새로운 데이터를 보여주려 할 때 전체 새로고침 없이, 보여주고자 하는 데이터가 포함된 페이지 일부만 로드하는 기법.
// 비동기 처리 모델 사용하여 데이터 처리.
// AJAX 동작 방식
// 1. request - 브라우저가 서버에 정보 요청
// 2. 서버의 동작 - 서버는 JSON, XML 등의 형식으로 데이터 전달
// 3. 응답(response) - 브라우저에서 이벤트 발생하여 콘텐츠 처리


// JSON(Javascript Object Notation) : 자바스크립트의 객체 표현형식과 유사한 방식으로 데이터 주고 받는 방법.
// 객체를 정의하지 않음. 자바스크립트 객체가 아니라 객체 표현식으로 데이터를 표현함. 따라서 다른 도메인에서도 요청을 보낼 수 있다.


// document.getElementById() : DOM 객체찾기
document.getElementById('button1').addEventListener('click', loadCustomer);
// id 값이 'button1'인 태그를 찾아 변수에 저장
document.getElementById('button2').addEventListener('click', loadCustomers);

// Load Single Customer
function loadCustomer(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'customer.json', true);

  xhr.onload = function(){
    if(this.status === 200) {
      // console.log(this.responseText);

      const customer = JSON.parse(this.responseText);

      const output = `
        <ul>
          <li>ID: ${customer.id}</li>
          <li>Name: ${customer.name}</li>
          <li>Company: ${customer.company}</li>
          <li>Phone: ${customer.phone}</li>
        </ul>
      `;

      document.getElementById('customer').innerHTML = output;
    }
  }

  xhr.send();
}


// Load Customers
function loadCustomers(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'customers.json', true);

  xhr.onload = function(){
    if(this.status === 200) {
      // console.log(this.responseText);

      const customers = JSON.parse(this.responseText);

      let output = '';

      customers.forEach(function(customer){
        output += `
        <ul>
          <li>ID: ${customer.id}</li>
          <li>Name: ${customer.name}</li>
          <li>Company: ${customer.company}</li>
          <li>Phone: ${customer.phone}</li>
        </ul>
      `;
      });

      document.getElementById('customers').innerHTML = output;
    }
  }

  xhr.send();
}


// 63강

// Callback Functions
// : js에서 비동기처리를 위해 콜백 사용.
// 단점 :  비동기처리를 순차적으로 실행할 필요가 있는 경우, 비동기 처리를 중첩시켜 표현하므로 에러, 예외처리가 어려움, 중첩으로 인한 복잡도가 증가.


const posts = [
  {title: 'Post One', body: 'This is post one'},
  {title: 'Post Two', body: 'This is post two'}
];

// function createPost(post) {
//   setTimeout(function() {
//     posts.push(post);
//   }, 2000);
// }


// function getPosts() {
//   setTimeout(function() {
//     let output = '';
//     posts.forEach(function(post){
//       output += `<li>${post.title}</li>`;
//     });
//     document.body.innerHTML = output;
//   }, 1000);
// }

// createPost({title: 'Post Three', body: 'This is post three'});

// getPosts();


function createPost(post, callback) {
  setTimeout(function() {
    posts.push(post);
    callback();
  }, 2000);
}


function getPosts() {
  setTimeout(function() {
    let output = '';
    posts.forEach(function(post){
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

createPost({title: 'Post Three', body: 'This is post three'}, getPosts);



// 66강

// ES6 Promises
// callback 사용을 통한 비동기처리의 단점 해결을 위해 생김.
// "비동기에서 성공과 실패를 분리하여 메서드 수행"

const posts = [
  {title: 'Post One', body:'This is post one'},
  {title: 'Post Two', body: 'This is post two'}
];

function createPost(post) {
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      posts.push(post);

      const error = false;

      if(!error) {
        resolve();
      } else {
        reject('Error: Something went wrong');
      }
    }, 2000);
  });
}

function getPosts() {
  setTimeout(function() {
    let output = '';
    posts.forEach(function(post){
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

createPost({title: 'Post Three', body: 'This is post three'})
.then(getPosts)
.catch(function(err) {
  console.log(err);
});


// 67강

// The Fetch API
// Fetch API를 이용하면 비동기 HTTP 요청을 보앨 수 있음.
// fetch를 호출하면 브라우저는 요청을 보내고 Promise 객체를 반환.
// 요청이 완료되면 성공여부에 관계없이 promise가 resolved되어 response 객체 반환.
// 요청이 완료되지 못한 상태라면 promise가 rejected됨.

document.getElementById('button1').addEventListener('click', getText);

document.getElementById('button2').addEventListener('click', getJson);

document.getElementById('button3').addEventListener('click', getExternal);

// Get local text file data
function getText() {
fetch('test.txt')
  .then(function(res){
    return res.text();
  })
  .then(function(data) {
    console.log(data);
    document.getElementById('output').innerHTML = data;
  })
  .catch(function(err){
    console.log(err);
  });
}


// Get local json data
function getJson() {
fetch('posts.json')
  .then(function(res){
    return res.json();
  })
  .then(function(data) {
    console.log(data);
    let output = '';
    data.forEach(function(post) {
      output += `<li>${post.title}</li>`;
    });
    document.getElementById('output').innerHTML = output;
  })
  .catch(function(err){
    console.log(err);
  });
}


// Get from external API
function getExternal() {
fetch('https://api.github.com/users')
  .then(function(res){
    return res.json();
  })
  .then(function(data) {
    console.log(data);
    let output = '';
    data.forEach(function(user) {
      output += `<li>${user.login}</li>`;
    });
    document.getElementById('output').innerHTML = output;
  })
  .catch(function(err){
    console.log(err);
  });
}



// 69강

// Arrow Functions (화살표 함수)
// : function 키워드 대신 화살표(=>)를 사용하여 보다 간략한 방법으로 함수 선언 가능.

document.getElementById('button1').addEventListener('click', getText);

document.getElementById('button2').addEventListener('click', getJson);

document.getElementById('button3').addEventListener('click', getExternal);

// Get local text file data
function getText() {
  fetch('test.txt')
    .then(res => res.text())
    .then(data => {
      console.log(data);
      document.getElementById('output').innerHTML = data;
    })
    .catch(err => console.log(err));
}


// Get local json data
function getJson() {
  fetch('posts.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let output = '';
      data.forEach(function(post) {
        output += `<li>${post.title}</li>`;
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(err => console.log(err));
}


// Get from external API
function getExternal() {
  fetch('https://api.github.com/users')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let output = '';
      data.forEach(function(user) {
        output += `<li>${user.login}</li>`;
      });
      document.getElementById('output').innerHTML = output;
    })
    .catch(err => console.log(err));
}


// 71강

// Async & Await

// async function myFunc() {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('Hello'), 1000);
//   });

//   const error = false;

//   if(!error){
//     const res = await promise; // Wait until promise is resolved
//     return res;
//   } else {
//     await Promise.reject(new Error('Something went wrong'));
//   }
// }

// myFunc()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

async function getUsers() {
  // await response of the fetch call
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  // Only proceed once its resolved
  const data = await response.json();

  // only proceed once second promise is resolved
  return data;
}

getUsers().then(users => console.log(users));



// 82강

// Error Handling with Try...Catch

const user = {email: 'jdoe@gmail.com'};

try {
  // Produce a ReferenceError
  // myFunction();

  // Produce a TypeError
  // null.myFunction();

  // Will produce SyntaxError
  // eval('Hello World');

  // Will produce a URIError
  // decodeURIComponent('%');

  if(!user.name) {
    //throw 'User has no name';
    throw new SyntaxError('User has no name');
  }

} catch(e) {
  console.log(`User Error: ${e.message}`);
  // console.log(e);
  // console.log(e.message);
  // console.log(e.name);
  // console.log(e instanceof TypeError);
} finally {
  console.log('Finally runs reguardless of result...');
}

console.log('Program continues...');


// 83강

// Regular Expressions - Evaluation Functions

let re;
re = /hello/;
re = /hello/i; // i =  case insensitive
// re = /hello/g; // Global search

// console.log(re);
// console.log(re.source);

// exec() - Return result in an array or null
// const result = re.exec('hello world');

// console.log(result);
// console.log(result[0]);
// console.log(result.index);
// console.log(result.input);

// test() - Returns true or false
// const result = re.test('Hello');
// console.log(result);

// match() - Return result array or null
// const str = 'Hello There';
// const result = str.match(re);
// console.log(result);

// search() - Returns index of the first match if not found retuns -1
// const str = 'Brad Hello There';
// const result = str.search(re);
// console.log(result);

// replace() - Return new string with some or all matches of a pattern
// const str = 'Hello There';
// const newStr = str.replace(re, 'Hi');
// console.log(newStr);



// 84강

// Regular Expressions - Metacharacter Symbols
// 메타문자 : 정규식 엔진에게 어떤 단일 문자를 매칭할지 알려주는 역할의 특수문자

let re;
// Literal Characters
re = /hello/; // 대소문자를 구별하며 패턴과 일치한 첫번째 결과만 반환.
re = /hello/i;  // 대소문자를 구별하지 않고 패턴과 일치한 첫번째 결과 반환.

// Metacharacter Symbols
re = /^h/i;           // Must start with  // 단어의 맨 앞에 위치한 해당 패턴만 검색. EX) 'h'로 시작하는 단어의 'h'만을 검색.
re = / world$/i;     // Must ends with  // 단어의 맨 뒤에 위치한 해당 패턴만 검색.  EX) 'world'로 끝나는 단어의 'world'만을 검색.
re = /^hello$/i;     // Must begin and end with
re = /h.llo/i;      // Matches any ONE character  // 임의의 한 문자를 표현
re = /h*llo/i;      // Matches any character 0 or more times  // h가 0번 이상 반복.
re = /gre?a?y/i;    // Optional character // 0번 또는 1번 반복되는 경우 일치한다고 판단하는 수량자
re = /gre?a?y\?/i;    // Escape character // 특수문자를 문자 그대로 검색하고 싶다면 백슬래시롤 앞에 붙여 알려줌.


// String to match
const str = 'Gray?';


// Log Results
const result = re.exec(str);
console.log(result);

function reTest(re, str) {
  if(re.test(str)) {
    console.log(`${str} matches ${re.source}`);
  } else {
    console.log(`${str} does NOT match ${re.source}`);
  }
}

reTest(re, str);


// 85강

// Regular Expressions - Character Sets & Quantifiers

let re;
// Literal Characters
re = /hello/;
re = /hello/i;

// Metacharacter Symbols
re = /^h/i;           // Must start with
re = / world$/i;     // Must ends with
re = /^hello$/i;     // Must begin and end with
re = /h.llo/i;      // Matches any ONE character
re = /h*llo/i;      // Matches any character 0 or more times
re = /gre?a?y/i;    // Optional character
re = /gre?a?y\?/i;    // Escape character 


// Brackets [] - Character Sets
re = /gr[ae]y/i;      // Must be an a or e
re = /[GF]ray/i;      // Must be a G or F
re = /[^GF]ray/i;      // Match anything except a G or F
re = /[A-Z]ray/;      // Match any uppercase letter
re = /[a-z]ray/;      // Match any lowercase letter
re = /[A-Za-z]ray/;   // Match any  letter
re = /[0-9][0-9]ray/;      // Match any digit

// Braces {} - Quantifiers
re = /Hel{2}o/i;      // Must occur exactly {m} amount of times
re = /Hel{2,4}o/i;      // Must occur exactly {m} amount of times
re = /Hel{2,}o/i;      // Must occur at least {m} times

// Paretheses () - Grouping
re = /^([0-9]x){3}$/

// String to match
const str = '3x3x3x';

// Log Results
const result = re.exec(str);
console.log(result);

function reTest(re, str) {
  if(re.test(str)) {
    console.log(`${str} matches ${re.source}`);
  } else {
    console.log(`${str} does NOT match ${re.source}`);
  }
}

reTest(re, str);


// 86강

// Regular Expressions - Shorthand Character Classes

let re;
// Literal Characters
re = /hello/;
re = /hello/i;

// Metacharacter Symbols
re = /^h/i;           // Must start with
re = / world$/i;     // Must ends with
re = /^hello$/i;     // Must begin and end with
re = /h.llo/i;      // Matches any ONE character
re = /h*llo/i;      // Matches any character 0 or more times
re = /gre?a?y/i;    // Optional character
re = /gre?a?y\?/i;    // Escape character 


// Brackets [] - Character Sets
re = /gr[ae]y/i;      // Must be an a or e
re = /[GF]ray/i;      // Must be a G or F
re = /[^GF]ray/i;      // Match anything except a G or F
re = /[A-Z]ray/;      // Match any uppercase letter
re = /[a-z]ray/;      // Match any lowercase letter
re = /[A-Za-z]ray/;   // Match any  letter
re = /[0-9][0-9]ray/;      // Match any digit

// Braces {} - Quantifiers
re = /Hel{2}o/i;      // Must occur exactly {m} amount of times
re = /Hel{2,4}o/i;      // Must occur exactly {m} amount of times
re = /Hel{2,}o/i;      // Must occur at least {m} times

// Paretheses () - Grouping
re = /^([0-9]x){3}$/

// Shorthand Character Classes
re = /\w/;    // Word character - alphanumeric or _
re = /\w+/;    // + = one or more
re = /\W/;    // Non-Word character
re = /\d/;    // Match any digit
re = /\d+/;    // Match any digit 0 or more times
re = /\D/;      // Match any Non-digit
re = /\s/;      // Match whitespace char
re = /\S/;      // Match non-whitespace char
re = /Hell\b/i; // Word boundary

// Assertions
re = /x(?=y)/;  // Match x only if followed by y
re = /x(?!y)/;  // Match x only if NOT followed by y

// String to match
const str = 'dkjekdxydjekdj';

// Log Results
const result = re.exec(str);
console.log(result);

function reTest(re, str) {
  if(re.test(str)) {
    console.log(`${str} matches ${re.source}`);
  } else {
    console.log(`${str} does NOT match ${re.source}`);
  }
}

reTest(re, str);


// 88강

// Iterators & Generators (반복자 및 생성자)


// Iterator Example
// function nameIterator(names) {
//   let nextIndex = 0;

//   return {
//     next: function() {
//       return nextIndex < names.length ?
//       { value: names[nextIndex++], done: false } :
//       { done: true }
//     }
//   }
// }

// // Create an array of names
// const namesArr = ['Jack', 'Jill', 'John'];
// // Init iterator and pass in the names array
// const names = nameIterator(namesArr);

// console.log(names.next().value);
// console.log(names.next().value);
// console.log(names.next().value);
// console.log(names.next().value);

// Generator Example
// function* sayNames() {
//   yield 'Jack';
//   yield 'Jill';
//   yield 'John';
// }

// const name = sayNames();

// console.log(name.next().value);
// console.log(name.next().value);
// console.log(name.next().value);
// console.log(name.next().value);

// ID Creator
function* createIds() {
    let index = 1;
  
    while(true) {
      yield index++;
    }
}
  
const gen = createIds();
  
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);



// 90강

// Symbols

// Create a symbol
// const sym1 = Symbol();
// const sym2 = Symbol('sym2');

// console.log(typeof sym2);

// console.log(Symbol('123') === Symbol('123'));
// console.log(`Hello ${sym1.toString()}`);

// Unique Object Keys
const KEY1 = Symbol();
const KEY2 = Symbol('sym2');

const myObj = {};

myObj[KEY1] = 'Prop1';
myObj[KEY2] = 'Prop2';
myObj.key3 = 'Prop3';
myObj.key4 = 'Prop4';

// console.log(myObj[KEY1]);
// console.log(myObj[KEY2]);

// Symbols are not enumerable in for...in
// for(let i in myObj) {
//   console.log(`${i}: ${myObj[i]}`);
// }

// Symbols are ignored by JSON.stringify
console.log(JSON.stringify({key: 'prop'}));
console.log(JSON.stringify({[Symbol('sym1')]: 'prop'}));



// 91강

// Destructuring


// Destructuring Assignment

let a, b;
[a, b] = [100, 200];
// Rest pattern
[a, b, c, ...rest] = [100, 200, 300, 400, 500];

({ a, b } = { a: 100, b: 200, c: 300, d: 400, e: 500 });
({ a, b, ...rest} = { a: 100, b: 200, c: 300, d: 400, e: 500 });

// Array Destructuring

// const people = ['John', 'Beth', 'Mike'];

// const [person1, person2, person3] = people;

// console.log(person1, person2, person3);

// Parse array returned from function
// function getPeople() {
//   return ['John', 'Beth', 'Mike'];
// }

// let person1, person2, person3;
// [person1, person2, person3] = getPeople();

// console.log(person1, person2, person3);

// Object Destructuring

const person = {
  name: 'John Doe',
  age: 32,
  city: 'Miami',
  gender: 'Male',
  sayHello: function(){
    console.log('Hello');
  }
}

// Old ES5
// const name = person.name,
//       age = person.age,
//       city = person.city;

// New ES6 Destructuring
const { name, age, city, sayHello } = person;

console.log(name, age, city);

sayHello();



// 92강

// ES6 Maps
// Object 의 key는 string과 symbol(ES6)만 가능하지만, map은 어떤 값도 가능.
// Object에서는 크기를 추적해서 알 수 있지만, map은 손쉽게 얻을 수 있음.


// MAPS = key-value pairs - can use ANY type as a key or value

const map1 = new Map();

// Set Keys
const key1 = 'some string',
      key2 = {},
      key3 = function() {};

// Set map values by key
map1.set(key1, 'Value of key1');
map1.set(key2, 'Value of key2');
map1.set(key3, 'Value of key3');

// Get values by key
// console.log(map1.get(key1), map1.get(key2), map1.get(key3));

// Count values
// console.log(map1.size);

// ITERATING MAPS

// Loop using for...of to get keys and values
// for(let [key, value] of map1) {
//   console.log(`${key} = ${value}`);
// }

// Iterate keys only
// for(let key of map1.keys()) {
//   console.log(key);
// }

// Iterate values only
// for(let value of map1.values()) {
//   console.log(value);
// }

// Loop with forEach
// map1.forEach(function(value, key){
//   console.log(`${key} = ${value}`);
// });

// CONVERT TO ARRAYS

// Create an array of the key value pairs
const keyValArr = Array.from(map1);
console.log(keyValArr);

// Create an array of the values
const valArr = Array.from(map1.values());
console.log(valArr);

// Create an array of the keys
const keyArr = Array.from(map1.keys());
console.log(keyArr);


// 93강

// ES6 Sets
// Set은 value들로 이루어진 집합.
// Array와 다르게 set은 같은 value를 2번 포함할 수 없음.


// SETS - Store unique values of any type

const set1 = new Set();

// Add values to set
set1.add(100);
set1.add('A string');
set1.add({name: 'John'});
set1.add(true);
set1.add(100);

// const set2 = new Set([1, true, 'string']);
// console.log(set2);

// console.log(set1);

// Get count
// console.log(set1.size);

// Check for values
// console.log(set1.has(100));
// console.log(set1.has(50 + 50));
// console.log(set1.has({name: 'John'}));

// Delete from set
// set1.delete(100);

// console.log(set1);

// ITERATING THROUGH SETS

// For..of 
// for(let item of set1) {
//   console.log(item);
// }

// ForEach Loop
// set1.forEach((value) => {
//   console.log(value);
// });

// CONVERT SET TO ARRAY
const setArr = Array.from(set1);
console.log(setArr);