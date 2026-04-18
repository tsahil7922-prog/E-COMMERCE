import React from 'react'
import Hero from '../../component/Layout/Hero'
import GenderCollectionSection from '../../component/Products/GenderCollectionSection'
import NewArrival from '../../component/Products/NewArrival'
import ProductDetails from '../../component/Products/ProductDetails'
import ProductGrid from '../../component/Products/ProductGrid'
import FeaturedCollection from '../../component/Products/FeaturedCollection'
import FeaturedSection from '../../component/Products/FeaturedSection'

const placeHoldeProducts =[
    {
      _id: 1,
      name: "Product 1",
      price: "200",
      image: [{ url: "https://picsum.photos/200/300?random=1" }],
    },
    {
      _id: 1,
      name: "Product 2",
      price: "200",
      image: [{ url: "https://picsum.photos/200/300?random=2" }],
    },
    {
      _id: 3,
      name: "Product 3",
      price: "100",
      image: [{ url: "https://picsum.photos/200/300?random=3" }],
    },
    {
      _id: 4,
      name: "Product 4",
      price: "20",
      image: [{ url: "https://picsum.photos/200/300?random=4" }],
    },
    {
      _id: 5,
      name: "Product 5",
      price: "2030",
      image: [{ url: "https://picsum.photos/200/300?random=5" }],
    },
  ];
const Home = () => {
  return (
    <div>
     <Hero/>
     <GenderCollectionSection/>
     <NewArrival/>
     {/* Best Seller Section */}
     <h2 className='text-center text-3xl mb-4 font-bold'>Best Seller </h2>
     <ProductDetails/>
     <div className='container mx-auto'>
<h2 className='font-bold mb-4 text-3xl text-center'> Top Wears For Women</h2>
<ProductGrid product={placeHoldeProducts}/>
     </div>
     <FeaturedCollection/>
     <FeaturedSection/>
    </div>
  )
}

export default Home
