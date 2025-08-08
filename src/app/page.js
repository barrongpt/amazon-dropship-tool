"use client";

// React web app with keyword search and image previews added

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const mockData = [
  {
    id: 1,
    amazonTitle: "Wireless Earbuds Bluetooth 5.3",
    amazonPrice: 29.99,
    alibabaPrice: 5.20,
    category: "Electronics",
    estimatedSales: 1200,
    imageUrl: "https://m.media-amazon.com/images/I/61n1y7HHKAL._AC_SL1500_.jpg",
    amazonLink: "https://amazon.com/example1",
    alibabaLink: "https://alibaba.com/example1"
  },
  {
    id: 2,
    amazonTitle: "Resistance Bands Set for Workouts",
    amazonPrice: 19.99,
    alibabaPrice: 2.50,
    category: "Sports & Outdoors",
    estimatedSales: 850,
    imageUrl: "https://m.media-amazon.com/images/I/81zPG2YydHL._AC_SL1500_.jpg",
    amazonLink: "https://amazon.com/example2",
    alibabaLink: "https://alibaba.com/example2"
  },
];

export default function App() {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    minProfit: '',
    keyword: ''
  });

  const filteredData = mockData.filter(item => {
    const profit = item.amazonPrice - item.alibabaPrice;
    return (
      (!filters.category || item.category === filters.category) &&
      (!filters.minPrice || item.amazonPrice >= parseFloat(filters.minPrice)) &&
      (!filters.maxPrice || item.amazonPrice <= parseFloat(filters.maxPrice)) &&
      (!filters.minProfit || profit >= parseFloat(filters.minProfit)) &&
      (!filters.keyword || item.amazonTitle.toLowerCase().includes(filters.keyword.toLowerCase()))
    );
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Amazon to Alibaba Product Finder</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Select onValueChange={(value) => setFilters({ ...filters, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Sports & Outdoors">Sports & Outdoors</SelectItem>
          </SelectContent>
        </Select>
        <Input type="number" placeholder="Min Price" onChange={e => setFilters({ ...filters, minPrice: e.target.value })} />
        <Input type="number" placeholder="Max Price" onChange={e => setFilters({ ...filters, maxPrice: e.target.value })} />
        <Input type="number" placeholder="Min Profit" onChange={e => setFilters({ ...filters, minProfit: e.target.value })} />
        <Input type="text" placeholder="Search keyword" onChange={e => setFilters({ ...filters, keyword: e.target.value })} />
      </div>

      <div className="grid gap-4">
        {filteredData.map(item => {
          const profit = (item.amazonPrice - item.alibabaPrice).toFixed(2);
          return (
            <Card key={item.id}>
              <CardContent className="p-4 flex gap-4 items-center">
                <img src={item.imageUrl} alt={item.amazonTitle} className="w-24 h-24 object-contain rounded" />
                <div>
                  <h2 className="font-semibold text-lg">{item.amazonTitle}</h2>
                  <p>Category: {item.category}</p>
                  <p>Amazon Price: ${item.amazonPrice}</p>
                  <p>Alibaba Price: ${item.alibabaPrice}</p>
                  <p>Estimated Profit: ${profit}</p>
                  <p>Estimated Sales: {item.estimatedSales} / mo</p>
                  <div className="flex gap-4 mt-2">
                    <a href={item.amazonLink} target="_blank" className="text-blue-500">Amazon</a>
                    <a href={item.alibabaLink} target="_blank" className="text-blue-500">Alibaba</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
