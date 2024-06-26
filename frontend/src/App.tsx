import './App.css';
import { CarCard } from './components/ui/carCard';
import { SkeletonCard } from './components/ui/skeletonCard';
import useGetCars from './graphql/queries/hooks/useGetCars';

function App() {
  const { loading, data, error } = useGetCars();

  if (data) {
    console.log('data', data);
  }

  if (error) {
    console.log('error', error);
  }
  return (
    <>
      {loading && <SkeletonCard />}
      <div className="grid xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 p-5">
        {data &&
          data.map((car, carId) => (
            <CarCard
              key={carId}
              title={car.title}
              price={car.price}
              sold_by={car.sold_by}
              dealership_name={car.dealership_name}
              milage={car.milage}
            />
          ))}
      </div>
    </>
  );
}

export default App;
