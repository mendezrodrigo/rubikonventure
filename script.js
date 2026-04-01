const tabButtons = document.querySelectorAll('.tab-button');
const views = document.querySelectorAll('.view');
const nodes = document.querySelectorAll('.node');
const collaboratorPanel = document.getElementById('collaborator-panel');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const view = button.dataset.view;

    tabButtons.forEach((btn) => btn.classList.remove('active'));
    views.forEach((section) => section.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(`${view}-view`).classList.add('active');
  });
});

nodes.forEach((node) => {
  node.addEventListener('click', () => {
    const name = node.dataset.name;
    const role = node.dataset.role;
    const city = node.dataset.city;
    const building = node.dataset.building;

    collaboratorPanel.innerHTML = `
      <h3>${name}</h3>
      <p class="muted">${role} · ${city}</p>
      <div class="section-block building" style="margin-top:16px;">
        <p class="eyebrow">What they are building</p>
        <p>${building}</p>
      </div>
      <button class="action-button">Open in FlowBoard</button>
    `;
  });
});
