import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import twitter from '../assets/twitter.png';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';


function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F3F1E0]  px-9">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between">
        
          <div className='pt-12'>
            <img src={logo} className='w-32'/>

            <div className='flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-4 pt-9'>
              <img src={twitter} className='w-24 md:w-0 md:h-12 ' />
              <img src={facebook} className='w-24 md:w-0 md:h-12'/>
              <img src={instagram} className='w-24 md:w-0 md:h-12'/>

            </div>
           
          </div>

          {/* Gamedey */}
          <div>
            <h3 className="text-lg font-bold mb-4">Gamedey</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-white">
                  Legal Conditions
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
                 <li>
                <Link to="/products" className="text-gray-500 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover Gamedey */}
          <div>
            <h3 className="text-lg font-bold mb-4">Discover Gamedey</h3>
           <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-white">
                  Discover Facilities
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-white">
                  Discover Coach
                </Link>
              </li>
                 <li>
                <Link to="/products" className="text-gray-500 hover:text-white">
                  Become a Coach
                </Link>
              </li>
                     <li>
                <Link to="/products" className="text-gray-500 hover:text-white">
                  List your Facilities
                </Link>
              </li>
            </ul>
          </div>
        </div>


          <p className='text-center'>&copy; {currentYear} Gamedey. All rights reserved.</p>
      
      </div>
    </footer>
  );
}

export default Footer;