"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const DisplayData = () => {
  const [data, setData] = useState<{
    title?: string | null;
    price?: string | null;
  }>({});

  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-data");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const productData = await response.json();
      setData({
        title: productData.title || undefined,
        price: productData.price || undefined,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <Button disabled={loading} className="w-[8rem]" onClick={handleFetchData}>
        {loading ? "Fetching..." : "Fetch data"}
      </Button>
      {data.title && data.title.length > 0 && (
        <>
          <Label>Title: {data.title}</Label>
          <Label>Price: {data.price}</Label>
        </>
      )}
    </div>
  );
};

export default DisplayData;
