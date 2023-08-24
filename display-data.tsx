"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";

type DataType = {
  author: string;
  text: string;
};

const DisplayData = () => {
  // Adjust state to be an array
  const [data, setData] = useState<DataType[]>([]);

  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-data");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const allData: DataType[] = await response.json();
      setData(allData);

    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <Button variant={"secondary"} disabled={loading} className="w-[2rem] h-[2rem] p-0 m-0" onClick={handleFetchData}>
        <RefreshCcw />
      </Button>
      {data.map((item, index) => (
        <div key={index}>
          <Label>Author: {item.author}</Label>
          <Label>Quote: {item.text}</Label>
        </div>
      ))}
    </div>
  );
};

export default DisplayData;
