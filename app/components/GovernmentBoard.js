"use client";

import { useState, useEffect, useMemo } from "react";
import ReportList from "./ReportList";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function GovermentBoard({ data }) {
  const [localData, setLocalData] = useState(data || []);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 19.076,
    lng: 72.8777,
  });

  // 🔄 Sync data
  useEffect(() => {
    setLocalData(data || []);
  }, [data]);

  // 🔥 Transform + PRIORITY + SORT
  const issues = useMemo(() => {
    return localData
      .map((item) => {
        const likesCount = item.likes?.length || 0;

        return {
          id: item._id,
          title: item.category,
          description: item.description,
          address: item.Address,
          status: item.status,
          submitted_at: item.createdAt,
          images: item.images || [],
          category: item.category,
          likesCount,

          // 🔥 PRIORITY LOGIC
          priority:
            likesCount >= 5 ? "HIGH" : likesCount >= 2 ? "MEDIUM" : "LOW",

          coords: {
            lat: item.location?.lat,
            lng: item.location?.lng,
          },
        };
      })
      .sort((a, b) => b.likesCount - a.likesCount); // 🔥 SORT by importance
  }, [localData]);

  // 🔥 Update issue locally
  const onUpdateIssue = (updatedRawItem) => {
    setLocalData((prev) =>
      prev.map((item) =>
        item._id === updatedRawItem._id ? updatedRawItem : item
      )
    );

    // keep selected issue in sync
    setSelectedIssue((prev) =>
      prev
        ? {
            ...prev,
            status: updatedRawItem.status,
          }
        : prev
    );
  };

  // 🔥 Auto set map center initially
  useEffect(() => {
    if (issues.length > 0 && !selectedIssue) {
      setMapCenter(issues[0].coords);
    }
  }, [issues, selectedIssue]);

  // 🔥 Auto focus map when issue selected
  useEffect(() => {
    if (selectedIssue?.coords) {
      setMapCenter(selectedIssue.coords);
    }
  }, [selectedIssue]);

  return (
    <>
      <ReportList
        selectedIssue={selectedIssue}
        setSelectedIssue={setSelectedIssue}
        mock={issues}
        onUpdateIssue={onUpdateIssue}
        setMapCenter={setMapCenter}
      />

      <div className="w-full md:w-7/12 lg:w-8/12 bg-gray-100 relative">
        <div className="p-4 h-full">
          <Map
            mock={issues}
            position={mapCenter}
            setPosition={setMapCenter}
            selectedIssue={selectedIssue}
          />
        </div>
      </div>
    </>
  );
}
