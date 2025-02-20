class TreeNode {
    constructor(val, x, y) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
        this.isViolation = false;
        this.isMiddleCandidate = false;
    }
}

class BSTVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.animationFrames = [];s
        this.currentFrame = 0;
        this.animationRunning = false;
        this.currentArrayContainer = document.getElementById('currentArrayContainer');
        this.sortedArrayContainer = document.getElementById('sortedArrayContainer');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.initializeBST();

        document.getElementById('startBtn').addEventListener('click', () => this.startAnimation());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetVisualization());
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = 400;
        this.draw();
    }

    initializeBST() {
        this.root = new TreeNode(10, this.canvas.width / 2, 50);
        this.root.left = new TreeNode(5, this.canvas.width / 4, 120);
        this.root.right = new TreeNode(20, (this.canvas.width * 3) / 4, 120);
        this.root.left.left = new TreeNode(3, this.canvas.width / 8, 190);
        this.root.left.right = new TreeNode(25, (this.canvas.width * 3) / 8, 190);
        this.root.right.left = new TreeNode(15, (this.canvas.width * 5) / 8, 190);
        this.root.right.right = new TreeNode(8, (this.canvas.width * 7) / 8, 190);

        this.generateAnimationFrames();
        this.updateArrayVisualization();
    }

    generateAnimationFrames() {
        this.nodes = [];
        this.firstViolation = null;
        this.secondViolation = null;
        this.middleViolation = null;
        this.prevNode = null;

        this.solver(this.root);

        // Generate sorted array
        this.sortedArray = [...this.nodes].sort((a, b) => a.val - b.val);

        // Create animation frames
        this.animationFrames = [];
        for (let i = 0; i < this.nodes.length; i++) {
            const frame = {
                nodes: JSON.parse(JSON.stringify(this.nodes.slice(0, i + 1))),
                currentIndex: i
            };
            this.animationFrames.push(frame);
        }

        // Add final frame with corrected tree
        const finalFrame = {
            nodes: JSON.parse(JSON.stringify(this.nodes)),
            currentIndex: -1,
            corrected: true
        };

        // Perform the swap
        if (this.firstViolation && this.secondViolation) {
            [this.firstViolation.val, this.secondViolation.val] = 
            [this.secondViolation.val, this.firstViolation.val];
        } else if (this.firstViolation && this.middleViolation) {
            [this.firstViolation.val, this.middleViolation.val] = 
            [this.middleViolation.val, this.firstViolation.val];
        }

        this.animationFrames.push(finalFrame);
    }

    solver(curr) {
        if (!curr) return;

        // Process left subtree
        this.solver(curr.left);

        // Process current node
        this.nodes.push(curr);

        if (this.prevNode && curr.val < this.prevNode.val) {
            if (!this.firstViolation) {
                this.firstViolation = this.prevNode;
                this.middleViolation = curr;
                this.firstViolation.isViolation = true;
                curr.isMiddleCandidate = true;
            } else {
                this.secondViolation = curr;
                curr.isViolation = true;
            }
        }

        this.prevNode = curr;

        // Process right subtree
        this.solver(curr.right);
    }

    updateArrayVisualization() {
        // Update current array
        this.currentArrayContainer.innerHTML = '';
        const frame = this.animationFrames[this.currentFrame] || { nodes: [], currentIndex: -1 };

        const inorderArray = this.nodes.map(node => ({
            value: node.val,
            isViolation: node.isViolation,
            isMiddleCandidate: node.isMiddleCandidate,
            current: false
        }));

        if (frame.currentIndex >= 0) {
            inorderArray[frame.currentIndex].current = true;
        }

        inorderArray.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';

            if (item.current) {
                element.classList.add('current');
            } else if (item.isViolation && index <= frame.currentIndex) {
                element.classList.add('violation');
            } else if (item.isMiddleCandidate && index <= frame.currentIndex) {
                element.classList.add('middle-candidate');
            }

            if (item.current) {
                const pointer = document.createElement('div');
                pointer.className = 'array-pointer';
                pointer.textContent = '↑';
                element.appendChild(pointer);
            }

            element.textContent = item.value;
            this.currentArrayContainer.appendChild(element);
        });

        // Update sorted array
        this.sortedArrayContainer.innerHTML = '';
        this.sortedArray.forEach(node => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = node.val;
            this.sortedArrayContainer.appendChild(element);
        });
    }

    drawNode(node, frame) {
        const fillColor = node.isViolation ? '#dc3545' : 
                         node.isMiddleCandidate ? '#0dcaf0' : 
                         '#0d6efd';

        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
        this.ctx.strokeStyle = '#fff';
        this.ctx.stroke();

        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(node.val, node.x, node.y);
    }

    drawEdge(from, to) {
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const frame = this.animationFrames[this.currentFrame];
        if (!frame) return;

        // Draw edges first
        for (const node of frame.nodes) {
            if (node.left) this.drawEdge(node, node.left);
            if (node.right) this.drawEdge(node, node.right);
        }

        // Draw nodes
        for (const node of frame.nodes) {
            this.drawNode(node, frame);
        }

        this.updateArrayVisualization();
    }

    startAnimation() {
        if (this.animationRunning) return;
        this.animationRunning = true;
        this.animate();
    }

    animate() {
        if (this.currentFrame >= this.animationFrames.length) {
            this.animationRunning = false;
            return;
        }

        this.draw();
        this.currentFrame++;

        if (this.animationRunning) {
            setTimeout(() => {
                requestAnimationFrame(() => this.animate());
            }, 1000);
        }
    }

    resetVisualization() {
        this.currentFrame = 0;
        this.animationRunning = false;
        this.draw();
    }
}

window.addEventListener('load', () => {
    const visualizer = new BSTVisualizer('bstCanvas');
});