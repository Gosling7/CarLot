import { useMemo, useState } from "react";

type CarListing = {
  id: string;
  title: string;
  price: number;
  currency: string;
  mileageKm: number;
  fuelType: string;
  transmission: string;
  year: number;
  location: string;
  image: string;
  createdAt: number;
};

const PAGE_SIZE = 4;

export default function HomePage() {
  const allListings: CarListing[] = [
    {
      id: "1",
      title: "Audi A4 2.0 TDI Quattro 2019",
      price: 44900,
      currency: "PLN",
      mileageKm: 81250,
      fuelType: "Diesel",
      transmission: "Automatic",
      year: 2019,
      location: "Warsaw",
      image:
        "https://images.unsplash.com/photo-1549927681-2b9b0b2d5e1c",
      createdAt: 3,
    },
    {
      id: "2",
      title: "BMW 320i Sport 2018",
      price: 39900,
      currency: "PLN",
      mileageKm: 95000,
      fuelType: "Petrol",
      transmission: "Automatic",
      year: 2018,
      location: "Krakow",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      createdAt: 1,
    },
    {
      id: "3",
      title: "Skoda Octavia 1.6 TDI 2020",
      price: 52900,
      currency: "PLN",
      mileageKm: 62000,
      fuelType: "Diesel",
      transmission: "Manual",
      year: 2020,
      location: "Gdansk",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      createdAt: 2,
    },
    {
      id: "4",
      title: "Mercedes C200 2017",
      price: 37900,
      currency: "PLN",
      mileageKm: 110000,
      fuelType: "Petrol",
      transmission: "Automatic",
      year: 2017,
      location: "Poznan",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
      createdAt: 4,
    },
    {
      id: "5",
      title: "Volkswagen Passat 2021",
      price: 69900,
      currency: "PLN",
      mileageKm: 41000,
      fuelType: "Diesel",
      transmission: "Automatic",
      year: 2021,
      location: "Wroclaw",
      image:
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023",
      createdAt: 5,
    },
  ];

  // ---------------- FILTER STATE ----------------
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("");
  const [transmissionFilter, setTransmissionFilter] =
    useState("");
  const [maxPrice, setMaxPrice] = useState(80000);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] =
    useState(false);
  const [hasAppliedFilters, setHasAppliedFilters] =
    useState(false);

  // ---------------- TEMP FILTER STATE (used before clicking "Search") ----------------
  const [tempSearch, setTempSearch] = useState(search);
  const [tempFuel, setTempFuel] = useState(fuelFilter);
  const [tempTransmission, setTempTransmission] =
    useState(transmissionFilter);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  const applyFilters = () => {
    setSearch(tempSearch);
    setFuelFilter(tempFuel);
    setTransmissionFilter(tempTransmission);
    setMaxPrice(tempMaxPrice);
    setHasAppliedFilters(true);
    setCurrentPage(1);
  };

  // ---------------- FILTER + SORT ----------------
  const processedListings = useMemo(() => {
    let filtered = allListings.filter((car) => {
      return (
        car.title
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (fuelFilter ? car.fuelType === fuelFilter : true) &&
        (transmissionFilter
          ? car.transmission === transmissionFilter
          : true) &&
        car.price <= maxPrice
      );
    });

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "mileage":
        filtered.sort((a, b) => a.mileageKm - b.mileageKm);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => b.createdAt - a.createdAt);
    }

    return filtered;
  }, [search, fuelFilter, transmissionFilter, maxPrice, sortBy]);

  const totalPages = Math.ceil(
    processedListings.length / PAGE_SIZE
  );

  const paginatedListings = processedListings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // ---------------- UI ----------------
  if (!hasAppliedFilters) {
    return (
      <div className="min-h-screen bg-base-200">
        <div className="max-w-5xl mx-auto p-6 flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold text-center">
            Find Your Next Car
          </h1>

          {/* CENTERED FILTERS */}
          <div className="card bg-base-100 shadow-xl p-6 w-full">
            <FiltersForm
              search={tempSearch}
              setSearch={setTempSearch}
              fuelFilter={tempFuel}
              setFuelFilter={setTempFuel}
              transmissionFilter={tempTransmission}
              setTransmissionFilter={setTempTransmission}
              maxPrice={tempMaxPrice}
              setMaxPrice={setTempMaxPrice}
            />
            <button
              className="btn btn-primary mt-4 w-full"
              onClick={applyFilters}
            >
              Search
            </button>
          </div>

          {/* RECOMMENDED CARS GRID */}
          <div className="w-full mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Recommended Cars
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allListings.slice(0, 3).map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- MARKETPLACE LAYOUT AFTER FILTER ----------
  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* FILTERS SIDEBAR */}
        <div className="lg:col-span-1 hidden lg:block">
          <FiltersSidebar
            tempSearch={tempSearch}
            setTempSearch={setTempSearch}
            tempFuel={tempFuel}
            setTempFuel={setTempFuel}
            tempTransmission={tempTransmission}
            setTempTransmission={setTempTransmission}
            tempMaxPrice={tempMaxPrice}
            setTempMaxPrice={setTempMaxPrice}
            applyFilters={applyFilters}
          />
        </div>

        {/* MOBILE FILTER BUTTON */}
        <div className="lg:hidden col-span-1 mb-4">
          <button
            className="btn btn-primary w-full"
            onClick={() => setIsFilterDrawerOpen(true)}
          >
            Filters
          </button>
        </div>

        {/* MOBILE FILTER DRAWER */}
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsFilterDrawerOpen(false)}
            ></div>
            <div className="bg-base-100 w-64 p-6 space-y-4 overflow-y-auto">
              <button
                className="btn btn-sm btn-ghost mb-4"
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                Close
              </button>
              <FiltersSidebar
                tempSearch={tempSearch}
                setTempSearch={setTempSearch}
                tempFuel={tempFuel}
                setTempFuel={setTempFuel}
                tempTransmission={tempTransmission}
                setTempTransmission={setTempTransmission}
                tempMaxPrice={tempMaxPrice}
                setTempMaxPrice={setTempMaxPrice}
                applyFilters={applyFilters}
              />
            </div>
          </div>
        )}

        {/* LISTINGS */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {processedListings.length} Cars Found
            </h2>
            <select
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="mileage">Lowest Mileage</option>
            </select>
          </div>

          {paginatedListings.map((car) => (
            <CarListItem key={car.id} car={car} />
          ))}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${currentPage === i + 1
                    ? "btn-primary"
                    : "btn-outline"
                    }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------- FILTER FORM ----------------
function FiltersForm({
  search,
  setSearch,
  fuelFilter,
  setFuelFilter,
  transmissionFilter,
  setTransmissionFilter,
  maxPrice,
  setMaxPrice,
}: any) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="select select-bordered w-full"
        value={fuelFilter}
        onChange={(e) => setFuelFilter(e.target.value)}
      >
        <option value="">All Fuel Types</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
      </select>

      <select
        className="select select-bordered w-full"
        value={transmissionFilter}
        onChange={(e) => setTransmissionFilter(e.target.value)}
      >
        <option value="">All Transmission</option>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
      </select>

      <div>
        <label className="label">Max Price: {maxPrice} PLN</label>
        <input
          type="range"
          min={20000}
          max={80000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="range range-primary"
        />
      </div>
    </div>
  );
}

// ---------------- FILTER SIDEBAR ----------------
function FiltersSidebar({
  tempSearch,
  setTempSearch,
  tempFuel,
  setTempFuel,
  tempTransmission,
  setTempTransmission,
  tempMaxPrice,
  setTempMaxPrice,
  applyFilters,
}: any) {
  return (
    <div className="space-y-4">
      <FiltersForm
        search={tempSearch}
        setSearch={setTempSearch}
        fuelFilter={tempFuel}
        setFuelFilter={setTempFuel}
        transmissionFilter={tempTransmission}
        setTransmissionFilter={setTempTransmission}
        maxPrice={tempMaxPrice}
        setMaxPrice={setTempMaxPrice}
      />
      <button className="btn btn-primary w-full" onClick={applyFilters}>
        Search
      </button>
    </div>
  );
}

// ---------------- CAR CARD ----------------
function CarCard({ car }: { car: CarListing }) {
  return (
    <div className="card bg-base-100 shadow-xl border hover:shadow-2xl transition">
      <figure>
        <img
          src={car.image}
          alt={car.title}
          className="h-40 w-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg">{car.title}</h2>
        <div className="flex flex-wrap gap-2 mt-1 text-sm">
          <span className="badge badge-outline">{car.year}</span>
          <span className="badge badge-outline">
            {car.mileageKm.toLocaleString()} km
          </span>
          <span className="badge badge-outline">{car.fuelType}</span>
          <span className="badge badge-outline">
            {car.transmission}
          </span>
          <span className="badge badge-outline">{car.location}</span>
        </div>
        <p className="text-xl font-bold text-primary mt-2">
          {car.price.toLocaleString()} {car.currency}
        </p>
        <a
          href={`/listing/${car.id}`}
          className="btn btn-primary btn-sm mt-2"
        >
          View Details
        </a>
      </div>
    </div>
  );
}

// ---------------- CAR LIST ITEM ----------------
function CarListItem({ car }: { car: CarListing }) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl border hover:shadow-2xl transition">
      <figure className="lg:w-80">
        <img
          src={car.image}
          alt={car.title}
          className="h-60 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <div className="flex justify-between flex-wrap gap-4">
          <div>
            <h2 className="card-title text-xl">
              {car.title}
            </h2>

            <div className="flex flex-wrap gap-2 mt-2">
              <div className="badge badge-outline">
                {car.year}
              </div>
              <div className="badge badge-outline">
                {car.mileageKm.toLocaleString()} km
              </div>
              <div className="badge badge-outline">
                {car.fuelType}
              </div>
              <div className="badge badge-outline">
                {car.transmission}
              </div>
              <div className="badge badge-outline">
                {car.location}
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {car.price.toLocaleString()} {car.currency}
            </p>

            <a
              href={`/listing/${car.id}`}
              className="btn btn-primary btn-sm mt-3"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
