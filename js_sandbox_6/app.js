// js_sandbox_6

// Module & Revealing Module Pattern
// Module Pattern : 전체 어플리케이션의 일부를 독립된 코드로 만들어 놓은 것.
// Revealing Module Pattern (노출식 모듈 패턴) : 모듈 패턴과 같은 개념으로 public과 private메소드에 초점을 둔 패턴. 모듈 패턴과 달리 명시적으로 노출하고 싶은 부분만 정해서 노출하는 방식.


// Basic structure

// (function() {
//   // Declare private vars and functions

//   return {
//     // Declare public var and functions
//   }
// })();

// STANDARD MODULE PATTERN
// const UICtrl = (function() {
//   let text = 'Hello World';

//   const changeText = function() {
//     const element = document.querySelector('h1');
//     element.textContent = text;
//   }

//   return {
//     callChangeText: function() {
//       changeText();
//       // console.log(text);
//     }
//   }
// })();

// UICtrl.callChangeText();
// // UICtrl.changeText();

// console.log(UICtrl.text);

// REVEALING MODULE PATTERN
const ItemCtrl = (function() {
    let data = [];
  
    function add(item) {
      data.push(item);
      console.log('Item Added....');
    }
  
    function get(id) {
      return data.find(item => {
        return item.id === id;
      });
    }
  
    return {
      add: add,
      // get: get
    }
})();
  
ItemCtrl.add({id: 1, name: 'John'});
ItemCtrl.add({id: 2, name: 'Mark'});
console.log(ItemCtrl.get(2));




// Singleton Pattern
// : 전체 시스템에서 하나의 인스턴스만 존재하도록 보장하는 객체 생성패턴

const Singleton = (function() {
  let instance;
  
  function createInstance() {
    const object = new Object({name:'Brad'});
      return object;
  }
  
  return {
    getInstance: function() {
      if(!instance){
        instance = createInstance();
      }
      return instance;
    }
  }
})();
  
const instanceA = Singleton.getInstance();
const instanceB = Singleton.getInstance();
  
console.log(instanceA === instanceB);
  
// console.log(instanceA);




// Factory Pattern
// : 비슷한 객체를 공장에서 찍어내듯 반복적으로 생성할 수 있게 하는 패턴.
// new 키워드를 사용한 생성자 함수가 아닌 그냥 일반 함수에서 객체를 반환하는 것을 factory function이라고 함.


function MemberFactory() {
  this.createMember = function(name, type) {
    let member;
  
    if(type === 'simple') {
      member = new SimpleMembership(name);
    } else if (type === 'standard') {
      member = new StandardMembership(name);
    } else if (type === 'super') {
      member = new SuperMembership(name);
    }
  
    member.type = type;
  
    member.define =  function() {
      console.log(`${this.name} (${this.type}): ${this.cost}`);
    }
  
    return member;
  }
}
  
const SimpleMembership = function(name) {
    this.name = name;
    this.cost = '$5';
}
  
const StandardMembership = function(name) {
    this.name = name;
    this.cost = '$15';
}
  
const SuperMembership = function(name) {
    this.name = name;
    this.cost = '$25';
}
  
const members = [];
const factory = new MemberFactory();
  
members.push(factory.createMember('John Doe', 'simple'));
members.push(factory.createMember('Chris Jackson', 'super'));
members.push(factory.createMember('Janice Williams', 'simple'));
members.push(factory.createMember('Tom Smith', 'standard'));
  
// console.log(members);
  
members.forEach(function(member) {
  member.define();
});




// Observer Pattern
// : 상대 클래스나 객체에 의존하지 않으면서 데이터 변경을 통보하고자 할 때 사용.


function EventObserver() {
    this.observers = [];
}
  
EventObserver.prototype = {
  subscribe: function(fn) {
    this.observers.push(fn);
    console.log(`You are now subscribed to ${fn.name}`);
  },
  unsubscribe: function(fn) {
      // Filter out from the list whatever matches the callback function. If there is no match, the callback gets to stay on the list. The filter returns a new list and reassigns the list of observers.
    this.observers = this.observers.filter(function(item){
      if(item !== fn) {
      return item;
      }

    });
    console.log(`You are now unsubscribed from ${fn.name}`);
  },
  fire: function() {
    this.observers.forEach(function(item) {
    item.call();
    });
  }
}
  
const click = new EventObserver();
  
// Event Listeners
document.querySelector('.sub-ms').addEventListener('click', function() {
  click.subscribe(getCurMilliseconds);
});
  
document.querySelector('.unsub-ms').addEventListener('click', function() {
  click.unsubscribe(getCurMilliseconds);
});
  
document.querySelector('.sub-s').addEventListener('click', function() {
  click.subscribe(getCurSeconds);
});
  
document.querySelector('.unsub-s').addEventListener('click', function() {
  click.unsubscribe(getCurSeconds);
});
  
document.querySelector('.fire').addEventListener('click', function() {
  click.fire();
});
  
// Click Handler
const getCurMilliseconds = function() {
  console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
}
  
const getCurSeconds = function() {
  console.log(`Current Seconds: ${new Date().getSeconds()}`);
}




// Mediator Pattern (중재자 패턴)
// : 모든 클래스간의 복잡한 로직(상호작용)을 캡슐화하여 하나의 클래스에 위임하여 처리하는 패턴

const User = function(name) {
    this.name = name;
    this.chatroom = null;
  }
  
User.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
    },
  recieve: function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}
  
const Chatroom = function() {
  let users = {}; // list of users
  
  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(message, from, to) {
      if(to) {
        // Single user message
        to.recieve(message, from);
      } else {
        // Mass message
        for(key in users) {
          if(users[key] !== from) {
            users[key].recieve(message, from);
          }
        }
      }
    }
  }
}
  
const brad = new User('Brad');
const jeff = new User('Jeff');
const sara = new User('Sara');
  
const chatroom = new Chatroom();
  
chatroom.register(brad);
chatroom.register(jeff);
chatroom.register(sara);
  
brad.send('Hello Jeff', jeff);
sara.send('Hello Brad, you are the best dev ever!', brad);
jeff.send('Hello Everyone!!!!');

  


// State Pattern - Small Project
// State Pattern : 객체가 상태에 따라 같은 메소드가 다른 행위를 하도록 위임하는 디자인 패턴.
// 공통 메소드의 인터페이스를 통해, 각 상태는 클래스로 분리시켜 표현한다.


const PageState = function() {
  let currentState = new homeState(this);
  
  this.init = function() {
    this.change(new homeState);
  }
  
  this.change = function(state) {
    currentState = state;
  }
};
  
// Home State
const homeState = function(page) {
  document.querySelector('#heading').textContent = null;
  document.querySelector('#content').innerHTML = `
      <div class="jumbotron">
      <h1 class="display-3">Hello, world!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </p>
    </div>
  `;
};
  
// About State
const aboutState = function(page) {
  document.querySelector('#heading').textContent = 'About Us';
  document.querySelector('#content').innerHTML = `
    <p>This is the about page</p>
  `;
};
  
  // Contact State
const contactState = function(page) {
  document.querySelector('#heading').textContent = 'Contact Us';
  document.querySelector('#content').innerHTML = `
    <form>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group">
      <label>Email address</label>
      <input type="email" class="form-control">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `;
};
  
// Instantiate pageState
const page = new PageState();
  
// Init the first state
page.init();
  
// UI Vars
const home = document.getElementById('home'),
about = document.getElementById('about'),
contact = document.getElementById('contact');
  
// Home
home.addEventListener('click', (e) => {
  page.change(new homeState);
  
  e.preventDefault();
});
  
// About
about.addEventListener('click', (e) => {
    page.change(new aboutState);
  
    e.preventDefault();
});
  
// Contact
contact.addEventListener('click', (e) => {
  page.change(new contactState);
  
  e.preventDefault();
});