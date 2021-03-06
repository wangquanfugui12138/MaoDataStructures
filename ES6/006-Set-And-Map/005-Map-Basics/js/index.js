/*
* @Author: LENOVO
* @Date:   2018-10-19 14:51:45
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-11-05 15:18:48
*/

'use strict';

// 自定义类
class MyArray {

  // 构造函数，传入数组的容量capacity构造Array 默认数组的容量capacity=10
  constructor (capacity = 10) {
    this.data = new Array(capacity);
    this.size = 0;
  }

  // 获取数组中的元素实际个数
  getSize () {
    return this.size;
  }

  // 获取数组的容量
  getCapacity () {
    return this.data.length;
  }

  // 判断数组是否为空
  isEmpty () {
    return this.size === 0;
  }

  // 给数组扩容
  resize (capacity) {

    let newArray = new Array(capacity);
    for (var i = 0; i < this.size; i++) {
      newArray[i] = this.data[i];
    }

    // let index = this.size - 1;
    // while (index > -1) {
    //   newArray[index] = this.data[index];
    //   index --;
    // }

    this.data = newArray;
  }

  // 在指定索引处插入元素
  insert (index, element) {
    // 先判断数组是否已满
    if (this.size == this.getCapacity()) {
      // throw new Error("add error. Array is full.");
      this.resize(this.size * 2);
    }

    // 然后判断索引是否符合要求
    if (index < 0 || index > this.size) {
      throw new Error("insert error. require  index < 0 or index > size.");
    }

    // 最后 将指定索引处腾出来
    // 从指定索引处开始，所有数组元素全部往后移动一位
    // 从后往前移动
    for (let i = this.size - 1; i >= index; i--) {
      this.data[i + 1] = this.data[i];
    }

    // 在指定索引处插入元素
    this.data[index] = element;
    // 维护一下size
    this.size ++;
  }

  // 扩展 在数组最前面插入一个元素
  unshift (element) {
    this.insert(0, element);
  }

  // 扩展 在数组最后面插入一个元素
  push (element) {
    this.insert(this.size, element);
  }

  // 其实在数组中添加元素 就相当于在数组最后面插入一个元素
  add (element) {
    if (this.size == this.getCapacity()) {
      // throw new Error("add error. Array is full.");
      this.resize(this.size * 2);
    }

    // size其实指向的是 当前数组最后一个元素的 后一个位置的索引。
    this.data[this.size] = element;
    // 维护size
    this.size ++;
  }

  // get
  get (index) {
    // 不能访问没有存放元素的位置
    if (index < 0 || index >= this.size) {
      throw new Error("get error. index < 0 or index >= size.");
    }
    return this.data[index];
  }

  // 扩展： 获取数组中第一个元素
  getFirst () {
    return this.get(0);
  }


  // 扩展： 获取数组中最后一个元素
  getLast () {
    return this.get(this.size - 1);
  }


  // set
  set (index, newElement) {
    // 不能修改没有存放元素的位置
    if (index < 0 || index >= this.size) {
      throw new Error("set error. index < 0 or index >= size.");
    }
    this.data[index] = newElement;
  }

  // contain
  contain (element) {
    for (var i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        return true;
      }
    }
    return false;
  }

  // find
  find (element) {
    for (var i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        return i;
      }
    }
    return -1;
  }

  // findAll
  findAll (element) {
    // 创建一个自定义数组来存取这些 元素的索引
    let myarray = new MyArray(this.size);

    for (var i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        myarray.push(i);
      }
    }

    // 返回这个自定义数组
    return myarray;
  }

  // 删除指定索引处的元素
  remove (index) {

    // 索引合法性验证
    if (index < 0 || index >= this.size) {
      throw new Error("remove error. index < 0 or index >= size.");
    }

    // 暂存即将要被删除的元素
    let element = this.data[index];

    // 后面的元素覆盖前面的元素
    for (let i = index; i < this.size - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    this.size --;
    this.data[this.size] = null;

    // 如果size 为容量的四分之一时 就可以缩容了
    // 防止复杂度震荡 
    if (Math.floor(this.getCapacity() / 4) === this.size) {
      
        // 缩容一半
      this.resize(Math.floor(this.getCapacity() / 2));
    }

    return element;
  }

  // 扩展：删除数组中第一个元素
  shift () {
    return this.remove(0);
  }

  // 扩展： 删除数组中最后一个元素
  pop () {
    return this.remove(this.size - 1);
  }


  // 扩展： 根据元素来进行删除
  removeElement (element) {

    let index = this.find(element);
    if (index !== -1) {
      this.remove(index);
    }
  }

  // 扩展： 根据元素来删除所有元素
  removeAllElement (element) {
    let index = this.find(element);
    while (index != -1) {
      this.remove(index);
      index = this.find(element);
    }

    // let indexArray = this.findAll(element);
    // let cur, index = 0;
    // for (var i = 0; i < indexArray.getSize(); i++) {
    //   // 每删除一个元素 原数组中就少一个元素，
    //   // 索引数组中的索引值是按照大小顺序排列的，
    //   // 所以 这个cur记录的是 原数组元素索引的偏移量
    //   // 只有这样才能够正确的删除元素。
    //   index = indexArray.get(i) - cur++;
    //   this.remove(index);
    // }
  }

  // @Override toString 2018-10-17-jwl
  toString () {
    let arrInfo = `Array: size = ${this.getSize()}，capacity = ${this.getCapacity()}，\n`;
    arrInfo += `data = [`;
    for (var i = 0; i < this.size - 1; i++) {
      arrInfo += `${this.data[i]}, `;
    }
    if (!this.isEmpty()) {
     arrInfo += `${this.data[this.size - 1]}`;
    }
    arrInfo += `]`;

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定栈
class MyStack {
  constructor (capacity = 10) {
    this.myArray = new MyArray(capacity);
  }

  // 入栈
  push (element) {
    this.myArray.push(element);
  }

  // 出栈
  pop () {
    return this.myArray.pop();
  }

  // 查看栈顶的元素
  peek () {
    return this.myArray.getLast();
  }

  // 栈中实际元素的个数
  getSize () {
    return this.myArray.getSize();
  }

  // 栈是否为空
  isEmpty () {
    return this.myArray.isEmpty();
  }

  // 查看栈的容量
  getCapacity () {
    return this.myArray.getCapacity();
  }

  // @Override toString 2018-10-20-jwl
  toString () {
    let arrInfo = `Stack: size = ${this.getSize()}，capacity = ${this.getCapacity()}，\n`;
    arrInfo += `data = [`;
    for (var i = 0; i < this.myArray.size - 1; i++) {
      arrInfo += `${this.myArray.data[i]}, `;
    }
    if (!this.isEmpty()) {
     arrInfo += `${this.myArray.data[this.myArray.size - 1]}`;
    }
    arrInfo += `] stack top is right!`;

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定义队列
class MyQueue {
  constructor (capacity = 10) {
    this.myArray = new MyArray(capacity);
  }

  // 入队
  enqueue (element) {
    this.myArray.push(element);
  }

  // 出队
  dequeue () {
    return this.myArray.shift();
  }

  // 查看队首的元素
  getFront () {
    return this.myArray.getFirst();
  }

  // 查看队列中实际元素的个数
  getSize () {
    return this.myArray.getSize();
  }

  // 查看 队列当前的容量
  getCapacity () {
    return this.myArray.getCapacity();
  }

  // 查看队列是否为空
  isEmpty () {
    return this.myArray.isEmpty();
  }

  // 输出队列中的信息
  // @Override toString 2018-10-20-jwl
  toString () {
    let arrInfo = `Queue: size = ${this.getSize()}，capacity = ${this.getCapacity()}，\n`;
    arrInfo += `data = front  [`;
    for (var i = 0; i < this.myArray.size - 1; i++) {
      arrInfo += `${this.myArray.data[i]}, `;
    }
    if (!this.isEmpty()) {
     arrInfo += `${this.myArray.data[this.myArray.size - 1]}`;
    }
    arrInfo += `]  tail`;

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定义循环队列
class MyLoopQueue {
  constructor (capacity = 10) {
    // 初始化新数组
    this.data = new Array(capacity);
    // 初始化 队首、队尾的值 (索引)
    this.front = this.tail = 0;
    // 队列中实际元素个数
    this.size = 0;
  }

  // 扩容
  resize (capacity) {
    let newArray = new Array(capacity);
    let index = 0;

    for (let i = 0; i < this.size; i++) {
        // 索引可能会越界，于是就要取余一下，
        // 如果越界了，就从队首开始
        index = (this.front + i) % this.getCapacity()
        newArray[i] = this.data[index] ;
    }

    this.data = newArray;
    this.front = 0;
    this.tail = this.size;
  }

  // 入队
  enqueue (element) {

    // 判断队列中是否已满
    if ((this.tail + 1) % this.getCapacity() === this.front) {
      this.resize(this.getCapacity() * 2);
    }

    this.data[this.tail] = element;
    this.tail = (this.tail + 1) % this.getCapacity();
    this.size ++;
  }

  // 出队
  dequeue () {
    // 判断队列是否为空
    if (this.isEmpty()) {
      throw new Error("can't dequeue from an empty queue.");
    }

    let element = this.data[this.front];
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.getCapacity();
    this.size --;

    // 当size 为容量的四分之一时就缩容一倍
    if (this.size === Math.floor(this.getCapacity() / 4)) {
      this.resize(Math.floor(this.getCapacity() * 2));
    }
    return element;

  }

  // 查看队首的元素
  getFront () {
    if (this.isEmpty()) {
      throw new Error("queue is empty.");
    }

    return this.data[front];
  }

  // 查看实际的元素个数
  getSize () {
    return this.size;
  }

  // 查看容量
  getCapacity () {
    return this.data.length;
  }

  // 队列是否为空
  isEmpty () {
    // return this.size === 0;
    return this.front == this.tail;
  }
  
  // 输出循环队列中的信息
  // @Override toString 2018-10-20-jwl
  toString () {
    let arrInfo = `LoopQueue: size = ${this.getSize()}，capacity = ${this.getCapacity()}，\n`;
    arrInfo += `data = front  [`;
    for (var i = 0; i < this.myArray.size - 1; i++) {
      arrInfo += `${this.myArray.data[i]}, `;
    }
    if (!this.isEmpty()) {
     arrInfo += `${this.myArray.data[this.myArray.size - 1]}`;
    }
    arrInfo += `]  tail`;

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定义链表节点
class MyLinkedListNode {
  constructor (element = null, next = null) {
    this.element = element;
    this.next = next;
  }

  // 将一个数组对象 转换为一个链表 并且追加到当前节点上
  appendToLinkedListNode (array) {

    let head = null;
    if (this.element === null) { // 头部添加
      head = this;
      head.element = array[0];
      head.next = null;
    } else { // 插入式
      head = new MyLinkedListNode(array[0], null);
      head.next = this.next;
      this.next = head;
    }

    // 添加节点的方式  头部添加、尾部添加、中间插入

    // 尾部添加节点的方式
    for (var i = 1; i < array.length; i++) {
      head.next = new MyLinkedListNode(array[i], null);
      head = head.next;
    }
  }

  //@override
  // toString 2018-10-20-jwl
  toString () {
    return this.element.toString();
  }
}

// 自定义链表
class MyLinkedList {
  constructor () {
    this.dummyHead = new MyLinkedListNode(null, null);
    this.size = 0;
  }

  // 获取链表中实际的节点个数
  getSize () {
    return this.size;
  }

  // 判断链表是否为空
  isEmpty () {
    return this.size === 0;
  }

  // 在链表头添加节点
  addFirst (element) {
    // let node = new MyLinkedListNode(element, null);
    // node.next = this.head;
    // this.head = node;
    // this.size ++;
    
    // 改用虚拟头节点
    this.insert(0, element);
  }

  // 在链表指定索引处插入节点
  insert (index, element) {

    if (index < 0 || index > this.size) {
      throw new Error("add error. index < 0 or index > size");
    }
   
    // 第一个prev就是dummyHead
    let prev = this.dummyHead;
    // 之前变量i(索引)之所以要从 1 开始，因为索引为0的那个节点就是head，循环就不需要从0开始了，
    // 现在索引之所以要从 0 开始， 因为初始化时 多增加了一个虚拟的头节点
    // （因为这个索引为0的节点并不是dummyHead，dummyHead这个节点并不记录为链表中的实际节点），
    // 小于index是因为要找到指定索引位置的前一个节点
    // 循环是因为 要继续找到指定索引处的节点的前一个节点
    for (var i = 0; i < index; i++) {
      // 不停的切换引用，直到找到对应索引处节点的下一个节点
      prev = prev.next;
    }

    let node = new MyLinkedListNode(element, null);
    node.next = prev.next;
    prev.next = node;
    this.size ++;
    
  }

  // 扩展：在链表最后一个节点的位置添加节点
  addLast (element) {
    this.insert(this.size, element);
  }

  // 获取指定索引位置的元素
  get (index) {

    // 判断索引合法性
    if (index < 0 || index >= this.size) {
      throw new Error("get error. index < 0 or index >= size")
    }

    // 如果你要找指定索引节点的前一个节点 就使用dummyHead
    // 如果你要找到指定索引节点 就使用dummyHead.next
    // 因为duumyHead并不是第一个节点，因为它是一个虚拟节点，
    // dummyHead.next才是真正被记录的第一个节点。
    let node = this.dummyHead.next;
    for (var i = 0; i < index; i++) {
      node = node.next;
    }

    return node.element;
  }

  // 获取头节点的元素
  getFirst () {
    return this.get(0);
  }

  // 获取尾节点的元素
  getLast () {
    return this.get(this.size - 1);
  }

  // 设置指定索引位置的元素值
  set (index, element) {
        // 判断索引合法性
    if (index < 0 || index >= this.size) {
      throw new Error("get error. index < 0 or index >= size")
    }

    // 从第一个真正被记录的节点开始，从0开始
    let node = this.dummyHead.next;

    // 索引为 0 时，实际上切换到的节点 它的索引为 1
    // i < index ，当索引为 index-1 时， 实际上切换到的节点 它的索引为index
    for (let i = 0; i < index; i++) {
      // 每一次切换 都只是改变引用
      // 不的在链表中找下一个节点
      node = node.next;
    }

    node.element = element;
  }

  // 所有节点中是否有包含该元素
  contains (element) {

    let node = this.dummyHead;

    while (node.next !== null) {
      if (node.next.element === element)
        return true;
      // 不停的向下切换
      node = node.next;
    }

    return false;
  }

  // 删除指定索引位置的节点
  remove (index) {

    // 验证索引的合法性
    if (index < 0 || index >= this.size) {
      throw new Error("remove error. index < 0 or index > this.size");
    }

    let node = this.dummyHead;
    for (let i = 0; i < index; i ++) {
      node = node.next;
    }

    // 待删除的节点
    let delNode = node.next;
    // 给待删除那个节点的前一个的节点的next引用替换为
    // 但删除的这个节点的next
    node.next = delNode.next;
    // 或者这样也行
    // node.next = node.next.next;
    
    // 临时存储待删除的那个节点里的元素
    let element = delNode.element;
    // 清空 待删除的节点
    delNode = null;
    this.size --;

    return element;
  }

  // 扩展：移除链表头的元素
  removeFirst () {
    return this.remove(0);
  }

  // 扩展：移除链表尾部的元素
  removeLast () {
    return this.remove(this.size - 1);
  }

  // 新增：根据元素来删除链表中的元素 2018-11-05
  removeElement (element) {
    let prev =  this.dummyHead;

    while (prev.next !== null) {
      if (prev.next.element === element)
        break;
      prev = prev.next;
    }

    if (prev.next !== null) {
      let delNode = prev.next;
      prev.next = delNode.next;
      delNode = null;
      this.size --;
    }

  }

  // 输出链表中的信息
  // @Override toString 2018-10-21-jwl
  toString () {
    let arrInfo = `LinkedList: size = ${this.size}，\n`;
    arrInfo += `data = front  [`;
    let node = this.dummyHead.next;
    while (node.next !== null) {
      arrInfo += `${node.element}->`;
      node = node.next;
    }
    arrInfo += "NULL] tail";

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定义链表栈
class MyLinkedListStack {
  constructor () {
    this.myLinkedList = new MyLinkedList();
  }

  // 入栈
  push (element) {
    this.myLinkedList.addFirst(element)
  }

  // 出栈
  pop () {
    return this.myLinkedList.removeFirst();
  }

  // 查看栈顶元素
  peek () {
    return this.myLinkedList.getFirst();
  }

  // 查看栈中实际元素的个数
  getSize () {
    return this.myLinkedList.getSize();
  }

  // 判断栈是否为空
  isEmpty () {
    return this.myLinkedList.isEmpty();
  }

  // 输出栈中信息
  // @Override toString 2018-10-21-jwl
  toString () {
    let arrInfo = `LinkedListStack: size = ${this.getSize()}，\n`;
    arrInfo += `data = stack top [`;
    let node = this.myLinkedList.dummyHead.next;
    for (var i = 1; i < this.getSize(); i++) {
      arrInfo += `${node.element},`;
      node = node.next;
    }
    if (!this.isEmpty()) {
      arrInfo += `${node.element}`;
    }
    arrInfo += "]";

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定义链表队列
class MyLinkedListQueue {
  constructor () {
    this.front = this.tail = null;
    this.size = 0;
  }

  // 入队
  enqueue (element) {

    // 判断队尾是否为空
    if (this.tail === null) {
      // 第一个节点 即是尾也是头
      this.tail = new MyLinkedListNode(element, null);
      this.front = this.tail;
    } else {
      let node = new MyLinkedListNode(element, null);
      this.tail.next = node;
      this.tail = node;
    }
    this.size ++;
  }

  // 出队
  dequeue () {
    // 判断队首是否为空
    if (this.front === null) {
      throw new Error("front is empty.");
    }

    let delNode = this.front;
    let element = delNode.element;
    this.front = this.front.next;
    delNode = null;
    if (this.front === null) // 如果头为空了，那么尾部也为空
      this.tail = null;

    this.size --;

    return element;
  }

  // 查看队首的元素
  getFront () {
    // 判断队首是否为空
    if (this.front === null) {
      throw new Error("front is empty.");
    }

    return this.front.element;
  }

  // 查看队列中实际元素的个数
  getSize () {
    return this.size;
  }

  // 判断队列是否为空
  isEmpty () {
    return this.size === 0
  }

  // 输出队列中的信息
  // @Override toString 2018-10-21-jwl
  toString () {
    let arrInfo = `LinkedListQueue: size = ${this.getSize()}，\n`;
    arrInfo += `data = front [`;
    let node = this.front;
    for (var i = 1; i < this.getSize(); i++) {
      arrInfo += `${node.element},`;
      node = node.next;
    }
    if (!this.isEmpty()) {
      arrInfo += `${node.element}`;
    }
    arrInfo += "] tail";

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定义二分搜索树节点
class MyBinarySearchTreeNode {
  constructor (element, left = null, right = null) {
    
    // 实际存储的元素
    this.element = element;
    // 当前节点的左子树
    this.left = left;
    // 当前节点的右子树
    this.right = right
  }
}

// 自定义二分搜索树
class MyBinarySearchTree {
  constructor () {
    this.root = null;
    this.size = 0;
  }

  // 添加元素到二分搜索树中 + 
  add (element) {
    if (element === null) throw new Error("element is null. can't store.");

    this.root = this.recursiveAdd(this.root, element);
  }

  // 添加元素到二分搜索树中  递归算法 -
  recursiveAdd (node, newElement) {

    // 解决最基本的问题 也就是递归函数调用的终止条件
    if (node === null) {
       this.size ++;
       return new MyBinarySearchTreeNode(newElement);
    }
     
    // 1. 当前节点的元素比新元素大  
    // 那么新元素就会被添加到当前节点的左子树去
    // 2. 当前节点的元素比新元素小
    // 那么新元素就会被添加到当前节点的右子树去
    // 3. 当前节点的元素比新元素相等
    // 什么都不做了，因为目前不添加重复的元素
    if (this.compare(node.element, newElement) > 0)
      node.left = this.recursiveAdd(node.left, newElement);
    else if (this.compare(node.element, newElement) < 0)
      node.right = this.recursiveAdd(node.right, newElement);
    else {} 

    // 将复杂问题分解成多个性质相同的小问题，
    // 然后求出小问题的答案，
    // 最终构建出原问题的答案
    return node;
  }

  // 判断二分搜索树中是否包含某个元素 +
  contains (element) {
    if (this.root === null)
      throw new Error("root is null. can't query.");

    return this.recursiveContains(this.root, element);
  }

  // 判断二分搜索树种是否包含某个元素 递归算法 -
  recursiveContains (node, element) {
    if (node === null)
      return false;

    // 当前节点元素比 要搜索的元素 大
    if (this.compare(node.element, element) > 0)
      return this.recursiveContains(node.left, element);
    else if (this.compare(node.element, element) < 0) // 当前元素比 要搜索的元素 小
      return this.recursiveContains(node.right, element);
    else // 两个元素相等
      return true;
  }

  // 找到二分搜索树中的最大值的元素 +
  maximum () {
    if (this.size === 0)
      throw new Error("binary search tree is empty.");

    return this.recursiveMaximum(this.root).element;
  }

  // 找到二分搜索树中的最大值的元素的节点 递归算法 -
  recursiveMaximum (node) {
    
    // 解决最基本的问题  向右走再也走不动了，说明当前节点就是最大值节点。
    if (node.right === null)
      return node;

    return this.recursiveMaximum(node.right);
  }

  // 删除二分搜索树中最大值的元素的节点，并返回这个节点的元素 +
  removeMax () {
    let maxElement = this.maximum();
    this.root = this.recursiveRemoveMax(this.root);
    return maxElement;
  }

  // 删除二分搜索树中最大值的元素的节点，并返回这个节点 递归算法 -
  recursiveRemoveMax (node) {

    if (node.right === null) {
      // 先存 当前这个节点的左子树，
      // 因为可能当前这个节点仅仅没有右子树，只有左子树，
      // 那么左子树可以替代当前这个节点。
      let leftNode = node.left;
      node.left = null;
      this.size --;

      return leftNode;
    }

    node.right = this.recursiveRemoveMax(node.right);
    return node;
  }

  // 找到二分搜索树中的最小值 +
  minimum () {
    if (this.size === 0)
      throw new Error("binary search tree is empty.");

    return this.recursiveMinimum(this.root).element;
  }
  
  // 找到二分搜索树中的最小值的元素的节点 递归算法 -
  recursiveMinimum (node) {
    if (node.left === null) return node;

    return this.recursiveMinimum(node.left);
  }

  // 删除二分搜索树中最小值的元素的节点，并返回这个节点的元素 +
  removeMin () {
    let leftNode = this.minimum();
    this.root = this.recursiveRemoveMin(this.root);
    return leftNode;
  }

  // 删除二分搜索树中最小值的元素的节点，并返回这个节点 递归算法 -
  recursiveRemoveMin (node) {

    // 解决最简单的问题
    if (node.left === null) {
      let rightNode = node.right;
      node.right = null;
      this.size --;
      return rightNode;
    }

    // 将复杂的问题拆分为性质相同的小问题，
    // 然后求出这些小问题的解后构建出原问题的答案
    node.left = this.recursiveRemoveMin(node.left);
    return node;
  }

  // 删除二分搜索树上的任意节点
  remove (element) {
    this.root = this.recursiveRemove(this.root, element);
  }

  // 删除二分搜索树上的任意节点 递归算法
  // 返回删除对应元素节点后新的二分搜索树的根
  recursiveRemove (node, element) {
    if (node === null) return null;

    // 当前节点的元素值比待删除的元素小  那么就向当前节点的右子树中去找
    if (this.compare(node.element, element) < 0) {  
      node.right = this.recursiveRemove(node.right, element);
      return node;
    } else if (this.compare(node.element, element) > 0) { // 向当前节点的左子树中去找
      node.left = this.recursiveRemove(node.left, element);
      return node;
    } else { // 如果找到了相同值的节点了，开始进行相应的处理
      
      // 如果这个节点左子树为空，那么就让这个节点的右子树覆盖当前节点
      if (node.left === null) {
        let rightNode = node.right;
        node.right = null;
        this.size --;
        return rightNode;
      }

      // 如果当前节点的右子树为空，那么就让这个节点的左子树覆盖当前节点
      if (node.right === null) {
        let leftNode = node.left;
        node.left = null;
        this.size --;
        return leftNode;
      }

      // 如果当前节点的左右子树都不为空，那么就开始特殊操作
      // 1. 先找到当前节点右子树上最小的那个节点，保存起来
      // 2. 然后删除掉当前节点右子树上最小的那个节点，
      // 3. 让保存起来的那个节点覆盖掉当前节点
      //    1. 也就是保存起来的那个节点的right = 删除掉当前节点右子树上最小的节点后返回的那个节点
      //    2. 再让保存起来的那个节点的left = 当前节点的left
      // 4. 解除当前节点及其left和right，全都赋值为null，这样就相当于把当前节点从二分搜索树中剔除了
      // 5. 返回保存的这个节点

      let successtor = this.recursiveMinimum(node.right);
      successtor.right = this.recursiveRemoveMin(node.right);

      // 恢复removeMin 操作的this.size -- 带来的影响
      this.size ++;

      successtor.left = node.left;

      // 开始正式的删除当前节点的操作
      node = node.left = node.right = null;
      this.size --;
      
      // 返回当前保存的节点
      return successtor;
    }
  }


  // 前序遍历 +
  preOrder (operator) {
    this.recursivePreOrder(this.root, operator);
  }

  // 前序遍历 递归算法 -
  recursivePreOrder (node, operator) {
    if (node === null) return;

    // 调用一下操作方法
    operator(node.element);
    console.log(node, node.element);

    // 继续递归遍历左右子树
    this.recursivePreOrder(node.left, operator);
    this.recursivePreOrder(node.right, operator);
  }

  // 前序遍历 非递归算法 +
  nonRecursivePreOrder (operator) {
    let stack = new MyLinkedListStack();
    stack.push(this.root);

    let node = null;
    while (!stack.isEmpty()) {
      // 出栈操作
      node = stack.pop();

      operator(node.element); // 访问当前的节点
      console.log(node.element);

      // 栈是先入后出的，把需要后访问的节点 先放进去，先访问的节点后放进去
      // 前序遍历是访问当前节点，然后再遍历左子树，最后遍历右子树
      if (node.right !== null)
        stack.push(node.right);
      if (node.left !== null)
        stack.push(node.left);
    }
  }

  // 中序遍历 +
  inOrder (operator) {
    this.recursiveInOrder(this.root, operator);
  }

  // 中序遍历 递归算法 -
  recursiveInOrder (node, operator) {
    if (node == null) return;

    this.recursiveInOrder(node.left, operator);

    operator(node.element);
    console.log(node.element);

    this.recursiveInOrder(node.right, operator);
  }


  // 后序遍历 +
  postOrder (operator) {
    this.recursivePostOrder(this.root, operator);
  }

  // 后序遍历 递归算法 -
  recursivePostOrder (node, operator) {
    if (node == null) return;

    this.recursivePostOrder(node.left, operator);
    this.recursivePostOrder(node.right, operator);

    operator(node.element);
    console.log(node.element);
  }

  // 层序遍历
  levelOrder (operator) {
    let queue = new MyLinkedListQueue();
    queue.enqueue(this.root);

    let node = null;
    while(!queue.isEmpty()) {
      node = queue.dequeue();

      operator(node.element);
      console.log(node.element);

      // 队列 是先进先出的，所以从左往右入队
      // 栈  是后进先出的， 所以从右往左入栈
      if (node.left !== null)
        queue.enqueue(node.left);

      if (node.right !== null)
        queue.enqueue(node.right);
    }
  }


  // 获取二分搜索树中节点个数 +
  getSize () {
    return this.size;
  }

  // 返回二分搜索树是否为空的bool值 +
  isEmpty () {
    return this.size === 0;
  }

  // 新增一个比较的方法，专门用来比较新增的元素大小 -
  // 第一个元素比第二个元素大 就返回 1
  // 第一个元素比第二个元素小 就返回 -1
  // 第一个元素比第二个元素相等 就返回 0
  compare (elementA, elementB) {
    if (elementA === null || elementB === null)
      throw new Error("element is null. can't compare.");
    
    // 先直接写死
    if (elementA > elementB)
      return 1;
    else if (elementA < elementB)
      return -1;
    else
      return 0;
  }

  // 输出二分搜索树中的信息
  // @Override toString 2018-11-03-jwl
  toString () {
    let treeInfo = "";
    treeInfo += this.getBinarySearchTreeString(this.root, 0, treeInfo);
    return treeInfo;
  }

  // 写一个辅助函数，用来生成二分搜索树信息的字符串
  getBinarySearchTreeString (node, depth, treeInfo, pageContent = "") { //以前序遍历的方式

    if (node === null) {
      treeInfo += this.getDepthString(depth) + "null \r\n";

      pageContent = this.getDepthString(depth) + "null<br /><br />";
      document.body.innerHTML += `${pageContent}`;

      return treeInfo;
    }

    treeInfo += this.getDepthString(depth) + node.element + "\r\n";

    pageContent = this.getDepthString(depth) + node.element + "<br /><br />";
    document.body.innerHTML += `${pageContent}`;

    treeInfo = this.getBinarySearchTreeString(node.left, depth + 1, treeInfo);
    treeInfo = this.getBinarySearchTreeString(node.right, depth + 1, treeInfo);

    return treeInfo;
  }


  // 写一个辅助函数，用来生成递归深度字符串
  getDepthString (depth) {
    let depthString = "";
    for (var i = 0; i < depth; i++) {
      depthString += "-- ";
    }
    return depthString;
  }
}

// 自定义二分搜索树集合Set
class MyBinarySearchTreeSet {
  constructor () {
    // 借用二分搜索树来实现这个接口
    this.myBinarySearchTree = new MyBinarySearchTree();
  }

  // 添加元素
  add (element) {
    this.myBinarySearchTree.add(element);
  }

  // 移除元素
  remove (element) {
    this.myBinarySearchTree.remove(element);
  }

  // 是否包含这个元素
  contains (element) {
    return this.myBinarySearchTree.contains(element);
  }

  // 遍历操作 
  // 第一个参数 是回掉函数，
  // 第二个参数 是遍历的方式 深度优先遍历(前pre、中in、后post)，广度优先遍历(层序level)
  each (operator, method) {
    // 遍历方式默认是非递归的前序遍历，
    // 其它的遍历方式就是递归的前、中、后、层序遍历。
    switch (method) {
      case 'pre': this.myBinarySearchTree.preOrder(operator);
      break;
      case 'in': this.myBinarySearchTree.inOrder(operator);
      break;
      case 'post': this.myBinarySearchTree.postOrder(operator);
      break;
      case 'level': this.myBinarySearchTree.levelOrder(operator);
      break;
      default:  this.myBinarySearchTree.nonRecursivePreOrder(operator);
      break;
    }
  }

  // 获取集合中实际的元素个数
  getSize () {
    return this.myBinarySearchTree.getSize();
  }

  // 返回集合是否为空的bool值
  isEmpty () {
    return this.myBinarySearchTree.isEmpty();
  }
}

// 自定义链表集合Set
class MyLinkedListSet {
  // 
  constructor () {
    this.myLinkedList = new MyLinkedList();
  }

  add (element) {
    if (!this.myLinkedList.contains(element))
      this.myLinkedList.addFirst(element);
  }

  remove (element) {
    this.myLinkedList.removeElement(element);
  }

  contains (element) {
    return this.myLinkedList.contains(element);
  }

  each (operator) {
    let size = this.myLinkedList.getSize();
    for (var i = 0; i < size; i++) {
      operator(this.myLinkedList.get(i));
    }
  }

  getSize () {
    return this.myLinkedList.getSize();
  }

  isEmpty () {
    return this.myLinkedList.isEmpty();
  }
}

// 自定义链表映射节点 LinkedListMapNode
class MyLinkedListMapNode {
  constructor (key = null, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next
  }

  // @Override toString 2018-11-5-jwl
  toString () {
    return this.key.toString() + "---------->" + this.value.toString();
  }
}

// 自定义二分搜索树树映射节点 TreeMapNode
class MyBinarySearchTreeMapNode {
  constructor (key = null, value = null, left = null, right = null) {
    this.key = key;
    this.value = value;
    this.left = left;
    this.right = right;
  }

  // @Override toString 2018-11-5-jwl
  toString () {
    return this.key.toString() + "---------->" + this.value.toString();
  }
}

// main 函数
class Main {
  constructor () {

    // this.alterLine("MyStack Area");

    // let ms = new MyStack(10);
    // for (let i = 1; i <= 10 ; i++) {
    //     ms.push(i);
    //     console.log(ms.toString());
    // }

    // console.log(ms.peek());
    // this.show(ms.peek());

    // while (!ms.isEmpty()) {
    //   console.log(ms.toString());
    //   ms.pop();
    // }

    // this.alterLine("leetcode 20. 有效的括号");
    // let s = new Solution();
    // this.show(s.isValid("{ [ ( ) ] }"));
    // this.show(s.isValid(" [ ( ] ) "));

    // this.alterLine("MyQueue Area");
    // let mq = new MyQueue(10);
    // for (let i = 1; i <= 10 ; i++) {
    //     mq.enqueue(i);
    //     console.log(mq.toString());
    // }

    // console.log(mq.getFront());
    // this.show(mq.getFront());

    // while (!mq.isEmpty()) {
    //   console.log(mq.toString());
    //   mq.dequeue();
    // }
    
    // this.alterLine("MyLoopQueue Area");
    // let mlq = new MyQueue();
    // for (let i = 1; i <= 10 ; i++) {
    //     mlq.enqueue(i);
        // console.log(mlq.toString());
    // }

    // console.log(mlq.getFront());
    // this.show(mlq.getFront());

    // while (!mlq.isEmpty()) {
    //   console.log(mlq.toString());
    //   mlq.dequeue();
    // }

    // this.alterLine("Queues Comparison Area");
    // let mq = new MyQueue();
    // let mlq = new MyLoopQueue();
    // let performanceTest = new PerformanceTest();

    // let mqInfo = performanceTest.testQueue(mq, 10000);
    // let mlqInfo = performanceTest.testQueue(mlq, 10000);

    // this.alterLine("MyQueue Area");
    // console.log(mqInfo);
    // this.show(mqInfo);

    // this.alterLine("MyLoopQueue Area");
    // console.log(mlqInfo);
    // this.show(mlqInfo);

    // this.alterLine("MyLinkedList Area");
    // let mylinkedList = new MyLinkedList();

    // for (let i = 1; i <= 5 ; i++) {
    //   mylinkedList.addFirst(i);
    //   console.log(mylinkedList.toString());
    // }
    // mylinkedList.insert(2, 88888);
    // console.log(mylinkedList.toString());

    // mylinkedList.remove(2);
    // console.log(mylinkedList.toString());

    // mylinkedList.removeFirst();
    // console.log(mylinkedList.toString());

    // mylinkedList.removeLast();
    // console.log(mylinkedList.toString());
    
    // this.alterLine("MyLinkedListStack Area");
    // let myLinkedListStack = new MyLinkedListStack();
    // for (let i = 1; i <= 5 ; i++) {
    //   myLinkedListStack.push(i);
    //   console.log(myLinkedListStack.toString());
    // }

    // console.log(myLinkedListStack.peek());
    // this.show(myLinkedListStack.peek());

    // for (let i = 0; i < 5 ; i++) {
    //   console.log(myLinkedListStack.toString());
    //   myLinkedListStack.pop();
    // }
    
    // this.alterLine("Stacks Comparison Area");
    // let myStack = new MyStack();
    // let myLinkedListStack = new MyLinkedListStack();
    // let performanceTest = new PerformanceTest();

    // let myStackInfo = performanceTest.testStack(myStack, 100000);
    // let myLinkedListStackInfo = performanceTest.testStack(myLinkedListStack, 100000);

    // this.alterLine("MyStack Area");
    // console.log(myStackInfo);
    // this.show(myStackInfo);

    // this.alterLine("MyLinkedListStack Area");
    // console.log(myLinkedListStackInfo);
    // this.show(myLinkedListStackInfo);
    
    // this.alterLine("MyLinkedListQueue Area");
    // let myLinkedListQueue = new MyLinkedListQueue();
    // for (let i = 1; i <= 5 ; i++) {
    //   myLinkedListQueue.enqueue(i);
    //   console.log(myLinkedListQueue.toString());
    // }

    // console.log(myLinkedListQueue.getFront());
    // this.show(myLinkedListQueue.getFront());

    // for (let i = 0; i < 5 ; i++) {
    //   console.log(myLinkedListQueue.toString());
    //   myLinkedListQueue.dequeue();
    // }
    
    // this.alterLine("leetcode 203. 删除指定元素的所有节点");
    // let s = new Solution();

    // let arr = [1,2,3,5,1,2,1,3,5,3,5,6,3,1,5,1,3];
    // let node = new ListNode(null);
    // node.appendToLinkedListNode(arr);

    // console.log(node.toString());
    // let result = s.removeElements(node, 1);
    // console.log(result.toString());

    // this.alterLine("递归求和");
    // let calc = new Calc();
    // let arr = [1,2,3,4];
    
    // let arrInfo = `[`;
    // for (var i = 0; i < arr.length - 1; i++) {
    //   arrInfo += `${arr[i]},`
    // }
    // arrInfo += `${arr[arr.length - 1]}`;
    // arrInfo += `]`;
    // document.body.innerHTML += `${arrInfo}<br /><br />`;
    // this.show (calc.sum(arr));
    // this.show (calc.tailSum(arr));

    // this.alterLine("leetcode 203. 删除指定元素的所有节点(递归)");
    // let s = new Solution();

    // let arr = [1,2,3,5,1,2,1,3,5,3,5,6,3,1,5,1,3];
    // let node = new ListNode(null);
    // node.appendToLinkedListNode(arr);

    // console.log(node.toString());
    // let result = s.removeElements(node, 2);
    // console.log(result.toString());
  
    // this.alterLine("leetcode 203. 删除指定元素的所有节点(递归) 调试");
    // let s = new Solution();

    // let arr = [1,2,3];
    // let node = new ListNode(null);
    // node.appendToLinkedListNode(arr);
    // this.show(node);
    // s.removeElements(node, 2);
    
    // this.alterLine("MyBinarySearchTree Area");
    // let myBinarySearchTree = new MyBinarySearchTree();
    // let nums = [5, 3, 6, 8, 4, 2];
    // for (var i = 0; i < nums.length; i++) {
    //   myBinarySearchTree.add(nums[i]);
    // }

    // /////////////////
    // //      5      //
    // //    /   \    //
    // //   3    6    //
    // //  / \    \   //
    // // 2  4     8  //
    // /////////////////
    // myBinarySearchTree.preOrder(this.show);

    // this.show(myBinarySearchTree.contains(1));
    // console.log(myBinarySearchTree.contains(1));

    // this.alterLine("MyBinarySearchTree Area");
    // let myBinarySearchTree = new MyBinarySearchTree();
    // let nums = [5, 3, 6, 8, 4, 2];
    // for (var i = 0; i < nums.length; i++) {
    //   myBinarySearchTree.add(nums[i]);
    // }

    // /////////////////
    // //      5      //
    // //    /   \    //
    // //   3    6    //
    // //  / \    \   //
    // // 2  4     8  //
    // /////////////////
    
    // console.log(myBinarySearchTree.toString());
    
    // this.alterLine("MyBinarySearchTree Area");
    // let myBinarySearchTree = new MyBinarySearchTree();
    // let nums = [5, 3, 6, 8, 4, 2];
    // for (var i = 0; i < nums.length; i++) {
    //   myBinarySearchTree.add(nums[i]);
    // }

    // /////////////////
    // //      5      //
    // //    /   \    //
    // //   3    6    //
    // //  / \    \   //
    // // 2  4     8  //
    // /////////////////
    
    // this.alterLine("MyBinarySearchTree PreOrder Area");
    // myBinarySearchTree.preOrder(this.show);

    // this.alterLine("MyBinarySearchTree NonRecursivePreOrder Area");
    // myBinarySearchTree.nonRecursivePreOrder(this.show);

    // this.alterLine("MyBinarySearchTree InOrder Area");
    // myBinarySearchTree.inOrder(this.show);

    // this.alterLine("MyBinarySearchTree PostOrder Area");
    // myBinarySearchTree.postOrder(this.show);

    // this.alterLine("MyBinarySearchTree LevelOrder Area");
    // myBinarySearchTree.levelOrder(this.show);

    // this.alterLine("MyBinarySearchTree remove Min Node Area");
    // {
    //   let tree = new MyBinarySearchTree();

    //   let n = 100;
    //   let random = Math.random;

    //   for (var i = 0; i < n; i++) {
    //     tree.add(n * n * n * random());
    //   }

    //   let array = new MyArray(n);

    //   while(!tree.isEmpty()) {
    //     array.add(tree.removeMin());
    //   }

    //   // 数组中的元素从小到大排序的
    //   console.log(array.toString());

    //   for (var i = 1; i < n; i++) {
    //     //如果数组后面的元素小于数组前面的元素
    //     if (array.get(i) < array.get(i - 1))
    //       throw new Error("error. array element is not (small - big) sort.");
    //   }

    //   console.log("removeMin test completed.");
    //   this.show("removeMin test completed.");
    // }

    // this.alterLine("MyBinarySearchTree remove Max Node Area");
    // {
    //   let tree = new MyBinarySearchTree();

    //   let n = 100;
    //   let random = Math.random;

    //   for (var i = 0; i < n; i++) {
    //     tree.add(n * n * n * random());
    //   }

    //   let array = new MyArray(n);

    //   while(!tree.isEmpty()) {
    //     array.add(tree.removeMax());
    //   }

    //   // 数组中的元素从大到小排序的
    //   console.log(array.toString());

    //   for (var i = 1; i < n; i++) {
    //     //如果数组后面的元素大于数组前面的元素
    //     if (array.get(i) > array.get(i - 1))
    //       throw new Error("error. array element is not (big - small) sort.");
    //   }

    //   console.log("removeMax test completed.");
    //   this.show("removeMax test completed.");
    // }

    // this.alterLine("MyBinarySearchTree Remove Node Area");
    // {
    //   let n = 100;

    //   let tree = new MyBinarySearchTree();
    //   let array = new MyArray(n);

    //   let random = Math.random;

    //   for (var i = 0; i < n; i++) {
    //     tree.add(n * n * n * random());
    //     array.add(tree.removeMin());
    //   }

    //   // 数组中的元素从小到大排序的
    //   console.log(array.toString());

    //   for (var i = 0; i < n; i++) {
    //     tree.remove(array.get(i));
    //   }

    //   console.log("removeMin test "+ (tree.isEmpty() ? "completed." : "no completed."));
    //   this.show("removeMin test "+ (tree.isEmpty() ? "completed." : "no completed."));
    // }
    
    // this.alterLine("MyBinarySearchTreeSet Area");
    // {
    //   let n = 5;
    //   let set = new MyBinarySearchTreeSet();

    //   let random = Math.random;
    //   let temp = null;
    //   for (var i = 0; i < n; i++) {
    //     temp = random();
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //   }

    //   console.log(set.getSize());
    //   this.show(set.getSize());

    //   let array = new MyArray(n);
    //   set.each((element) => {
    //     console.log(element);
    //     this.show(element);
    //     array.add(element);
    //   });

    //   for (var i = 0; i < array.getSize(); i++) {
    //     set.remove(array.get(i));
    //   }

    //   console.log(set.getSize());
    //   this.show(set.getSize());
    // }

    // this.alterLine("MyLinkedSet Area");
    // {
    //   let n = 100;
    //   let set = new MyLinkedListSet();

    //   let random = Math.random;
    //   let temp = null;
    //   for (var i = 0; i < n; i++) {
    //     temp = random();
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //     set.add(n * n * n * temp);
    //   }

    //   console.log(set.getSize());
    //   this.show(set.getSize());

    //   let array = new MyArray(n);
    //   set.each((element) => {
    //     console.log(element);
    //     this.show(element);
    //     array.add(element);
    //   });

    //   for (var i = 0; i < array.getSize(); i++) {
    //     set.remove(array.get(i));
    //   }

    //   console.log(set.getSize());
    //   this.show(set.getSize());
    // }
    
    // this.alterLine("Set Comparison Area");
    // let myLinkedListSet = new MyLinkedListSet();
    // let myBinarySearchTreeSet = new MyBinarySearchTreeSet();
    // let performanceTest = new PerformanceTest();

    // let myLinkedListSetInfo = performanceTest.testSet(myLinkedListSet, 5000);
    // let myBinarySearchTreeSetInfo = performanceTest.testSet(myBinarySearchTreeSet, 5000);

    // this.alterLine("MyLinkedListSet Area");
    // console.log(myLinkedListSetInfo);
    // this.show(myLinkedListSetInfo);

    // this.alterLine("MyBinarySearchTreeSet Area");
    // console.log(myBinarySearchTreeSetInfo);
    // this.show(myBinarySearchTreeSetInfo);
    
    this.alterLine("leetcode 804.唯一摩尔斯密码词");
    let s = new Solution();
    let words = ["gin", "zen", "gig", "msg"];
    this.show(s.uniqueMorseRepresentations(words));
  }

  // 将内容显示在页面上
  show (content) {
    document.body.innerHTML += `${content}<br /><br />`;
  }

  // 展示分割线
  alterLine (title) {
    let line = `--------------------${title}----------------------`
    console.log(line);
    document.body.innerHTML += `${line}<br /><br />`;
  }
}

// 性能测试
class PerformanceTest {
  constructor () {}

  // 对比都列
  testQueue (queue, openCount) {
    let startTime = Date.now();

    let random = Math.random;
    for (var i = 0; i < openCount; i++) {
      queue.enqueue(random() * openCount);
    }

    while(!queue.isEmpty()) {
      queue.dequeue();
    }

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比栈
  testStack (stack, openCount) {
    let startTime = Date.now();

    let random = Math.random;
    for (var i = 0; i < openCount; i++) {
      stack.push(random() * openCount);
    }

    while(!stack.isEmpty()) {
      stack.pop();
    }

    let endTime = Date.now();

    return this.calcTime(endTime - startTime);
  }

  // 对比集合
  testSet (set, openCount) {
    let startTime = Date.now();

    let random = Math.random;
    let arr = [];
    let temp = null;

    // 第一遍测试
    for (var i = 0; i < openCount; i++) {
      temp = random();
      // 添加重复元素，从而测试集合去重的能力
      set.add(temp * openCount);
      set.add(temp * openCount);

      arr.push(temp * openCount)
    }
    
    for (var i = 0; i < openCount; i++) {
      set.remove(arr[i]);
    }

    // 第二遍测试
    for (var i = 0; i < openCount; i++) {
      set.add(arr[i]);
      set.add(arr[i]);
    }

    while(!set.isEmpty()) {
      set.remove(arr[set.getSize() - 1]);
    }

    let endTime = Date.now();

    // 求出两次测试的平均时间
    let avgTime = Math.ceil((endTime - startTime) / 2);

    return this.calcTime(avgTime);
  }

  // 计算运行的时间，转换为 天-小时-分钟-秒-毫秒
  calcTime (result) {

    //获取距离的天数
    var day = Math.floor(result / (24 * 60 * 60 * 1000));

    //获取距离的小时数
    var hours = Math.floor(result / ( 60 * 60 * 1000) % 24);


    //获取距离的分钟数
    var minutes = Math.floor(result / (60 * 1000) % 60);

    //获取距离的秒数
    var seconds = Math.floor(result / 1000 % 60);

    //获取距离的毫秒数
    var milliSeconds = Math.floor(result % 1000);

    // 计算时间
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliSeconds = milliSeconds < 100 ?
      (milliSeconds < 10 ? "00" + milliSeconds : "0" + milliSeconds) : milliSeconds;
  
    // 输出耗时字符串
    result = day + "天" + hours + "小时" + minutes + "分" +
     seconds + "秒" + milliSeconds + "毫秒" + 
     "  <<<<============>>>>  总毫秒数：" + result;

    return result;
  }
}

// 链表节点类
class ListNode {
  constructor (val) {
    this.val = val;
    this.next = null;
  }

  // 将一个数组对象 转换为一个链表 并且追加到当前节点上
  appendToLinkedListNode (array) {

    let head = null;
    if (this.val === null) { // 头部添加
      head = this;
      head.val = array[0];
      head.next = null;
    } else { // 插入式
      head = new ListNode(array[0]);
      head.next = this.next;
      this.next = head;
    }

    // 添加节点的方式  头部添加、尾部添加、中间插入

    // 尾部添加节点的方式
    for (var i = 1; i < array.length; i++) {
      head.next = new ListNode(array[i]);
      head = head.next;
    }
  }

  // 输出链表中的信息
  // @Override toString 2018-10-21-jwl
  // toString () {
  //   let arrInfo = `ListNode: \n`;
  //   arrInfo += `data = front  [`;
  //   let node = this;
  //   while (node.next !== null) {
  //     arrInfo += `${node.val}->`;
  //     node = node.next;
  //   }    
  //   arrInfo += `${node.val}->`;
  //   arrInfo += "NULL] tail";

  //   // 在页面上展示
  //   document.body.innerHTML += `${arrInfo}<br /><br /> `;

  //   return arrInfo;
  // }

  toString () {
    let arrInfo = `ListNode = `;
    arrInfo += `front  [`;
    let node = this;
    while (node.next !== null) {
      arrInfo += `${node.val}->`;
      node = node.next;
    }
    arrInfo += `${node.val}->`;
    arrInfo += "NULL] tail";

    return arrInfo;
  }
}

// 递归基础类
class Calc {
  constructor () {}

  // 递归求和
  sum (array, cur = 0) {

    // 解决最基本的问题
    if (cur === array.length) {
      return 0;
    }

    // 化归思想
    // 将原问题分解为性质相同的小问题
    // 将众多小问题的答案构建出原问题的答案
    return array[cur] + this.sum(array, cur + 1);

  }
  // 尾递归求和
  tailSum (array, cur = 0, result = 0) {

    // 解决最基本的问题
    if (cur === array.length) {
      return result; // 这里是上面的sum不一样，这里直接返回最终计算结果
    }

    // 化归思想 ： 将原问题分解为性质相同的小问题，使用小问题的解构建出原问题的解。
    // 减少或者复用程序调用系统栈： 将运算操作一次性执行完毕，然后再执行子函数。
    return this.tailSum(array, cur + 1, result + array[cur]);
  }
}

// 答题
class Solution {

  // leetcode 20. 有效的括号
  isValid (s) {
    
    /**
     * @param {string} s
     * @return {boolean}
     */
    var isValid = function(s) {
        let stack = [];

        // 以遍历的方式进行匹配操作
        for (let i = 0; i < s.length; i++) {

          // 是否是正括号
          switch (s[i]) {
            case '{' :
            case '[' : 
            case '(' : 
              stack.push(s[i]);
            break;
            default:
              break;
          }
          // 是否是反括号
          switch (s[i]) {
            case '}' :
              if (stack.length === 0 || stack.pop() !== '{') {
                console.log("valid error. not parentheses. in");
                return false;
              }
            break;
            case ']' :

              if (stack.length === 0 || stack.pop() !== '[') {
                console.log("valid error. not parentheses. in");
                return false;
              }
            break;
            case ')' : 
              if (stack.length === 0 || stack.pop() !== '(') {
                console.log("valid error. not parentheses. in");
                return false;
              }
            break;
            default:
            break;
          }
        }

        // 是否全部匹配成功
        if (stack.length === 0) {
          return true;
        } else {
          console.log("valid error. not parentheses. out");
          return false;
        }
    }

    return isValid(s);
  }

  // leetcode 203. 移除链表元素
  removeElements (head, val) {

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} val
     * @return {ListNode}
     */
    var removeElements = function(head, val) {
    
      // 对头步进行特殊处理
      while(head !== null && head.val === val) {
        head = head.next;
      }

      // 处理后的头部如果为null 那直接返回
      if (head === null) {
        return null;
      }

      // 因为头部已经做了特殊处理， head即不为null 并且 head.val不等于null
      // 那么可以直接从 head的下一个节点开始判断。
      let prev = head;
      while(prev.next !== null) {
        if (prev.next.val === val) {
          let delNode = prev.next;
          prev.next = delNode.next;
          delNode = null;
        } else {
          prev = prev.next;
        }
      }

      return head;
    };
    
    var removeElements = function(head, val) {
      
      if (head === null) {
        return null;
      }

      let dummyHead = new ListNode(0);
      dummyHead.next = head;
      let cur = dummyHead;
      while (cur.next !== null) {
        if (cur.next.val === val) {
          cur.next = cur.next.next;
        } else {
          cur = cur.next;
        }
      }
      return dummyHead.next;
    };

    // 递归求解三种方式
    var removeElements = function(head, val) {

      // 解决最基本的问题
      if (head === null) {
        return null;
      }

      // 第一种解决方式
      //   let node = removeElements(head.next, val);

      //   if (head.val === val) {
      //     head = node;
      //   } else {
      //     head.next = node;
      //   }

      //   return head;
      
      // 第二种解决方式    
      // if (head.val === val) {
      //   head = removeElements(head.next, val);
      // } else {
      //   head.next = removeElements(head.next, val);
      // }
      // return head;
        
      // 第三种方式
      head.next = removeElements(head.next, val);
      if (head.val === val) {
        return head.next;
      } else {
        return head;
      }
    }

    // 尾递归的方式 失败 没有到达那个程度
    // var removeElements = function(head, val, node = null) {
    //   if (head === null) {
    //     return node;
    //   }


    //   return removeElements(head.next, val , node = head);

    // }
    
    // 深入理解递归过程
    var removeElements = function(head, val, depth = 0) {

      // 首次输出 开始调用函数
      let depthString = generateDepathString(depth);
      let info =  depthString + "Call: remove " + val + " in " + head;
      show(info);

      if (head === null) {
        // 第二次输出  解决最基本的问题时
        info = depthString + "Return ：" + head;
        show(info);

        return null;
      }

      let result = removeElements(head.next, val, depth + 1);

      // 第三次输出 将原问题分解为小问题
      info = depthString + "After： remove " + val + " ：" + result;
      show(info);

      let ret = null;
      if (head.val === val) {
        ret = result;
      } else {
        head.next = result;
        ret = head;
      }

      // 第四次输出 求出小问题的解
      info = depthString + "Return ：" + ret;
      show(info);

      return ret;
    }

    // 辅助函数 生成递归深度字符串
    function generateDepathString (depth) {
      let arrInfo = ``;
      for (var i = 0; i < depth; i++) {
        arrInfo += `-- `;// -- 表示深度，--相同则代表在同一递归深度
      }
      return arrInfo;
    }

    // 辅助函数 输出内容 到页面和控制台上
    function show (content) {
      document.body.innerHTML += `${content}<br /><br />`;
      console.log(content);
    }

    return removeElements(head, val);
  }

  // leetcode 804. 唯一摩尔斯密码词
  uniqueMorseRepresentations (words) {

    /**
     * @param {string[]} words
     * @return {number}
     * 使用自己的二分搜索树来实现
     */
    var uniqueMorseRepresentations = function(words) {
        // 摩斯码
        const codes = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
        
        const myBinarySearchTreeSet = new MyBinarySearchTreeSet();
        let content = "";
        // 获取起始字符的aceii码，
        // 从而可以求出某个单词的每一个字符在字母表中占的位置索引，
        // 根据这些位置索引就可以在摩斯表中找到相应的摩斯码，
        // 一个单词就是一组摩斯码，然后使用set添加，就可以直接实现去重的操作了
        const start = "a".charCodeAt(0);
        for (const word of words) {
          for (const w of word) 
            content += codes[w.charCodeAt(0) - start];

          myBinarySearchTreeSet.add(content);
          content = "";
        }

        return myBinarySearchTreeSet.getSize();
    };

    /**
     * @param {string[]} words
     * @return {number}
     * 使用系统内置的Set集合类
     */
    var uniqueMorseRepresentations = function(words) {
        // 摩斯码
        const codes = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
        
        const set = new Set();
        let content = "";
        // 获取起始字符的aceii码，
        // 从而可以求出某个单词的每一个字符在字母表中占的位置索引，
        // 根据这些位置索引就可以在摩斯表中找到相应的摩斯码，
        // 一个单词就是一组摩斯码，然后使用set添加，就可以直接实现去重的操作了
        const start = "a".charCodeAt(0);
        for (const word of words) {
          for (const w of word) 
            content += codes[w.charCodeAt(0) - start];

          set.add(content);
          content = "";
        }

        return set.size;
    };

    return uniqueMorseRepresentations(words);
  }
}

// Student
class Student {
  constructor (studentName, studentScore) {
    this.name = studentName;
    this.score = studentScore;
  }

  //@Override toString 2018-10-19-jwl
  toString () {
    let studentInfo = `Student(name: ${this.name}, score: ${this.score})`;
    return studentInfo;
  }
}

// 页面加载完毕
window.onload = function () {
  // 执行主函数
  new Main();
}
