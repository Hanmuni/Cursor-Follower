# Cursor Follower - Concept Summary

## 1. The Data Flow
1. **Trigger:** The `mousemove` event fires, providing the raw data (`e.clientX` and `e.clientY`).
2. **State Update:** We store these coordinates in our `mousePosition` object and set `isMoving = true`.
3. **DOM Update (Scheduled):** We pass our `updateUI` function to `requestAnimationFrame`. The browser waits for its next natural refresh cycle to read our state and update the DOM.
4. **The Stop:** Every mouse movement resets a 100ms timer (`clearTimeout`). If the mouse stays still for 100ms, the timer finishes, triggering `handleMouseStop`, which sets `isMoving = false` and updates the UI.

## 2. Key Concepts & Analogies

### The Motion Sensor (Debouncing / Timers)
The `setTimeout` and `clearTimeout` logic acts like a motion sensor light. Every time the mouse moves, the sensor detects it and resets its internal countdown. As long as movement continues, the light stays on (`isMoving = true`). When movement stops for the duration of the `IDLE_TIMEOUT` (100ms), the countdown finishes, and the light turns off (`isMoving = false`).

### The Subway Train (`requestAnimationFrame`)
The browser's rendering engine is like a subway train that departs exactly 60 times a second (~16ms). Instead of forcing the browser to redraw the screen immediately on every single tiny mouse movement (which causes lag), `requestAnimationFrame(updateUI)` says: *"Here is my updated data. Please put it on the very next scheduled train."* This synchronizes our DOM updates with the browser's natural refresh rate.

### The Train Ticket (`hasTicket` / `frameRequested`)
To prevent buying hundreds of tickets for the exact same train, we use a boolean latch (`hasTicket`). When the mouse moves, we check if we already have a ticket for the next train. If not, we buy one (`hasTicket = true`) and schedule the update. Once the train departs and the update runs, we hand our ticket to the conductor (`hasTicket = false`), allowing us to buy a new ticket for the next train.

### Hardware Acceleration (`transform: translate`)
Changing `top` and `left` forces the CPU to recalculate the layout of the entire page. Changing `transform: translate()` hands the work off to the GPU (Graphics Card), which moves the pixels without recalculating the page layout, resulting in a much smoother animation.

### Magic Numbers vs. Constants
We extract hard-coded numbers (like `100` for our timer) into `UPPER_SNAKE_CASE` variables (e.g., `const IDLE_TIMEOUT = 100;`). This documents the intent of the number and makes it easy to configure later without hunting through the logic.

### Inline Styles vs. CSS Classes
We generally let CSS handle styling by toggling classes. However, we use inline styles via JavaScript (`element.style.transform`) when the styling is highly dynamic and depends on real-time data (like exact X/Y mouse coordinates) that CSS cannot know in advance.
