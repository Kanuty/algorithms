class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class SinglyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	push(val) {
		const newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
		this.length += 1;
		return this;
	}
	pop() {
		if (!this.head) return null;
		let current = this.head;
		let newTail = current;
		while (current.next) {
			newTail = current;
			current = current.next;
		}
		this.tail = newTail;
		this.tail.next = null;
		this.length -= 1;
		if (this.length === 0) {
			this.head = null;
			this.tail = null;
		}
		return current;
	}
	shift() {
		if (this.length === 0) return null;
		let currentHead = this.head;
		this.head = currentHead.next;
		this.length -= 1;
		return currentHead;
	}
	unShift(val) {
		let newNode = new Node(val);
		if (!this.head) {
			this.head = newNode;
			this.tail = this.head;
		} else {
			newNode.next = this.head;
			this.head = newNode;
		}
		this.length += 1;
		return this;
	}
	get(index) {
		if (index < 0 || index >= this.length) return null;
		let counter = 0;
		let current = this.head;
		while (counter !== index) {
			current = current.next;
			counter += 1;
		}
		return current;
	}
	set(index, val) {
		let foundNode = this.get(index);
		if (foundNode) {
			foundNode.val = val;
			return true;
		}
		return false;
	}
	insert(index, val) {
		if (index < 0 || index > this.length) return false;
		if (index === this.length) return !!this.push(val);
		if (index === 0) return !!this.unShift(val);

		let newNode = new Node(val);
		let prev = this.get(index - 1);
		let temp = prev.next;
		prev.next = newNode;
		newNode.next = temp;
		this.length += 1;
		return true;
	}
	remove(index) {
		if (index < 0 || index > this.length) return null;
		if (index === 0) return this.shift();
		if (index === this.length - 1) return this.pop();
		let previousNode = this.get(index - 1);
		let removed = prebiousNode.next;
		previousNode.next = removed.next;
		this.length -= 1;
		return removed;
	}
	print() {
		let arr = [];
		letcurrent = this.head;
		while (current) {
			arr.push(current.val);
			current = current.next;
		}
		console.log(arr);
	}
	reverse() {
		let node = this.head;
		this.head = this.tail;
		this.tail = node;
		let next;
		let prev = null;
		for (let i = 0; i < this.length; i += 1) {
			next = node.next;
			node.next = prev;
			prev = node;
			node = next;
		}
		return this;
	}
}

const list = new SinglyLinkedList();
list.push('1');
list.push('2');
list.push('3');
list.push('4');
list.pop();
list.shift();
list.unShift('17');
list.set(1, 99);
list.remove(2);
list.push('5');
list.push('6');
list.push('7');
list.push('8');
list.reverse();

console.log(list, list.get(1), list.get(2));
