import { memo, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components';

export const Pending = memo(() => {
  const dataFetchedRef = useRef(false);

  const navigate = useNavigate();

  const apiUrl = "https://api.apify.com/v2/acts/baa1~ingredion/run-sync-get-dataset-items?token=apify_api_RAQ3OtcSEPg2FdR0dLg6onHzTreXDY3KTfO1";

  const location = useLocation();
  const arrays = location.state;

  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState([]);
  // let results = [];
  const fetchData = async () => {
    try {
      const response1 = await axios.post(apiUrl, {startUrls: [{url: arrays[0].website}]});
      const response2 = await axios.post(apiUrl, {startUrls: [{url: arrays[1].website}]});
      const response3 = await axios.post(apiUrl, {startUrls: [{url: arrays[2].website}]});
      console.log("res1", response1.data, "res2", response2.data, "res3", response3.data);
      results.push({title: arrays[0].title, company: arrays[0].company, brand: arrays[0].brand, brandLists: response1.data});
      results.push({title: arrays[1].title, company: arrays[1].company, brand: arrays[1].brand, brandLists: response2.data});
      results.push({title: arrays[2].title, company: arrays[2].company, brand: arrays[2].brand, brandLists: response3.data});
    } catch(err) {
      console.log(err)
    }
    setIsLoaded(true);
    console.log('results',results);
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);
  
  const handleClick = () => {
    navigate('/result', {state:results});
  }
  return (
    <div className='w-full flex flex-col h-screen bg-slate-50'>
      <div className='text-2xl m-5'>Set-up Companies: Confirmation</div>
      <div className='flex flex-col h-[calc(100vh-300px)]'>
        <div className='m-auto'>
          <div className='flex justify-center'>
            {isLoaded?
            <Button text='Search Complete - Next Step' isLoaded={isLoaded} onSubmit={handleClick}></Button>
            :
            <div>
              <div className='text-xl mx-10'>
                Companies submitted. We are now searching for brands on the company websites you have entered.
                This may take up to five minutes.
              </div>
              <Button text='Currently Searching..' isLoaded={isLoaded} onSubmit={handleClick}></Button>
            </div>
            }
          </div>
          
        </div>
      </div>
    </div>
  )
})

export default Pending;
