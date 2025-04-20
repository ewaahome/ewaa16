'use client';

import { useState, useEffect } from 'react';

// Define the listing type
interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  price: number;
  userId: string;
}

// Mock listings data with real placeholder URL
const MOCK_LISTINGS: Listing[] = [
  {
    id: "6579f306e65f5fbbb8ed0e13",
    title: "شقة فاخرة في الرياض",
    description: "شقة فاخرة في حي الملقا في الرياض",
    imageSrc: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1000&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
    category: "شقق",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 6,
    locationValue: "SA",
    price: 500,
    userId: "6579f306e65f5fbbb8ed0e10"
  },
  {
    id: "6579f306e65f5fbbb8ed0e14",
    title: "فيلا في جدة",
    description: "فيلا فاخرة في حي النهضة",
    imageSrc: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
    category: "فلل",
    roomCount: 5,
    bathroomCount: 4,
    guestCount: 10,
    locationValue: "SA",
    price: 1200,
    userId: "6579f306e65f5fbbb8ed0e11"
  },
  {
    id: "6579f306e65f5fbbb8ed0e15",
    title: "شاليه على البحر",
    description: "شاليه مميز على شاطئ البحر",
    imageSrc: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1000&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
    category: "شاليهات",
    roomCount: 2,
    bathroomCount: 1,
    guestCount: 4,
    locationValue: "SA",
    price: 800,
    userId: "6579f306e65f5fbbb8ed0e12"
  },
  {
    id: "6579f306e65f5fbbb8ed0e16",
    title: "شقة في مكة",
    description: "شقة قريبة من الحرم المكي",
    imageSrc: "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?q=80&w=1000&auto=format&fit=crop",
    createdAt: new Date().toISOString(),
    category: "شقق",
    roomCount: 2,
    bathroomCount: 1,
    guestCount: 4,
    locationValue: "SA",
    price: 600,
    userId: "6579f306e65f5fbbb8ed0e10"
  }
];

// Hook for getting mock listings
export const useMockListings = (params = {}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    
    setTimeout(() => {
      setListings(MOCK_LISTINGS);
      setIsLoading(false);
    }, 500);
  }, []);

  return {
    listings,
    isLoading
  };
};

// Hook for getting a specific listing
export const useMockListing = (listingId: string) => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!listingId) {
      setListing(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const foundListing = MOCK_LISTINGS.find(item => item.id === listingId) || null;
      setListing(foundListing);
      setIsLoading(false);
    }, 500);
  }, [listingId]);

  return {
    listing,
    isLoading
  };
}; 