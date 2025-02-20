class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def create_sample_bst():
    # Create a sample BST with swapped nodes
    root = TreeNode(10)
    root.left = TreeNode(5)
    root.right = TreeNode(20)
    root.left.left = TreeNode(3)
    root.left.right = TreeNode(25)  # Swapped with root.right.right
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(8)  # Swapped with root.left.right
    return root

def solver(first, second, curr, prev, mid):
    if curr is None:
        return prev

    # Process left subtree
    prev = solver(first, second, curr.left, prev, mid)

    # Process current node
    if prev and curr.val < prev.val:
        if not first[0]:
            first[0] = prev
            mid[0] = curr
        else:
            second[0] = curr

    prev = curr
    # Process right subtree
    return solver(first, second, curr.right, prev, mid)

def recover_tree(root):
    first = [None]
    second = [None]
    prev = [None]
    mid = [None]

    solver(first, second, root, None, mid)

    if first[0] and second[0]:
        first[0].val, second[0].val = second[0].val, first[0].val
    elif first[0] and mid[0]:
        first[0].val, mid[0].val = mid[0].val, first[0].val