const API_URL =
  "https://script.google.com/macros/s/AKfycbz1tLt5_F6XtHXRq5fyUHFWW5Oy6MHi5NMyRcZnPfwdEJ357ZbA2Mwt90FWOAdiv65_/exec";

const logsTable = document.getElementById("logsTable");

const searchInput = document.getElementById("searchInput");

let allLogs = [];

/*
    Load logs
*/

async function loadLogs() {
  try {
    const res = await fetch(API_URL);

    const text = await res.text();

    const data = JSON.parse(text);

    if (!Array.isArray(data)) {
      throw new Error("API did not return array");
    }

    allLogs = data;

    renderLogs(allLogs);
  } catch (err) {
    console.error("Failed to load logs:", err);

    logsTable.innerHTML = `
            <tr>
                <td colspan="5">
                    Failed to load logs
                </td>
            </tr>
        `;
  }
}

function formatDate(dateString) {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US");
}

/*
    Render logs
*/

function renderLogs(logs) {
  logsTable.innerHTML = "";

  logs.forEach((log) => {
    const row = document.createElement("tr");

    row.innerHTML = `

            <td>
                ${formatDate(log.date)}
            </td>

            <td>
                ${log.playerName || "-"}
            </td>

            <td>
                ${log.points || "0"}
            </td>

            <td>
                ${log.description || "-"}
            </td>

            <td>

                ${
                  log.threadLink && log.threadLink !== "Thread was deleted"
                    ? `<a
                        class="thread-link"
                        href="${log.threadLink}"
                        target="_blank"
                    >
                        Open Thread
                    </a>`
                    : "Deleted"
                }

            </td>
        `;

    logsTable.appendChild(row);
  });
}

/*
    Search
*/

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();

  const filtered = allLogs.filter(
    (log) =>
      (log.playerName || "").toLowerCase().includes(value) ||
      (log.description || "").toLowerCase().includes(value) ||
      (log.date || "").toLowerCase().includes(value),
  );

  renderLogs(filtered);
});

/*
    Start
*/

loadLogs();

/*
    Auto refresh
*/

setInterval(loadLogs, 10000);
