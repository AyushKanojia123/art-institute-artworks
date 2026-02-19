import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { fetchArtworks } from "../api/artworks";
import type { Artwork } from "../types/artwork";
import CustomSelectionOverlay from "./CustomSelectionOverlay";

const ROWS_PER_PAGE = 12;

const ArtworkTable = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadArtworks(page);
  }, [page]);

  const loadArtworks = async (pageNumber: number) => {
    try {
      setLoading(true);
      const response = await fetchArtworks(pageNumber);

      setArtworks(response.data);
      setTotalRecords(response.pagination.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRowSelectChange = (selectedRows: Artwork[]) => {
    const newSet = new Set(selectedIds);

    selectedRows.forEach((row) => newSet.add(row.id));

    artworks.forEach((row) => {
      const stillSelected = selectedRows.some((r) => r.id === row.id);
      if (!stillSelected) {
        newSet.delete(row.id);
      }
    });

    setSelectedIds(newSet);
  };

  const selectedRows = artworks.filter((art) =>
    selectedIds.has(art.id)
  );

  const onPageChange = (e: any) => {
    setPage(e.page + 1);
  };

  return (
    <div className="card">
      <CustomSelectionOverlay
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        currentPageData={artworks}
      />

      {/* ✅ SELECTED ROW COUNT ADDED HERE */}
      <div
        style={{
          marginBottom: "0.5rem",
          padding: "0.5rem",
          background: "#f4f4f4",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        Selected Rows: {selectedIds.size}
      </div>

      <DataTable<Artwork>
        value={artworks}
        paginator
        rows={ROWS_PER_PAGE}
        totalRecords={totalRecords}
        first={(page - 1) * ROWS_PER_PAGE}
        lazy
        loading={loading}
        onPage={onPageChange}
        selection={selectedRows}
        onSelectionChange={(e) =>
          onRowSelectChange(e.value as Artwork[])
        }
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
    </div>
  );
};

export default ArtworkTable;
