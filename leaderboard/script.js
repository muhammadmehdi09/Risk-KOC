const API_URL =
  "https://script.google.com/macros/s/AKfycbzPAsUgkEWLusHQipn7ezV2BLbdPYbHEpA6CAAzvLiEpfsTNkH5sd-RN_qsWiVUDy36/exec";

const tableBody =
  document.getElementById("leaderboard");

const searchInput =
  document.getElementById("searchInput");

let allPlayers = [];

/*
  Darkened Rank Theme
*/

const RANK_COLORS = {

  "Knight-Dame": "#d98aa1",

  "Baronet-Baronetess": "#7f6bb3",
  "Baronet-Baroness": "#7f6bb3",

  "Baron-Baronness": "#c06d0b",
  "Baron-Baroness": "#c06d0b",

  "Viscount-Viscountess": "#b02a3a",

  "Count-Countess": "#c9c9c9",

  "Marquess-Marchioness": "#262b30",

  "Duke-Duchess": "#4f8b5f",

  "Prince-Princess": "#d1ad3f",

  "King-Queen": "#3f86b8"
};

/*
  Convert hex to rgba
*/

function hexToRgba(hex, alpha = 0.2) {

  const clean =
    hex.replace("#", "");

  const r =
    parseInt(clean.substring(0, 2), 16);

  const g =
    parseInt(clean.substring(2, 4), 16);

  const b =
    parseInt(clean.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/*
  Render leaderboard
*/

function renderLeaderboard(players) {

  tableBody.innerHTML = "";

  players.forEach((player) => {

    const rank =
      player.currentRank || "Unknown";

    const color =
      RANK_COLORS[rank] || "#ffffff";

    const row =
      document.createElement("tr");

    /*
      Rank visuals
    */

    row.style.background = `
      linear-gradient(
        90deg,
        ${hexToRgba(color, 0.30)} 0%,
        ${hexToRgba(color, 0.10)} 60%,
        transparent 100%
      )
    `;

    row.style.borderLeft =
      `14px solid ${color}`;

    row.style.boxShadow = `
      inset 0 0 0 1px ${hexToRgba(color, 0.25)},
      0 6px 14px rgba(0,0,0,0.25)
    `;

    row.style.transition =
      "0.35s ease";

    row.style.cursor =
      "pointer";

    /*
      Hover effects
    */

    row.onmouseenter = () => {

      row.style.transform =
        "translateX(4px) scale(1.01)";

      row.style.boxShadow = `
        inset 0 0 0 1px ${hexToRgba(color, 0.35)},
        0 10px 20px ${hexToRgba(color, 0.25)}
      `;
    };

    row.onmouseleave = () => {

      row.style.transform =
        "translateX(0) scale(1)";

      row.style.boxShadow = `
        inset 0 0 0 1px ${hexToRgba(color, 0.25)},
        0 6px 14px rgba(0,0,0,0.25)
      `;
    };

    /*
      Row content
    */

    row.innerHTML = `

      <td style="padding-left: 10px; font-weight: 600;">
        ${player.nickname ?? "-"}
      </td>

      <td>
        ${player.points ?? 0}
      </td>

      <td style="font-weight: 600;">
        ${rank}
      </td>

      <td>
        ${player.highestRank ?? "-"}
      </td>

      <td>
        ${player.kingCount ?? 0}
      </td>
    `;

    tableBody.appendChild(row);
  });
}

/*
  Load leaderboard
*/

async function loadLeaderboard() {

  try {

    const res = await fetch(API_URL, {
      method: "GET",
      redirect: "follow"
    });

    const text =
      await res.text();

    const data =
      JSON.parse(text);

    if (!Array.isArray(data)) {

      throw new Error(
        "API did not return array"
      );
    }

    /*
      Sort by points
    */

    data.sort((a, b) =>
      (b.points || 0) -
      (a.points || 0)
    );

    allPlayers = data;

    renderLeaderboard(allPlayers);

  } catch (err) {

    console.error(
      "Leaderboard load failed:",
      err
    );

    tableBody.innerHTML = `
      <tr>
        <td colspan="5">
          Failed to load leaderboard
        </td>
      </tr>
    `;
  }
}

/*
  Search
*/

searchInput.addEventListener("input", () => {

  const value =
    searchInput.value
      .toLowerCase()
      .trim();

  const filtered =
    allPlayers.filter(player =>

      (player.nickname || "")
        .toLowerCase()
        .includes(value)

      ||

      (player.currentRank || "")
        .toLowerCase()
        .includes(value)

      ||

      (player.highestRank || "")
        .toLowerCase()
        .includes(value)
    );

  renderLeaderboard(filtered);
});

/*
  Initial load
*/

loadLeaderboard();

/*
  Auto refresh
*/
