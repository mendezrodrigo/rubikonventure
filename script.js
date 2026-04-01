const navButtons = document.querySelectorAll('.nav-button');
const views = document.querySelectorAll('.view');

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetView = button.dataset.view;

    navButtons.forEach((btn) => btn.classList.remove('active'));
    views.forEach((view) => view.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(`${targetView}-view`).classList.add('active');
  });
});

const stage = document.getElementById('network-stage');
const nodes = document.querySelectorAll('.map-node');
const detailCard = document.getElementById('network-detail-card');

function setDetailCard(node) {
  const name = node.dataset.name;
  const role = node.dataset.role;
  const city = node.dataset.city;
  const building = node.dataset.building;
  const culture = node.dataset.culture;
  const id = node.dataset.id;

  detailCard.innerHTML = `
    <p class="eyebrow">Selected Connection</p>
    <h3>${name}</h3>
    <p class="muted">${role} · ${city}</p>

    <div class="detail-block">
      <p class="section-label">What they are building</p>
      <p>${building}</p>
    </div>

    <div class="detail-block">
      <p class="section-label">Collaboration culture</p>
      <p>${culture}</p>
    </div>

    <div class="detail-block">
      <p class="section-label">Next action</p>
      <p>Open this person later in the FlowBoard or prepare a contextual ping based on what they are building.</p>
    </div>
  `;

  nodes.forEach((n) => n.classList.remove('active'));
  node.classList.add('active');

  highlightLines(id);
}

function highlightLines(id) {
  for (let i = 1; i <= 6; i++) {
    const line = document.getElementById(`line-center-${i}`);
    if (!line) continue;

    if (String(i) === String(id)) {
      line.style.stroke = 'rgba(110,144,183,0.85)';
      line.style.strokeWidth = '2.3';
      line.style.opacity = '1';
    } else {
      line.style.stroke = 'rgba(255,255,255,0.14)';
      line.style.strokeWidth = '1.2';
      line.style.opacity = '0.7';
    }
  }
}

nodes.forEach((node) => {
  node.addEventListener('mouseenter', () => setDetailCard(node));
  node.addEventListener('click', () => setDetailCard(node));
});

stage.addEventListener('mousemove', (e) => {
  const rect = stage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const offsetX = (x - centerX) / centerX;
  const offsetY = (y - centerY) / centerY;

  const rotateY = offsetX * 5;
  const rotateX = offsetY * -5;

  stage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

stage.addEventListener('mouseleave', () => {
  stage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});
