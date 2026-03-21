/* =============================================
   ROOMS.JS — Room grid builder
   ============================================= */

function buildRoomGrid(containerId, rooms) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  rooms.forEach(room => {
    const dotClass = {
      occupied:    'd-occ',
      available:   'd-avl',
      underused:   'd-und',
      maintenance: 'd-mnt',
    }[room.s];

    const tile = document.createElement('div');
    tile.className = 'room-tile ' + room.s;
    tile.innerHTML = `
      <div class="rt-dot ${dotClass}"></div>
      <div class="rt-name">${room.id}</div>
      <div class="rt-cap">${room.cap} seats</div>
    `;

    if (room.s === 'available') {
      tile.title = 'Click to book ' + room.id;
      tile.onclick = () => openModal(room.id, room.cap, 'Floor ' + room.id.charAt(room.id.length - 3));
    }

    container.appendChild(tile);
  });
}

function initRoomsPanel() {
  buildRoomGrid('roomgrid-A', DATA.rooms.A);
  buildRoomGrid('roomgrid-B', DATA.rooms.B);
  buildRoomGrid('roomgrid-C', DATA.rooms.C);
  initRoomsCharts();
}
