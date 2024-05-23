import './App.css';
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
      <div className="bg-green-300">Dealerships app</div>
    </>
  );
}

export default App;
