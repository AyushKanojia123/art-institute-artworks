import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import ArtworkTable from "./components/ArtworkTable";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Art Institute of Chicago - Artworks</h2>
      <ArtworkTable />
    </div>
  );
}

export default App;
