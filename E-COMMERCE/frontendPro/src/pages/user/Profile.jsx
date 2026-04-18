import React from 'react'
import MyOrdersPage from './MyOrdersPage'

const Profile = () => {
  return (
    <div className='min-h-screen flrx flex-col'>
      <div className='container flex-grow p-4 md:p-6 mx-auto'>
        <div className='md:flex-row flex flex-col md:space-x-6 space-y-6 md:space-y-0'>
          {/* left sectin */}
          <div className='w-full md:w-1/3 lg:w-1/4 rounded-lg p-6 shadow-md'>
          <h1 className='text-2xl md:3xl font-bold mb-4'>
            Ahaan</h1>
            <p className='text-gray-600 mb-4 text-lg'>sthakur@jon.com</p>
            <button className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>Log Out</button>
            </div>
            {/* right section */}
            <div className='w-full md:w-2/3 lg:w-3/4'>
            
            <MyOrdersPage/>
            
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
