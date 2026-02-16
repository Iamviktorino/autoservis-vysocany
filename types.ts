
// Fix: Added React import to resolve the 'Cannot find namespace React' error when using React.ReactNode
import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PriceItem {
  service: string;
  price: string;
}