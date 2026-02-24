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
  const [activeCategory, setActiveCategory] = useState<Category>('people');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setSelectedId(null);
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
  };

  const { data: detailData, loading: detailLoading, error: detailError } =
    useSwapiDetail(activeCategory, selectedId);

  return (
    <>
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <CategoryPage category={activeCategory} onSelect={handleSelect} />

      <Footer />

      {selectedId && (
        <DetailModal
          title={getDetailTitle(activeCategory, detailData)}
          onClose={handleCloseModal}
        >
          {detailLoading && <LoadingSpinner message="Loading details..." />}
          {detailError && <ErrorMessage message={detailError} />}
          {detailData && !detailLoading && renderDetail(activeCategory, detailData)}
        </DetailModal>
      )}
    </>
  );
}

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
