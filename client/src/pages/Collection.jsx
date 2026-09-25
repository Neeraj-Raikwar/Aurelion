import { useState, useEffect } from 'react';
import './Collection.css';
import ProductCard from '../components/ProductCard/ProductCard';
import { getAllWatches } from '../api/watches';

function Collection() {
  const [watches, setWatches] = useState([]);   // stores the array of watches once fetched
  const [loading, setLoading] = useState(true); // true until the fetch finishes
  const [error, setError] = useState(null);     // stores an error message if the fetch fails

  // useEffect with an empty [] dependency array runs ONCE,
  // right after this component first renders — perfect for
  // "go fetch this data as soon as the page loads".
  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const data = await getAllWatches();
        setWatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // runs whether it succeeded or failed
      }
    };

    fetchWatches();
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '100px 0' }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', padding: '100px 0' }}>{error}</p>;
  }

  return (
    <div className="collection-page">
      <div className="collection-header">
        <p className="eyebrow">THE COLLECTION</p>
        <h2>Choose Your Hour</h2>
        <p>Three compositions crafted for three different hours of the day.</p>
      </div>

      <div className="collection-grid">
        {/* .map() loops over every watch in the array and renders
            one ProductCard per watch — this replaces the 3 manually
            typed <ProductCard /> calls you had before. */}
        {watches.map((watch) => (
          <ProductCard
            key={watch._id}
            slug={watch.slug}
            name={watch.name}
            subtitle={watch.subtitle}
            highlights={watch.highlights}
            image={watch.images.hero}
          />
        ))}
      </div>
    </div>
  );
}

export default Collection;
