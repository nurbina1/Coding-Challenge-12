// Set up the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let startX, startY;
let selectedTool = 'line';
let color = document.getElementById('color').value;

// Tool selection handler
document.querySelectorAll('input[name="tool"]').forEach(tool => {
  tool.addEventListener('change', (e) => {
    selectedTool = e.target.value;
  });
});

// Update color on input change
document.getElementById('color').addEventListener('input', (e) => {
  color = e.target.value;
});

// Start drawing on mouse down
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
});

// Handle drawing as mouse moves
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  // Clear canvas so shapes don’t overlap during drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Capture current mouse position
  const currentX = e.offsetX;
  const currentY = e.offsetY;

  // Draw the chosen shape
  drawShape(startX, startY, currentX, currentY);
});

// End drawing on mouse up
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.beginPath(); // Reset the path to avoid continuous drawing
});

// Draw the chosen shape based on the tool selected
function drawShape(x1, y1, x2, y2) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  
  if (selectedTool === 'line') {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  } else if (selectedTool === 'rectangle') {
    ctx.rect(x1, y1, x2 - x1, y2 - y1);
    ctx.stroke();
  } else if (selectedTool === 'circle') {
    const radius = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

// Clear canvas when the "Clear" button is clicked
document.getElementById('clearCanvas').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});