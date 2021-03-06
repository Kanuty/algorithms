class Node {
	constructor(val) {
		this.value = val;
		this.left = null;
		this.right = null;
		this.repeat = 0;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
	}
	insert(value) {
		let newNode = new Node(value);
		if (!Number.isInteger(value)) {
			return console.log(` ${value} is not an integer`);
		}
		if (this.root === null) {
			this.root = newNode;
			return this;
		} else {
			let current = this.root;
			while (true) {
				if (value === current.value) {
					current.repeat += 1;
					return this;
				}
				if (value < current.value) {
					if (current.left === null) {
						current.left = newNode;
						return this;
					} else {
						current = current.left;
					}
				}
				if (value > current.value) {
					if (current.right === null) {
						current.right = newNode;
						return this;
					} else {
						current = current.right;
					}
				}
			}
		}
	}
	find(value) {
		if (this.root === null) return false;
		let current = this.root,
			found = false;
		while (current && !found) {
			if (value < current.value) {
				current = current.left;
			} else if (value > current.value) {
				current = current.right;
			} else {
				found = true;
			}
		}
		if (!found) return undefined;
		return current;
	}
	DFSPreOrder() {
		let data = [];
		function traverse(node) {
			data.push(node.value);
			if (node.left) traverse(node.left);
			if (node.right) traverse(node.right);
		}
		traverse(this.root);
		return data;
	}
	DFSPostOrder() {
		let data = [];
		function traverse(node) {
			if (node.left) traverse(node.left);
			if (node.right) traverse(node.right);
			data.push(node.value);
		}
		traverse(this.root);
		return data;
	}
}

let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(9);
tree.insert(7);
tree.insert(8);
tree.insert(2);
tree.insert(1);
tree.insert(3);
tree.insert(5);
tree.insert(15);
tree.insert(4);
tree.insert(6);
console.log(tree);
console.log(tree.find(8));
console.log(tree.DFSPreOrder());
console.log(tree.DFSPostOrder());
