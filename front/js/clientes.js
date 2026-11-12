const state = { page: 1, pageSize: 10, query: "", sortKey: "name", direction: 1 };
const currency = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0
});
const body = document.querySelector("#table-body")

function normalize(value) {
    return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}


async function render() {
    const filteredBD = await api(path);
    //  let filtered = ventasBD.data;
    body.replaceChildren();

    filteredBD.forEach(cliente => {
        const row = document.createElement("tr");
        [cliente.id, cliente.nombre].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.append(cell);
        })
        body.append(row);
    });
}



const path = "/api/v1/clientes";

async function api(path, options = {}) {
    const response = await fetch(`${path}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });
    const payload = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(payload?.error?.message || 'No fue posible completar la operación.');
    }
    return payload?.data;
}

render();