/**
 * ruler.js
 * A draggable, resizable screen ruler overlay that zooms from 25% to 400%
 * using CTRL + Mouse Scroll.
 */

(function initRuler() {
    // Check if already injected
    if (document.getElementById('custom-ruler-overlay')) return;

    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/ruler.css';
    document.head.appendChild(link);

    // 2. Create DOM structure
    const overlay = document.createElement('div');
    overlay.id = 'custom-ruler-overlay';
    
    // Default state
    let zoomLevel = 1.0; // 100%
    let width = 600;
    let height = 400;
    
    overlay.innerHTML = `
        <div class="ruler-container" id="ruler-container">
            <div class="ruler-header" id="ruler-header">
                <div class="ruler-title">
                    📐 Screen Ruler
                    <span class="ruler-zoom-display" id="ruler-zoom-text">100%</span>
                </div>
                <div class="ruler-controls">
                    <button class="ruler-close" id="ruler-close" title="Close">✖</button>
                </div>
            </div>
            <div class="ruler-body" id="ruler-body" style="width: ${width}px; height: ${height}px;">
                <div class="ruler-corner"></div>
                <div class="ruler-h">
                    <div class="ruler-h-ticks"></div>
                </div>
                <div class="ruler-v">
                    <div class="ruler-v-ticks"></div>
                </div>
                <div class="ruler-readout" id="ruler-readout">${width} x ${height}px</div>
                <div class="ruler-resize-se" id="ruler-resize-se"></div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Elements
    const header = document.getElementById('ruler-header');
    const container = document.getElementById('ruler-container');
    const body = document.getElementById('ruler-body');
    const closeBtn = document.getElementById('ruler-close');
    const resizeHandle = document.getElementById('ruler-resize-se');
    const readout = document.getElementById('ruler-readout');
    const zoomText = document.getElementById('ruler-zoom-text');

    // --- ZOOM LOGIC (CTRL + SCROLL) ---
    // Prevent default browser zoom when mouse is over the ruler box? 
    // Or intercept it globally? The request asks for CTRL + scroll zoom 25% to 400%.
    // Usually browser zoom intercepts at the window level and is hard to prevent, 
    // but setting non-passive listener on window can sometimes catch it, or we just listen 
    // while hovering the ruler. Let's make it work globally if possible, or specifically on the ruler.
    
    window.addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
            e.preventDefault(); // Try to prevent browser zoom
            
            // Calculate zoom
            const zoomSpeed = 0.1;
            let delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed; // scroll up = zoom in
            
            zoomLevel += delta;
            
            // Clamp between 25% (0.25) and 400% (4.0)
            if (zoomLevel < 0.25) zoomLevel = 0.25;
            if (zoomLevel > 4.0) zoomLevel = 4.0;
            
            // Apply scale via CSS variable
            overlay.style.setProperty('--ruler-zoom', zoomLevel.toFixed(2));
            
            // Update display
            zoomText.textContent = Math.round(zoomLevel * 100) + '%';
        }
    }, { passive: false });

    // --- DRAG LOGIC ---
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    header.addEventListener('mousedown', function(e) {
        isDragging = true;
        
        // Get current computed transform translation or calculate offset
        const rect = overlay.getBoundingClientRect();
        
        // We use position fixed, so we update top/left directly and remove the transform translate 
        // to make dragging easier, or just calculate delta.
        // Let's remove the transform translate(-50%, -50%) once user starts dragging
        // and rely solely on top/left to avoid math complexities with zoom scale.
        
        if (overlay.style.transform.includes('translate')) {
            overlay.style.top = rect.top + 'px';
            overlay.style.left = rect.left + 'px';
            overlay.style.transform = `scale(var(--ruler-zoom, 1))`;
            overlay.style.transformOrigin = 'top left'; // change origin so scaling happens from corner
        }

        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseFloat(overlay.style.left) || rect.left;
        initialTop = parseFloat(overlay.style.top) || rect.top;
        
        e.preventDefault();
    });

    window.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            overlay.style.left = (initialLeft + dx) + 'px';
            overlay.style.top = (initialTop + dy) + 'px';
        }
        
        if (isResizing) {
            // Adjust calculation based on zoom level to ensure 1:1 mouse tracking
            const dx = (e.clientX - resizeStartX) / zoomLevel;
            const dy = (e.clientY - resizeStartY) / zoomLevel;
            
            let newWidth = initialWidth + dx;
            let newHeight = initialHeight + dy;
            
            // Min bounds
            if (newWidth < 100) newWidth = 100;
            if (newHeight < 100) newHeight = 100;
            
            body.style.width = newWidth + 'px';
            body.style.height = newHeight + 'px';
            
            readout.textContent = Math.round(newWidth) + ' x ' + Math.round(newHeight) + 'px';
        }
    });

    window.addEventListener('mouseup', function() {
        isDragging = false;
        isResizing = false;
    });

    // --- RESIZE LOGIC ---
    let isResizing = false;
    let resizeStartX, resizeStartY, initialWidth, initialHeight;

    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        resizeStartX = e.clientX;
        resizeStartY = e.clientY;
        initialWidth = body.offsetWidth;
        initialHeight = body.offsetHeight;
        e.preventDefault();
        e.stopPropagation(); // prevent drag
    });

    // --- CLOSE ---
    closeBtn.addEventListener('click', function() {
        overlay.remove();
    });

})();
