import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { OverlayPanel } from 'primereact/overlaypanel';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { InputNumber } from 'primereact/inputnumber';

interface Artwork {
    id: string;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: number | null;
    date_end: number | null;
}

const ArtworksTable: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]); 
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); 
    const [page, setPage] = useState<number>(1); 
    const [selectedIds, setSelectedIds] = useState<string[]>([]); 
    const [selectedRowsCount, setSelectedRowsCount] = useState<number>(5); 
    const overlayPanelRef = useRef<OverlayPanel>(null); 

    const fetchArtworks = async (page: number) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${page}`);
            setArtworks(response.data.data);
            setTotalRecords(response.data.pagination.total);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtworks(page);
    }, [page]);

    const onPageChange = (event: { first: number; rows: number }) => {
        setPage(event.first / event.rows + 1); 
    };

    const onSelectionChange = (e: { value: Artwork[] }) => {
        const selectedRowIds = e.value.map((row) => row.id);
        setSelectedIds(selectedRowIds); 
    };

    const selectedArtworks = artworks.filter((artwork) => selectedIds.includes(artwork.id));

    const handleSelectRows = async () => {
        const rowsToSelect = selectedRowsCount; 
        const newSelectedIds = [...selectedIds]; 
        let pageNum = 1; 

        while (newSelectedIds.length < rowsToSelect && pageNum <= Math.ceil(totalRecords / 10)) {
            const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${pageNum}`);
            const currentPageArtworks = response.data.data;

            for (let i = 0; i < currentPageArtworks.length && newSelectedIds.length < rowsToSelect; i++) {
                if (!newSelectedIds.includes(currentPageArtworks[i].id)) {
                    newSelectedIds.push(currentPageArtworks[i].id); 
                }
            }

            pageNum++; 
        }

        newSelectedIds.splice(rowsToSelect); 
        setSelectedIds(newSelectedIds);
        overlayPanelRef.current?.hide(); 
    };

    const handleDeselectAll = () => {
        setSelectedIds([]);
    };

    const openOverlayPanel = (e: React.MouseEvent) => {
        if (overlayPanelRef.current) {
            overlayPanelRef.current.show(e, e.currentTarget);
        }
    };

    return (
        <div>
            <DataTable
                value={artworks}
                paginator
                rows={10}
                totalRecords={totalRecords}
                loading={loading}
                lazy
                onPage={onPageChange}
                selection={selectedArtworks}
                onSelectionChange={onSelectionChange} 
                dataKey="id" 
                selectionMode="checkbox" 
            >
                {/* Select checkbox column */}
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Place of Origin"></Column>
                <Column field="artist_display" header="Artist"></Column>
                <Column field="inscriptions" header="Inscriptions"></Column>
                <Column field="date_start" header="Start Date"></Column>
                <Column field="date_end" header="End Date"></Column>
            </DataTable>

            

            
            <button onClick={openOverlayPanel}>
                <ChevronDownIcon />
            </button>


            <OverlayPanel ref={overlayPanelRef}>
                <div>
                    <InputNumber
                        value={selectedRowsCount}
                        onValueChange={(e) => setSelectedRowsCount(e.value as number)}
                        min={1}  
                        showButtons
                    />
                    <button onClick={handleSelectRows}>Select Rows</button>
                </div>
                <button onClick={handleDeselectAll}>Deselect All</button>
            </OverlayPanel>
        </div>
    );
};

export default ArtworksTable;
