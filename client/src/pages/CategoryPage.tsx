import { useSwapiList } from '../hooks/useSwapiList';
import { SearchBar } from '../components/ui/SearchBar';
import { Pagination } from '../components/ui/Pagination';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { CardGrid } from '../components/cards/CardGrid';
import { PersonCard } from '../components/cards/PersonCard';
import { PlanetCard } from '../components/cards/PlanetCard';
import { FilmCard } from '../components/cards/FilmCard';
import { StarshipCard } from '../components/cards/StarshipCard';
import { VehicleCard } from '../components/cards/VehicleCard';
import { SpeciesCard } from '../components/cards/SpeciesCard';
import type {
  Category,
  SwapiPerson,
  SwapiPlanet,
  SwapiFilm,
  SwapiStarship,
  SwapiVehicle,
  SwapiSpecies,
} from '../types/swapi';
import { CATEGORY_LABELS } from '../types/swapi';
import styles from './CategoryPage.module.css';

interface CategoryPageProps {
  category: Category;
  onSelect: (id: string) => void;
}

export function CategoryPage({ category, onSelect }: CategoryPageProps) {
  const { data, loading, error, page, search, setPage, setSearch, refetch } =
    useSwapiList(category);

  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={`Search ${CATEGORY_LABELS[category].toLowerCase()}...`}
        />
      </div>

      {loading && <LoadingSpinner message="Searching the galaxy..." />}

      {error && !loading && (
        <ErrorMessage message={error} onRetry={refetch} />
      )}

      {!loading && !error && data && (
        <>
          <CardGrid
            emptyMessage={`No ${CATEGORY_LABELS[category].toLowerCase()} found. Try a different search.`}
          >
            {data.results.map((item) => renderCard(category, item, onSelect))}
          </CardGrid>

          {data.count > 10 && (
            <Pagination
              page={page}
              hasNext={!!data.next}
              hasPrevious={!!data.previous}
              totalCount={data.count}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </main>
  );
}

function renderCard(
  category: Category,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any,
  onSelect: (id: string) => void,
) {
  switch (category) {
    case 'people':
      return <PersonCard key={(item as SwapiPerson).url} person={item as SwapiPerson} onSelect={onSelect} />;
    case 'planets':
      return <PlanetCard key={(item as SwapiPlanet).url} planet={item as SwapiPlanet} onSelect={onSelect} />;
    case 'films':
      return <FilmCard key={(item as SwapiFilm).url} film={item as SwapiFilm} onSelect={onSelect} />;
    case 'starships':
      return <StarshipCard key={(item as SwapiStarship).url} starship={item as SwapiStarship} onSelect={onSelect} />;
    case 'vehicles':
      return <VehicleCard key={(item as SwapiVehicle).url} vehicle={item as SwapiVehicle} onSelect={onSelect} />;
    case 'species':
      return <SpeciesCard key={(item as SwapiSpecies).url} species={item as SwapiSpecies} onSelect={onSelect} />;
  }
}
