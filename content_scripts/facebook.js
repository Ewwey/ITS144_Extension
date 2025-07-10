console.log("facebook.js is running");

function applyOverlay(post) {
  if (post.classList.contains('__blur-applied')) return;
  post.classList.add('__blur-applied');

  post.style.position = "relative";

  // Blur all visible children
  const walker = document.createTreeWalker(post, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node instanceof HTMLElement && !node.classList.contains('__overlay-applied')) {
      node.style.filter = "blur(6px)";
    }
  }

  // Overlay
  const overlay = document.createElement("div");
  overlay.className = "__overlay-applied";
  Object.assign(overlay.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(8px)",
    zIndex: "99999",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    color: "#000",
    fontWeight: "bold"
  });
  overlay.textContent = "⚠️ Content blurred (persistent)";
  post.appendChild(overlay);

  console.log("Blurred and overlayed post");
}

function processAllPosts() {
  document.querySelectorAll('[role="article"]').forEach(post => {
    applyOverlay(post);
  });
}

// Initial blur
processAllPosts();

// Watch for dynamic content
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.matches?.('[role="article"]')
      ) {
        applyOverlay(node);
      }
    });
  });
});
observer.observe(document.body, { childList: true, subtree: true });

// Periodic blur (backup)
setInterval(() => {
  processAllPosts();
}, 2000);
