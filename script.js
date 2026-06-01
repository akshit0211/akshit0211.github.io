// ==== Modern Tab Navigation Engine ====
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn, [data-target]');
  const panels = document.querySelectorAll('.view-panel');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function switchTab(targetId) {
    if (!targetId) return;

    // Remove active markers from all panel views and tab triggers
    panels.forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Activate the targeted panel view
    const activePanel = document.getElementById(targetId);
    if (activePanel) {
      activePanel.classList.add('active');
    }

    // Activate the matching tab design indicator
    const activeTab = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
    }

    // Scroll cleanly up to check content top directly below navigation bars
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle click bindings across control registers
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = tab.getAttribute('data-target');
      switchTab(target);
    });
  });
});