import PropTypes from 'prop-types'; // Add this line
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '../ui/separator';
import { fetchCounts } from '@/helperFuncs/admin';

// Function to format numbers with the desired precision
function formatNumber(value) {
  return value.toFixed(0);
}

function NumberDisplay({ n, className }) {
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    // Animate number from current displayNumber to new n
    let start = displayNumber;
    let end = n;
    let duration = 1; // Duration in seconds

    const startTime = performance.now();

    function animate(time) {
      let elapsed = (time - startTime) / 1000;
      let progress = Math.min(elapsed / duration, 1); // Ensure progress does not exceed 1
      let currentNumber = start + (end - start) * progress;
      setDisplayNumber(currentNumber);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [n]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {formatNumber(displayNumber)}
    </motion.span>
  );
}

function Card({ title, count }) {
  const cardClass = 'flex bg-white shadow-md rounded-md w-60 h-32 overflow-hidden cursor-pointer';
  return (
    <motion.div className={cardClass} whileHover={{ scale: 1.05 }} // Scale up the card on hover
      transition={{ type: 'spring', stiffness: 300 }}>
      <span className='flex items-center justify-center basis-1/3 bg-yellow-600' />
      <div className='flex flex-col w-full items-end justify-between text-right p-3'>
        <h2 className='text-2xl mb-1 font-bold'>{title}</h2>
        <NumberDisplay n={count} className='text-2xl' />
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {

  const [counts, setCounts] = useState({});

  useEffect(() => {
    fetchCounts().then((counts) => {
      console.log("counts: ", counts);
      setCounts({
        userCount: Number(counts.userCount),
        shelterCount: Number(counts.shelterCount),
        adopterCount: Number(counts.adopterCount),
        petCount: Number(counts.petCount),
        adoptableCount: Number(counts.adoptableCount),
        adoptedCounts: Number(counts.adoptedCount),
        adoptionCount: counts.adoption
      });
    }).catch((error) => {
      console.error("Error fetching counts:", error);
    });
  }, []);

  useEffect(() => {
    console.log("counts.userCount: ", counts?.userCount, typeof counts?.userCount);

  }, [counts]);

  return (
    <div className='flex justify-center w-full h-full max-w-screen'>
      <div className='flex flex-col gap-10 items-center p-6 px-16 overflow-auto w-full bg-white'>
        <h1 className='text-6xl font-bold'>Admin Dashboard</h1>
        {counts.userCount ? <>
          <div className='flex flex-wrap justify-center gap-9'>
            <Card title='Users' count={counts.userCount} />
            <Card title='Pets' count={counts.petCount} />
            <Card title='Adoption Applications' count={100} />
          </div>
          <Separator />
          <div className='flex flex-wrap justify-center gap-9'>
            <Card title='Adopters' count={counts.adopterCount} />
            <Card title='Shelters' count={counts.shelterCount} />
            <Card title='Available Pets' count={counts.adoptableCount} />
            <Card title='Adopted Pets' count={counts.adoptedCounts} />
          </div>
          <Separator />
          <div className='flex flex-wrap justify-center gap-9'>
            <Card title='Funeral Applications' count={100} />
            <Card title='Rehome Applications' count={100} />
          </div>
          {/* <Separator /> */}
          {/* <div className='flex flex-wrap justify-center gap-6'>
            <Card title='Funeral Applications' count={100} />
            <Card title='Rehome Applications' count={100} />
          </div> */}
        </> : <b>Loading...</b>}
      </div>
    </div>
  );
}



NumberDisplay.propTypes = {
  n: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};