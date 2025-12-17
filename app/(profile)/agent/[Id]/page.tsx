import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

interface PageProps {
  params: {
    Id: string  // Note: capital I matches folder name [Id]
  }
}

async function getAgent(id: number) {
  const agent = await prisma.agentProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true  // Changed from avatar to image
        }
      },
      listings: {
        where: {
          status: 'ACTIVE'
        },
        include: {
          user: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!agent) {
    notFound()
  }

  return agent
}

export default async function AgentProfilePage({ params }: PageProps) {
  // Convert string ID to number and handle case sensitivity
  const agentId = parseInt(params.Id)
  
  if (isNaN(agentId)) {
    notFound()
  }

  const agent = await getAgent(agentId)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link 
            href="/agents" 
            className="text-blue-600 hover:text-blue-500"
          >
            ← Back to Agents
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Agent Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {/* Agent Photo */}
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-gray-300 shadow-lg">
                  {agent.user.image ? (
                    <Image
                      src={agent.user.image}
                      alt={agent.user.name || 'Agent'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <span className="text-4xl text-white font-bold">
                        {agent.user.name?.charAt(0).toUpperCase() || 'A'}
                      </span>
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {agent.user.name}
                </h1>
                <p className="text-gray-600">Real Estate Agent</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                {agent.user.phone && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">{agent.user.phone}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">{agent.user.email}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 space-y-3">
                <Link
                  href={`/listings?agent=${agent.id}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Listings
                </Link>
                <button className="block w-full border border-blue-600 text-blue-600 text-center py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Contact Agent
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Bio Section */}
            {agent.bio && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">About {agent.user.name}</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {agent.bio}
                  </p>
                </div>
              </div>
            )}

            {/* Agent's Listings */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold">
                  Active Listings ({agent.listings.length})
                </h2>
              </div>

              <div className="p-6">
                {agent.listings.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-6xl mb-4">🏠</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No active listings
                    </h3>
                    <p className="text-gray-600">
                      This agent doesn't have any active listings at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agent.listings.map((listing) => {
                      // Parse images from JSON string
                      const images = listing.images ? (typeof listing.images === 'string' ? JSON.parse(listing.images) : listing.images) : [];
                      
                      return (
                        <Link
                          key={listing.id}
                          href={`/listings/${listing.id}`}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                            {images.length > 0 ? (
                              <div className="relative w-full h-48">
                                <Image
                                  src={images[0]}
                                  alt={listing.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">No Image</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 hover:text-blue-600">
                              {listing.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-2">
                              {listing.city && listing.state 
                                ? `${listing.city}, ${listing.state}`
                                : listing.city || listing.state || 'Location not specified'}
                            </p>
                            
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-lg font-bold text-blue-600">
                                {formatPrice(listing.price)}
                              </span>
                              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded capitalize">
                                {listing.type}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}