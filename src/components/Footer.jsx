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

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-of-service" className="text-gray-500 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-500 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
           <ul className="space-y-2">
              <li>
                <a href="mailto:support@zentranscript.com" className="text-gray-500 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="mailto:privacy@zentranscript.com" className="text-gray-500 hover:text-white">
                  Privacy Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>


          <p className='text-center'>&copy; {currentYear} Zen Transcript. All rights reserved.</p>
      
      </div>
    </footer>
  );
}

export default Footer;