'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Listing {
  id: string
  title: string
  price: number
  type: string
  bedrooms: number
  bathrooms: number
  sqft: number
  city: string
  state: string
  images: string[]
  featured: boolean
}

export function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedListings()
  }, [])

  const fetchFeaturedListings = async () => {
    try {
      const response = await fetch('/api/listings?featured=true&limit=6')
      const data = await response.json()
      
      if (response.ok) {
        setListings(data.listings || [])
      }
    } catch (error) {
      console.error('Error fetching featured listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No featured listings available
        </h3>
        <p className="text-gray-600">
          Check back later for featured properties.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <Link href={`/listings/${listing.id}`}>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              {listing.images.length > 0 ? (
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                  {listing.title}
                </h3>
                <span className="text-lg font-bold text-blue-600">
                  {formatPrice(listing.price)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-2">
                {listing.city}, {listing.state}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <span>{listing.bedrooms} beds</span>
                <span>{listing.bathrooms} baths</span>
                <span>{listing.sqft.toLocaleString()} sqft</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {listing.type.toLowerCase()}
                </span>
                {listing.featured && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}