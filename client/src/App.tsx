// App.tsx — the root component of the entire React application.
// Think of it as the "conductor" that keeps track of what the user is looking at
// and makes sure the right content is shown on screen at all times.
//
// It manages two pieces of state:
//   1. activeCategory — which of the six tabs is selected (people, planets, films, etc.)
//   2. selectedId     — the ID of the item the user clicked on (or null if none)
//
// When selectedId is set, a pop-up detail modal appears over the page.

import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CategoryPage } from './pages/CategoryPage';
import { DetailModal } from './components/detail/DetailModal';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { PersonDetail } from './components/detail/PersonDetail';
import { PlanetDetail } from './components/detail/PlanetDetail';
import { FilmDetail } from './components/detail/FilmDetail';
import { StarshipDetail } from './components/detail/StarshipDetail';
import { VehicleDetail } from './components/detail/VehicleDetail';
import { SpeciesDetail } from './components/detail/SpeciesDetail';
import { useSwapiDetail } from './hooks/useSwapiDetail';
import type {
  Category,
  SwapiPerson,
  SwapiPlanet,
  SwapiFilm,
  SwapiStarship,
  SwapiVehicle,
  SwapiSpecies,
} from './types/swapi';
import { CATEGORY_LABELS } from './types/swapi';

function App() {
  // Which category tab is currently active. Starts on "people".
  const [activeCategory, setActiveCategory] = useState<Category>('people');

  // The ID of the item the user clicked on. null means no item is selected (modal closed).
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // When the user clicks a different tab, switch the category and close any open modal.
  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setSelectedId(null);
  };

  // When the user clicks a card, store the ID so the detail modal opens.
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  // When the user closes the modal, clear the selected ID.
  const handleCloseModal = () => {
    setSelectedId(null);
  };

  // Fetch the full details for the currently selected item.
  // This hook does nothing when selectedId is null (no item selected).
  const { data: detailData, loading: detailLoading, error: detailError } =
    useSwapiDetail(activeCategory, selectedId);

  return (
    <>
      {/* Sticky header with the Star Wars title and the six category tabs */}
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* The main content area — shows the search bar and grid of cards */}
      <CategoryPage category={activeCategory} onSelect={handleSelect} />

      <Footer />

      {/* The detail pop-up. Only rendered when the user has selected an item. */}
      {selectedId && (
        <DetailModal
          title={getDetailTitle(activeCategory, detailData)}
          onClose={handleCloseModal}
        >
          {/* Show a spinner while the detail data is loading */}
          {detailLoading && <LoadingSpinner message="Loading details..." />}

          {/* Show an error message if the request failed */}
          {detailError && <ErrorMessage message={detailError} />}

          {/* Once data has loaded, render the right detail component for the category */}
          {detailData && !detailLoading && renderDetail(activeCategory, detailData)}
        </DetailModal>
      )}
    </>
  );
}

// Work out the title to display in the modal header.
// Films use a "title" field; everything else uses "name".
// Falls back to the category label (e.g. "People") if data hasn't loaded yet.
function getDetailTitle(
  category: Category,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): string {
  if (!data) return CATEGORY_LABELS[category];
  if ('name' in data) return data.name as string;
  if ('title' in data) return data.title as string;
  return CATEGORY_LABELS[category];
}

// Pick the correct detail component based on which category is active.
// Each component knows how to display the specific fields for that type of data.
function renderDetail(
  category: Category,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) {
  switch (category) {
    case 'people':
      return <PersonDetail person={data as SwapiPerson} />;
    case 'planets':
      return <PlanetDetail planet={data as SwapiPlanet} />;
    case 'films':
      return <FilmDetail film={data as SwapiFilm} />;
    case 'starships':
      return <StarshipDetail starship={data as SwapiStarship} />;
    case 'vehicles':
      return <VehicleDetail vehicle={data as SwapiVehicle} />;
    case 'species':
      return <SpeciesDetail species={data as SwapiSpecies} />;
  }
}

export default App;
