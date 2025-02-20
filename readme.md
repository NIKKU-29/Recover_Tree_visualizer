# Recover Binary Search Tree Visualizer

A web-based visualization tool for understanding and solving the LeetCode problem ["Recover Binary Search Tree"](https://leetcode.com/problems/recover-binary-search-tree/). This tool helps visualize how to identify and fix two nodes that were swapped in a BST.

## Problem Description

You are given the `root` of a binary search tree (BST), where exactly two nodes were swapped by mistake. Recover the tree without changing its structure.

The visualization helps understand:
- How to identify the swapped nodes
- The inorder traversal approach
- The step-by-step recovery process

## Project Structure

```
── main.py
├── bst.py
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── bst_visualizer.js
```

## Prerequisites

- Python 3.x
- Flask

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recover-bst-visualizer.git
cd recover-bst-visualizer
```

2. Install the required dependencies:
```bash
pip install flask
```

## Running the Application

1. Ensure all files are in their correct directories
2. Run the Flask application:
```bash
python main.py
```
3. Access the visualization at:
```
http://localhost:5000
```

## Features

- Interactive visualization of binary search trees
- Step-by-step demonstration of the recovery process
- Visual highlighting of:
  - Swapped nodes
  - Current node being processed
  - Inorder traversal path
- Option to input custom BST configurations
- Support for both Morris Traversal (O(1) space) and Recursive (O(n) space) approaches

- ![image](https://github.com/user-attachments/assets/aab77694-53f1-4e78-9d3f-8ea9040bc355)


## How It Works

1. The visualizer shows a BST with two incorrectly swapped nodes
2. Users can:
   - See the inorder traversal sequence
   - Identify violation points in BST properties
   - Watch the recovery process step by step
   - Input their own test cases

## Technical Implementation

The solution visualizes two main approaches:
1. Using extra space (Recursive)
2. Using Morris Traversal (Constant space)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/visualization-enhancement`)
3. Commit your changes (`git commit -m 'Add visualization enhancement'`)
4. Push to the branch (`git push origin feature/visualization-enhancement`)
5. Open a Pull Request

![image](https://github.com/user-attachments/assets/98af28e6-9c11-4db2-9334-ff7cca5922bc)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on LeetCode Problem #99: Recover Binary Search Tree
- Inspired by the need to better understand BST properties and recovery techniques

