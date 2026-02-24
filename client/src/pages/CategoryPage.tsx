// The main content area for any of the six Star Wars categories.
// This single component handles People, Planets, Films, Starships, Vehicles, AND Species —
// it adapts to whichever category is active by switching on the `category` prop.
//
// It composes several smaller pieces together:
//   SearchBar    — lets the user filter the list by typing a name/title
//   LoadingSpinner — shown while data is fetching
//   ErrorMessage — shown if the fetch fails (with a "Try Again" button)
//   CardGrid     — lays out the result cards in a responsive grid
//   Pagination   — prev/next buttons shown when there are more than 10 results

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

// category:  which of the six types to display
// onSelect:  called with the item's ID when the user clicks a card
interface CategoryPageProps {
  category: Category;
  onSelect: (id: string) => void;
}

export function CategoryPage({ category, onSelect }: CategoryPageProps) {
  // useSwapiList handles all the data fetching, search, and pagination logic.
  // It returns everything we need to render the page.
  const { data, loading, error, page, search, setPage, setSearch, refetch } =
    useSwapiList(category);

  return (
    <main className={styles.page}>
      {/* Search bar at the top — placeholder adjusts to the category name */}
      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={`Search ${CATEGORY_LABELS[category].toLowerCase()}...`}
        />
      </div>

      {/* Show spinner while data is loading */}
      {loading && <LoadingSpinner message="Searching the galaxy..." />}

      {/* Show error panel if the request failed — only when not also loading */}
      {error && !loading && (
        <ErrorMessage message={error} onRetry={refetch} />
      )}

      {/* Show the grid and pagination once data has loaded successfully */}
      {!loading && !error && data && (
        <>
          {/* Map each API result to the correct card type for the active category */}
          <CardGrid
            emptyMessage={`No ${CATEGORY_LABELS[category].toLowerCase()} found. Try a different search.`}
          >
            {data.results.map((item) => renderCard(category, item, onSelect))}
          </CardGrid>

          {/* Only show pagination if there are more than 10 results (more than one page).
              !! converts null/undefined to false, truthy string to true. */}
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

// Picks the right card component for each category and data type.
// The `key` prop uses the item's URL because it's guaranteed to be unique
// across all items — React uses this to efficiently update the list.
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
